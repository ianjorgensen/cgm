<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import * as d3 from 'd3'

  export let data
  export let initialRange = null
  // Optional external controller can drive the selection in real-time
  export let externalRange = null
  export let preset = 'N'
  // Optional month labels under the calendar rows
  export let showMonthLabels = true
  // Toggle to hide/show the calendar data (bars + selection overlay)
  export let showData = true
  // Toggle to show/hide the entire canvas area
  export let showCanvas = true

  const dispatch = createEventDispatcher()

  let canvas
  let periodTextEl

  // Layout constants
  const M = { l: 48, r: 12, t: 8, b: 8 }
  const rowH = 54
  const ALLOWED_SPANS = [1,3,7,14,30,90]

  // Derived series
  let time
  let values
  let dayMs = 24*60*60*1000
  const tStart = () => new Date(data.t0).getTime()
  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  function TH(){
    if (isMmol()){
      if (preset==='T') return { vlow:3.0, low:3.9, high:7.8, vhigh:13.9 }
      if (preset==='P') return { vlow:3.0, low:3.5, high:7.8, vhigh:13.9 }
      return { vlow:3.0, low:3.9, high:10.0, vhigh:13.9 }
    } else {
      if (preset==='T') return { vlow:54, low:70, high:140, vhigh:250 }
      if (preset==='P') return { vlow:54, low:63, high:140, vhigh:250 }
      return { vlow:54, low:70, high:180, vhigh:250 }
    }
  }

  // Ranges & domain
  let firstAll = 0, lastAll = 0
  let viewStart = 0, viewEnd = 0

  function nearestAllowed(days){
    let best = ALLOWED_SPANS[0], bd = Infinity
    for (const d of ALLOWED_SPANS){ const diff = Math.abs(d - days); if (diff < bd){ bd = diff; best = d } }
    return best
  }
  function spanDays(){ return Math.max(1, Math.floor((viewEnd - viewStart)/dayMs) + 1) }
  // Track which quick-span should be highlighted (nearest allowed)
  let activeSpan = 14
  $: activeSpan = nearestAllowed(spanDays())

  // per-day aggregation (UTC)
  const dayUTC = (t)=>{ const d=new Date(t); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) }
  let byDay

  function aggregate(){
    byDay = new Map()
    for (let i=0;i<values.length;i++){
      const v = values[i]
      if (!(Number.isFinite(v) && v>=0)) continue
      const ds = dayUTC(time[i])
      let r = byDay.get(ds)
      if (!r){ r = {valid:0, vl:0, l:0, t:0, h:0, vh:0}; byDay.set(ds, r) }
      r.valid++
      const th = TH()
      if (v < th.vlow) r.vl++; else if (v < th.low) r.l++; else if (v <= th.high) r.t++; else if (v <= th.vhigh) r.h++; else r.vh++
    }
  }

  function initSeries(){
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> tStart() + i*data.stepMs)
    values = Float64Array.from(data.glucose)
    firstAll = dayUTC(time[0])
    lastAll  = dayUTC(time[time.length-1])
    viewStart = initialRange?.start ?? firstAll
    viewEnd   = initialRange?.end   ?? lastAll
    aggregate()
  }

  let ctx
  function draw(){
    if (!canvas || !byDay?.size) return
    const DPR = Math.max(1, window.devicePixelRatio || 1)
    const cssW = Math.max(320, canvas.getBoundingClientRect().width || 900)
    const firstYear = new Date(firstAll).getUTCFullYear()
    const lastYear  = new Date(lastAll).getUTCFullYear()
    const years = d3.range(firstYear, lastYear+1)
    const bottomMargin = showMonthLabels ? 24 : M.b
    const cssH = M.t + years.length * rowH + bottomMargin
    canvas.style.width = cssW + 'px'
    canvas.style.height = cssH + 'px'
    canvas.width = Math.floor(cssW * DPR)
    canvas.height = Math.floor(cssH * DPR)
    ctx.setTransform(DPR,0,0,DPR,0,0)
    ctx.clearRect(0,0,cssW,cssH)
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,cssW,cssH)
    const plotW = cssW - M.l - M.r

    // month grid
    ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 1
    years.forEach((yr, idx)=>{
      const yTop = M.t + idx*rowH
      for (let m=1;m<12;m++){
        const t = Date.UTC(yr, m, 1)
        if (t < firstAll || t > lastAll) continue
        const daysInYear = (Date.UTC(yr+1,0,1) - Date.UTC(yr,0,1))/dayMs
        const x = M.l + Math.round((t - Date.UTC(yr,0,1)) / dayMs * (plotW / daysInYear))
        ctx.beginPath(); ctx.moveTo(x, yTop+6); ctx.lineTo(x, yTop + rowH - 6); ctx.stroke()
      }
    })

    // stacks
    years.forEach((yr, idx)=>{
      const yTop = M.t + idx*rowH
      ctx.fillStyle = '#444'; ctx.font = '12px system-ui, sans-serif'; ctx.textAlign='right'; ctx.textBaseline='middle'
      ctx.fillText(String(yr), M.l - 8, yTop + rowH/2)
      const startY = Date.UTC(yr,0,1)
      const endY = Date.UTC(yr+1,0,1) - dayMs
      const daysInYear = Math.round((Date.UTC(yr+1,0,1) - Date.UTC(yr,0,1))/dayMs)
      const xScale = (t)=> M.l + Math.floor(((t - Date.UTC(yr,0,1)) / dayMs) * (plotW / daysInYear))
      const H = rowH - 10; const yBase = yTop + 5
      if (!showData){
        // draw empty placeholders only
        ctx.fillStyle='#efefef';
        for (let t = Math.max(startY, firstAll); t <= Math.min(endY, lastAll); t += dayMs){
          const x0 = xScale(t), x1 = xScale(t + dayMs), w = Math.max(1, x1 - x0)
          ctx.fillRect(x0, yBase, w, H)
        }
        return
      }
      for (let t = Math.max(startY, firstAll); t <= Math.min(endY, lastAll); t += dayMs){
        const x0 = xScale(t), x1 = xScale(t + dayMs), w = Math.max(1, x1 - x0)
        const r = byDay.get(t)
        if (!r || !r.valid){ ctx.fillStyle='#efefef'; ctx.globalAlpha=1; ctx.fillRect(x0,yBase,w,H); continue }
        const samplesPerDay = Math.max(1, Math.round(dayMs/data.stepMs))
        const frac = { vl:r.vl/r.valid, l:r.l/r.valid, t:r.t/r.valid, h:r.h/r.valid, vh:r.vh/r.valid }
        let yb = yBase + H
        const seg=(color, f, a)=>{ const h=Math.round(f*H); if(h<=0) return; yb-=h; ctx.fillStyle=color; ctx.globalAlpha=a; ctx.fillRect(x0,yb,w,h) }
        const alphaBase = (r.valid / samplesPerDay) >= 0.5 ? 0.8 : 0.4
        const alphaT = (r.valid / samplesPerDay) >= 0.5 ? 0.9 : 0.6
        seg('#e57373', frac.vl, alphaBase)
        seg('#ff9e80', frac.l, alphaBase)
        seg('#86c89d', frac.t, alphaT)
        seg('#ffcc80', frac.h, alphaBase)
        seg('#ff8a65', frac.vh, alphaBase)
        ctx.globalAlpha=1
      }
    })

    if (showData){
      const sel0 = Math.max(firstAll, Math.min(lastAll, viewStart))
      const sel1 = Math.max(firstAll, Math.min(lastAll, viewEnd))
      years.forEach((yr, idx)=>{
        const yTop = M.t + idx*rowH
        const startY = Date.UTC(yr,0,1), endY = Date.UTC(yr+1,0,1) - 1
        const a = Math.max(startY, sel0), b = Math.min(endY, sel1)
        if (a>b) return
        const daysInYear = (Date.UTC(yr+1,0,1) - Date.UTC(yr,0,1))/dayMs
        const xScale = (t)=> M.l + Math.floor(((t - Date.UTC(yr,0,1)) / dayMs) * (plotW / daysInYear))
        const xA = xScale(a), xB = xScale(b + 1)
        const yBase = yTop + 5, H = rowH - 10
        ctx.save(); ctx.fillStyle='rgba(107,127,161,0.28)'; ctx.fillRect(xA, yBase, Math.max(1, xB-xA), H)
        ctx.strokeStyle='#6b7fa1'; ctx.lineWidth=1.5
        ctx.beginPath(); ctx.moveTo(xA+0.5,yBase+0.5); ctx.lineTo(xA+0.5,yBase+H-0.5); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(xB-0.5,yBase+0.5); ctx.lineTo(xB-0.5,yBase+H-0.5); ctx.stroke(); ctx.restore()
      })
    }

    // Bottom month labels (Jan–Dec under last row)
    if (showMonthLabels){
      const monthName = d3.utcFormat('%b')
      const lastYr = years[years.length - 1]
      const startY = Date.UTC(lastYr,0,1)
      const endY = Date.UTC(lastYr+1,0,1)
      const daysInYear = (endY - startY) / dayMs
      const xScale = (t)=> M.l + Math.round(((t - startY) / dayMs) * (plotW / daysInYear))
      const yLastTop = M.t + (years.length - 1) * rowH
      const yAxis = yLastTop + rowH - 5 + 0.5 // bottom of last row plot area
      ctx.save()
      ctx.strokeStyle = '#bbb'; ctx.lineWidth = 1
      ctx.fillStyle = '#555'; ctx.font = '11px system-ui, sans-serif'; ctx.textAlign='center'; ctx.textBaseline='top'
      for (let m=0; m<12; m++){
        const t = Date.UTC(lastYr, m, 1)
        const xp = xScale(t)
        ctx.beginPath(); ctx.moveTo(xp, yAxis); ctx.lineTo(xp, yAxis + 4); ctx.stroke()
        ctx.fillText(monthName(new Date(Date.UTC(2000, m, 1))), xp, yAxis + 6)
      }
      ctx.restore()
    }
  }

  function fmtPeriod(sms, ems){
    const s=new Date(sms), e=new Date(ems)
    const fmtMD = d3.timeFormat('%b %e'), fmtMDY=d3.timeFormat('%b %e, %Y'), fmtDY=d3.timeFormat('%e, %Y')
    const utc0 = Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())
    const utc1 = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
    const sameDay = utc0===utc1
    if (sameDay) return fmtMDY(e)
    if (s.getFullYear()===e.getFullYear()){
      if (s.getMonth()===e.getMonth()) return `${fmtMD(s)} – ${fmtDY(e)}`
      return `${fmtMD(s)} – ${fmtMDY(e)}`
    }
    return `${fmtMDY(s)} – ${fmtMDY(e)}`
  }
  let periodLabel = ''
  $: periodLabel = fmtPeriod(viewStart, viewEnd)

  // If an external controller passes a new range, adopt it and re-render
  $: {
    if (externalRange && typeof externalRange.start === 'number' && typeof externalRange.end === 'number') {
      const s = externalRange.start, e = externalRange.end
      if (s !== viewStart || e !== viewEnd) {
        viewStart = s; viewEnd = e; emitRange(); draw()
      }
    }
  }

  function emitRange(){
    const days = spanDays()
    // keep quick-span highlight in sync with current selection
    activeSpan = nearestAllowed(days)
    // map current selection to sample indices (inclusive)
    const i0 = Math.max(0, Math.ceil((viewStart - time[0]) / data.stepMs))
    const i1 = Math.min(values.length - 1, Math.floor((viewEnd - time[0]) / data.stepMs))
    try {
      if (typeof window !== 'undefined' && (window).CGM_DEBUG) {
        console.log('[CgmTir] rangechange', {
          startISO: new Date(viewStart).toISOString(),
          endISO: new Date(viewEnd).toISOString(),
          days,
          startIdx: i0,
          endIdx: i1
        })
      }
    } catch {}
    // Back-compat: include ms range; new consumers can use startIdx/endIdx
    dispatch('rangechange', { start:viewStart, end:viewEnd, days, startIdx: i0, endIdx: i1 })
  }

  function setSpan(days){
    viewEnd = lastAll
    viewStart = Math.max(firstAll, viewEnd - days*dayMs + 1)
    emitRange(); draw()
  }

  function step(dir){
    const s = viewStart + dir*dayMs
    const e = viewEnd + dir*dayMs
    const span = Math.max(dayMs, e - s)
    viewStart = Math.max(firstAll, Math.min(lastAll - span, s))
    viewEnd   = Math.min(lastAll, viewStart + span)
    emitRange(); draw()
  }

  function jump(dir){
    const d = spanDays() * dayMs * dir
    step(d/dayMs)
  }

  function mountInteractions(){
    // Mouse selection (drag)
    const cvs = canvas
    let dragging=false, mode=null
    let tAnchor=null
    let startAtDown=0, endAtDown=0
    const nearPx=6
    const toDayStartUTC=(t)=>{ const d=new Date(t); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) }
    function geometry(){
      const cssW = Math.max(320, cvs.getBoundingClientRect().width || 900)
      const plotW = cssW - M.l - M.r
      const years = d3.range(new Date(firstAll).getUTCFullYear(), new Date(lastAll).getUTCFullYear()+1)
      return { cssW, plotW, years }
    }
    function xScaleForYear(yr, plotW){
      const daysInYear = (Date.UTC(yr+1,0,1) - Date.UTC(yr,0,1)) / dayMs
      return (t)=> M.l + Math.floor(((t - Date.UTC(yr,0,1)) / dayMs) * (plotW / daysInYear))
    }
    function timeFromEvent(ev){
      const rect = cvs.getBoundingClientRect()
      const x = ev.clientX - rect.left
      const y = ev.clientY - rect.top
      const { cssW, plotW, years } = geometry()
      const idx = Math.floor((y - 8) / rowH)
      if (idx < 0 || idx >= years.length) return null
      const yr = years[idx]
      const x0 = M.l, x1 = cssW - M.r
      const clampedX = Math.max(x0, Math.min(x1, x))
      const daysInYear = (Date.UTC(yr+1,0,1) - Date.UTC(yr,0,1)) / dayMs
      const frac = (clampedX - x0) / (x1 - x0)
      let t = Date.UTC(yr,0,1) + frac * daysInYear * dayMs
      t = Math.max(firstAll, Math.min(lastAll, t))
      return { t, yr, x: clampedX, rowIdx: idx }
    }
    cvs.addEventListener('mousedown', (e)=>{
      const info = timeFromEvent(e); if (!info) return
      const { plotW } = geometry(); const xs = xScaleForYear(info.yr, plotW)
      const xA = xs(Math.max(Date.UTC(info.yr,0,1), viewStart))
      const xB = xs(Math.min(Date.UTC(info.yr+1,0,1)-1, viewEnd))+1
      mode='new'
      if (info.x>=xA-nearPx && info.x<=xA+nearPx) mode='resize-l'
      else if (info.x>=xB-nearPx && info.x<=xB+nearPx) mode='resize-r'
      else if (info.x>xA && info.x<xB) mode='move'
      dragging=true; tAnchor=info.t; startAtDown=viewStart; endAtDown=viewEnd
      document.body.style.userSelect='none'; cvs.style.cursor=(mode==='move'?'grabbing':(mode==='new'?'crosshair':'col-resize'))
    })
    window.addEventListener('mousemove', (e)=>{
      const info = timeFromEvent(e); if (!info){ if(!dragging) cvs.style.cursor='crosshair'; return }
      if (!dragging){
        const { plotW } = geometry(); const xs = xScaleForYear(info.yr, plotW)
        const xA = xs(Math.max(Date.UTC(info.yr,0,1), viewStart))
        const xB = xs(Math.min(Date.UTC(info.yr+1,0,1)-1, viewEnd))+1
        if (info.x>=xA-nearPx && info.x<=xA+nearPx) cvs.style.cursor='col-resize'
        else if (info.x>=xB-nearPx && info.x<=xB+nearPx) cvs.style.cursor='col-resize'
        else if (info.x>xA && info.x<xB) cvs.style.cursor='grab'
        else cvs.style.cursor='crosshair'
        return
      }
      const t = info.t
      const day = dayMs
      if (mode==='new'){
        const a0 = toDayStartUTC(Math.min(tAnchor, t))
        const b0 = toDayStartUTC(Math.max(tAnchor, t))
        let draggedDays = Math.max(1, Math.floor((b0 - a0)/day) + 1)
        const snap = nearestAllowed(draggedDays)
        if (t >= tAnchor){
          let a = a0; let b = a + snap*day - 1
          if (b > lastAll){ b = lastAll; a = Math.max(firstAll, b - snap*day + 1) }
          viewStart = a; viewEnd = b
        } else {
          let b = b0 + day - 1; let a = b - snap*day + 1
          if (a < firstAll){ a = firstAll; b = Math.min(lastAll, a + snap*day - 1) }
          viewStart = a; viewEnd = b
        }
      } else if (mode==='resize-l'){
        const rawDays = Math.max(1, Math.floor((endAtDown - toDayStartUTC(Math.min(t, endAtDown - day + 1)) + 1)/day))
        const snap = nearestAllowed(rawDays); let a = endAtDown - snap*day + 1
        a = Math.max(firstAll, Math.min(a, endAtDown - day + 1)); viewStart = a; viewEnd = endAtDown
      } else if (mode==='resize-r'){
        const rawDays = Math.max(1, Math.floor((toDayStartUTC(t) + day - 1 - startAtDown + 1)/day))
        const snap = nearestAllowed(rawDays); let b = startAtDown + snap*day - 1
        b = Math.min(lastAll, Math.max(b, startAtDown + day - 1)); viewStart = startAtDown; viewEnd = b
      } else if (mode==='move'){
        const deltaDays = Math.round((toDayStartUTC(t) - toDayStartUTC(tAnchor)) / day)
        const span = (endAtDown - startAtDown + 1)
        let ns = startAtDown + deltaDays*day; ns = Math.max(firstAll, Math.min(lastAll - span + 1, ns))
        viewStart = ns; viewEnd = ns + span - 1
      }
      emitRange(); draw()
    })
    window.addEventListener('mouseup', ()=>{ if(dragging){ dragging=false; mode=null; tAnchor=null; document.body.style.userSelect=''; cvs.style.cursor='crosshair' } })
  }

  // Re-aggregate when preset changes
  $: if (values && preset){ aggregate(); draw() }

  onMount(()=>{
    ctx = canvas.getContext('2d')
    initSeries(); draw();
    // Emit initial ready with both ms and index info
    const i0 = Math.max(0, Math.ceil((viewStart - time[0]) / data.stepMs))
    const i1 = Math.min(values.length - 1, Math.floor((viewEnd - time[0]) / data.stepMs))
    dispatch('ready', { start:viewStart, end:viewEnd, startIdx: i0, endIdx: i1, days: spanDays() })
    emitRange()
    mountInteractions()
    const onResize = ()=> draw()
    const onKey = (e)=>{
      // ignore when focus is on input controls
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : ''
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.defaultPrevented) return
      // Number keys → quick spans (1,3,7,14,30,90)
      if (/^[1-6]$/.test(e.key)){
        const map = { '1':1, '2':3, '3':7, '4':14, '5':30, '6':90 }
        const days = map[e.key]
        setSpan(days)
        e.preventDefault(); return
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight'){
        if (e.shiftKey){
          // jump by current span
          jump(e.key === 'ArrowLeft' ? -1 : 1)
        } else {
          // step by 1 day
          step(e.key === 'ArrowLeft' ? -1 : 1)
        }
        e.preventDefault(); return
      }
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('resize', onResize)
  })
</script>

<div class="cgm-widget" style="contain: layout;">
  <canvas bind:this={canvas} style={`width:100%; display:${showCanvas ? 'block':'none'}; border:0;`}></canvas>
  <div id="controlBar" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin:0 0 6px;">
    <div style="display:flex; gap:8px; align-items:center; justify-content:flex-end; flex:0 0 auto;">
        <button type="button" class="qbtn" on:click={()=>{ showCanvas = !showCanvas }} title="Hide/show calendar canvas">{showCanvas ? '-' : '='}</button>
    </div>
    <div bind:this={periodTextEl} style="text-align:left; color:#000; font-size:12px; font-weight:600; min-width:160px; flex:1 1 auto;">{periodLabel}</div>
    <div style="display:flex; align-items:center; gap:20px; justify-content:flex-end; margin-left:auto;">
      <!-- Canvas visibility toggle (placed to the left of nav arrows) -->
      <!--<div style="display:flex; gap:8px; align-items:center; justify-content:flex-end; flex:0 0 auto;">
        <button class="navbtn" on:click={()=>jump(-1)} title="Jump back by current span">&#124;&lt;</button>
        <button class="navbtn" on:click={()=>step(-1)} title="Step back 1 day">&lt;</button>
        <button class="navbtn" on:click={()=>step(1)} title="Step forward 1 day">&gt;</button>
        <button class="navbtn" on:click={()=>jump(1)} title="Jump forward by current span">&gt;&#124;</button>
      </div>-->
      <div style="display:flex; gap:16px; flex-wrap:wrap; justify-content:flex-end;">
        <button type="button" class={`qbtn ${activeSpan===1 ? 'active' : ''}`} on:click={()=>setSpan(1)}>1d</button>
        <button type="button" class={`qbtn ${activeSpan===3 ? 'active' : ''}`} on:click={()=>setSpan(3)}>3d</button>
        <button type="button" class={`qbtn ${activeSpan===7 ? 'active' : ''}`} on:click={()=>setSpan(7)}>1w</button>
        <button type="button" class={`qbtn ${activeSpan===14 ? 'active' : ''}`} on:click={()=>setSpan(14)}>2w</button>
        <button type="button" class={`qbtn ${activeSpan===30 ? 'active' : ''}`} on:click={()=>setSpan(30)}>1m</button>
        <button type="button" class={`qbtn ${activeSpan===90 ? 'active' : ''}`} on:click={()=>setSpan(90)}>3m</button>
      </div>
    </div>
  </div>
</div>

<style>
  .qbtn, .navbtn {
    padding: 4px 10px;
    border: 0px solid #bbb;
    border-radius: 6px;
    background: #f7f7f7;
    cursor: pointer;
  }
  .qbtn:hover, .navbtn:hover { background:#eee; }
  .qbtn.active {
    background:#333 !important;
    color:#fff !important;
    border-color:#333 !important;
  }
  .qbtn.active:hover { background:#333 !important; }
  
</style>
