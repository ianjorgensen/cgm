<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import CgmCalendar from './CgmCalendar.svelte'
  import * as d3 from 'd3'
  import targets from '../../targets.json'

  export let data
  export let initialRange = null
  // Optional external controller can drive the selection in real-time
  export let externalRange = null
  export let preset = 'general'
  // Optional month labels under the calendar rows
  export let showMonthLabels = true
  // Toggle to hide/show the calendar data (bars + selection overlay)
  export let showData = true
  // Toggle to show/hide the entire canvas area
  export let showCanvas = true
  // Selection styling
  export let selectionStroke = '#111'
  export let selectionFill = 'transparent'
  // Toggle view: 'line' (continuous single row) or 'stacked' (years stacked)
  export let viewMode = 'line'

  const dispatch = createEventDispatcher()

  let canvas
  let host
  let periodTextEl
  let childCalendar

  // Layout constants
  // Remove top margin but keep original row height
  const M = { l: 8, r: 8, t: 0, b: 6 }
  const rowH = 54
  const ALLOWED_SPANS = [1,7,14,21,30,90]

  // Theme (CSS variables read from host element)
  let theme = {
    bg: '#fff', grid: '#f0f0f0', text: '#111', muted: '#555',
    selFill: 'transparent', selStroke: '#111',
    vlow: '#e57373', low: '#ff9e80', inrange: '#86c89d', high: '#ffcc80', vhigh: '#ff8a65',
    outLight: '#ededed', outMid: '#c4c4c4', outDark: '#b5b5b5',
    arrow: 'gray'
  }
  function cssVar(name, def){ try{ const v=(getComputedStyle(host).getPropertyValue(name)||'').trim(); return v||def }catch{return def} }
  function readTheme(){
    theme = {
      bg: cssVar('--cgm-bg', theme.bg),
      grid: cssVar('--cgm-grid', theme.grid),
      text: cssVar('--cgm-text', theme.text),
      muted: cssVar('--cgm-muted', theme.muted),
      selFill: cssVar('--cgm-selection-fill', theme.selFill),
      selStroke: cssVar('--cgm-selection-stroke', theme.selStroke),
      vlow: cssVar('--cgm-very-low', theme.vlow),
      low: cssVar('--cgm-low', theme.low),
      inrange: cssVar('--cgm-in-range', theme.inrange),
      high: cssVar('--cgm-high', theme.high),
      vhigh: cssVar('--cgm-very-high', theme.vhigh),
      outLight: cssVar('--cgm-outside-light', theme.outLight),
      outMid: cssVar('--cgm-outside-mid', theme.outMid),
      outDark: cssVar('--cgm-outside-dark', theme.outDark),
      arrow: cssVar('--cgm-arrow', theme.arrow)
    }
  }

  // Derived series
  let time
  let values
  let dayMs = 24*60*60*1000
  const tStart = () => new Date(data.t0).getTime()
  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const unitKey = ()=> isMmol() ? 'mmol' : 'mg'
  function TH(){ return targets[preset].thresholds[unitKey()] }

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
      if (v < th.veryLow) r.vl++; else if (v < th.low) r.l++; else if (v <= th.high) r.t++; else if (v <= th.veryHigh) r.h++; else r.vh++
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
  let scrollDayOffset = 0 // left edge in days since firstAll (float for smooth scroll)
  let didInitScroll = false
  function draw(){
    if (!canvas || !byDay?.size) return
    if (viewMode !== 'line' || !showCanvas) return
    const DPR = Math.max(1, window.devicePixelRatio || 1)
    const cssW = Math.max(320, canvas.getBoundingClientRect().width || 900)
    const bottomMargin = showMonthLabels ? 24 : M.b
    const cssH = M.t + rowH + bottomMargin
    canvas.style.width = cssW + 'px'
    canvas.style.height = cssH + 'px'
    canvas.width = Math.floor(cssW * DPR)
    canvas.height = Math.floor(cssH * DPR)
    ctx.setTransform(DPR,0,0,DPR,0,0)
    ctx.clearRect(0,0,cssW,cssH)
    ctx.fillStyle = theme.bg; ctx.fillRect(0,0,cssW,cssH)
    const plotW = cssW - M.l - M.r
    const H = rowH - 10; const yBase = M.t + 5
    const totalDays = Math.round((lastAll - firstAll)/dayMs) + 1
    const dayWidth = plotW / 365 // visible window ~1 year, fixed pixels per day for smooth scroll
    const visibleDays = plotW / dayWidth
    // initialize scroll to keep selection end in view
    if (!didInitScroll){
      const endIdx = Math.floor((Math.min(lastAll, Math.max(firstAll, viewEnd)) - firstAll)/dayMs)
      scrollDayOffset = Math.max(0, Math.min(totalDays - visibleDays, endIdx - visibleDays + 1))
      didInitScroll = true
    }
    // clamp scroll into bounds
    scrollDayOffset = Math.max(0, Math.min(totalDays - visibleDays, scrollDayOffset))
    const xFromDayIndex = (i)=> M.l + (i - scrollDayOffset) * dayWidth
    const xFromTime = (t)=> M.l + (((t - firstAll)/dayMs) - scrollDayOffset) * dayWidth

    // month grid
    ctx.strokeStyle = theme.grid; ctx.lineWidth = 1
    // compute visible time range
    const tVis0 = firstAll + Math.floor(scrollDayOffset)*dayMs
    const tVis1 = firstAll + Math.ceil(scrollDayOffset + visibleDays)*dayMs
    // draw vertical lines at each month start within visible range
    let cur = new Date(tVis0)
    let monthStart = Date.UTC(cur.getUTCFullYear(), cur.getUTCMonth(), 1)
    if (monthStart < tVis0){
      // advance to next month start after tVis0
      const y = cur.getUTCFullYear(), m = cur.getUTCMonth()
      monthStart = Date.UTC(y, m+1, 1)
    }
    for (let t = monthStart; t <= tVis1; ){ 
      const x = Math.round(xFromTime(t))
      ctx.beginPath(); ctx.moveTo(x, yBase+1); ctx.lineTo(x, yBase + H - 1); ctx.stroke()
      const d = new Date(t); t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth()+1, 1)
    }

    // (Year label moved to January tick on the bottom axis)

    // stacks
    // Compute clamped selection window for coloring
    const sel0_forColor = Math.max(firstAll, Math.min(lastAll, viewStart))
    const sel1_forColor = Math.max(firstAll, Math.min(lastAll, viewEnd))
    if (!showData){
      ctx.fillStyle=theme.bg
      const i0 = Math.max(0, Math.floor(scrollDayOffset))
      const i1 = Math.min(totalDays-1, Math.ceil(scrollDayOffset + visibleDays))
      for (let i=i0; i<=i1; i++){
        const x0 = xFromDayIndex(i), w = Math.max(1, Math.ceil(dayWidth))
        ctx.fillRect(x0, yBase, w, H)
      }
    } else {
      const i0 = Math.max(0, Math.floor(scrollDayOffset))
      const i1 = Math.min(totalDays-1, Math.ceil(scrollDayOffset + visibleDays))
      for (let i=i0; i<=i1; i++){
        const t = firstAll + i*dayMs
        const x0 = xFromDayIndex(i), w = Math.max(1, Math.ceil(dayWidth))
        const r = byDay.get(t)
        if (!r || !r.valid){ ctx.fillStyle=theme.bg; ctx.globalAlpha=1; ctx.fillRect(x0,yBase,w,H); continue }
        const samplesPerDay = Math.max(1, Math.round(dayMs/data.stepMs))
        const frac = { vl:r.vl/r.valid, l:r.l/r.valid, t:r.t/r.valid, h:r.h/r.valid, vh:r.vh/r.valid }
        let yb = yBase + H
        const seg=(color, f, a)=>{ const h=Math.round(f*H); if(h<=0) return; yb-=h; ctx.fillStyle=color; ctx.globalAlpha=a; ctx.fillRect(x0,yb,w,h) }
        const alphaBase = (r.valid / samplesPerDay) >= 0.5 ? 0.8 : 0.4
        const alphaT = (r.valid / samplesPerDay) >= 0.5 ? 0.9 : 0.6
        const inSel = (t >= sel0_forColor && t <= sel1_forColor)
        if (inSel){
          // colored inside selection
          seg(theme.vlow, frac.vl, alphaBase)
          seg(theme.low, frac.l, alphaBase)
          seg(theme.inrange, frac.t, alphaT)
          seg(theme.high, frac.h, alphaBase)
          seg(theme.vhigh, frac.vh, alphaBase)
        } else {
          // Inverted emphasis: target band lighter, lows/highs slightly darker
          seg(theme.outDark, frac.vl, Math.min(alphaBase, 0.70)) // very low (darker)
          seg(theme.outMid,  frac.l,  Math.min(alphaBase, 0.65)) // low (mid)
          seg(theme.outLight,frac.t,  Math.min(alphaT,     0.55)) // in range (lightest)
          seg(theme.outMid,  frac.h,  Math.min(alphaBase, 0.65)) // high (mid)
          seg(theme.outDark, frac.vh, Math.min(alphaBase, 0.70)) // very high (darker)
        }
        ctx.globalAlpha=1
      }
    }

    // selection overlay if visible
    if (showData){
      const sel0 = Math.max(firstAll, Math.min(lastAll, viewStart))
      const sel1 = Math.max(firstAll, Math.min(lastAll, viewEnd))
      const xA = Math.floor(xFromTime(sel0))
      const xB = Math.ceil(xFromTime(sel1 + 1))
      ctx.save();
      const selFill = (selectionFill && selectionFill !== '#111' && selectionFill !== 'transparent' && selectionFill !== 'none') ? selectionFill : theme.selFill
      if (selFill && selFill !== 'none' && selFill !== 'transparent'){
        ctx.fillStyle = selFill; ctx.fillRect(xA, yBase, Math.max(1, xB-xA), H)
      }
      const selStroke = (selectionStroke && selectionStroke !== '#111') ? selectionStroke : theme.selStroke
      ctx.strokeStyle= selStroke; ctx.lineWidth=1.5
      ctx.beginPath(); ctx.moveTo(xA+0.5,yBase+0.5); ctx.lineTo(xA+0.5,yBase+H-0.5); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(xB-0.5,yBase+0.5); ctx.lineTo(xB-0.5,yBase+H-0.5); ctx.stroke(); ctx.restore()
      // Pre-compute selection label bounds for bottom axis
      try {
        const selText = fmtPeriod(sel0, sel1)
        const yAxisTmp = M.t + rowH - 5 + 0.5
        ctx.save(); ctx.font = '11px system-ui, sans-serif';
        const wSel = Math.ceil(ctx.measureText(selText).width)
        ctx.restore()
        const cx = (xA + xB) / 2
        var selLabel = { text: selText, x0: Math.round(cx - wSel/2) - 2, x1: Math.round(cx + wSel/2) + 2, yAxis: yAxisTmp }
      } catch {}
    }

    // Bottom month labels over visible range
    if (showMonthLabels){
      const monthName = d3.utcFormat('%b')
      const yAxis = M.t + rowH - 5 + 0.5
      ctx.save()
      ctx.strokeStyle = theme.grid; ctx.lineWidth = 1
      ctx.fillStyle = theme.muted; ctx.font = '11px var(--cgm-font, system-ui, sans-serif)'; ctx.textAlign='center'; ctx.textBaseline='top'
      let d0 = new Date(tVis0)
      let mStart = Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth(), 1)
      if (mStart < tVis0){ const y=d0.getUTCFullYear(), m=d0.getUTCMonth(); mStart = Date.UTC(y, m+1, 1) }
      for (let t = mStart; t <= tVis1;){
        const xp = Math.round(xFromTime(t))
        ctx.beginPath(); ctx.moveTo(xp, yAxis); ctx.lineTo(xp, yAxis + 4); ctx.stroke()
        const dd = new Date(t)
        let label = monthName(new Date(Date.UTC(2000, dd.getUTCMonth(), 1)))
        if (dd.getUTCMonth() === 0){
          // Append 2-digit year for January labels: e.g., Jan 25'
          const yy = String(dd.getUTCFullYear()).slice(-2)
          label = `${label} ${yy}'`
        }
        // If selection label overlaps this month label, skip drawing label text
        let drawMonth = true
        try {
          const wM = Math.ceil(ctx.measureText(label).width)
          const m0 = xp - Math.round(wM/2) - 2
          const m1 = xp + Math.round(wM/2) + 2
          if (typeof selLabel !== 'undefined' && selLabel && !(m1 < selLabel.x0 || m0 > selLabel.x1)) drawMonth = false
        } catch {}
        if (drawMonth) ctx.fillText(label, xp, yAxis + 6)
        t = Date.UTC(dd.getUTCFullYear(), dd.getUTCMonth()+1, 1)
      }
      ctx.restore()
      // Draw selection label on axis, centered under the selected window
      try {
        if (typeof selLabel !== 'undefined' && selLabel){
          const textY = yAxis + 6
          ctx.save();
          ctx.fillStyle = theme.text; ctx.font = '11px var(--cgm-font, system-ui, sans-serif)'; ctx.textAlign='center'; ctx.textBaseline='top'
          const cx = Math.round((selLabel.x0 + selLabel.x1)/2)
          ctx.fillText(selLabel.text, cx, textY)
          ctx.restore()
        }
      } catch {}
    }

    // Edge fades to indicate more scrollable data on either side
    //const x0 = M.l, x1 = cssW - M.r
    /*const x0 = 0, x1 = cssW - M.r + 10
    const overlayW = Math.max(12, Math.min(48, Math.round(plotW * 0.03)))
    if (scrollDayOffset > 0 + 0.01){
      const g = ctx.createLinearGradient(x0, 0, x0 + overlayW, 0)
      g.addColorStop(0, 'rgba(255,255,255,0.9)')
      g.addColorStop(1, 'rgba(255,255,255,0.0)')
      ctx.fillStyle = g
      ctx.fillRect(x0, yBase, overlayW, H)
    }
    if (scrollDayOffset + visibleDays < totalDays - 0.01){
      const g = ctx.createLinearGradient(x1 - overlayW, 0, x1, 0)
      g.addColorStop(0, 'rgba(255,255,255,0.0)')
      g.addColorStop(1, 'rgba(255,255,255,0.9)')
      ctx.fillStyle = g
      ctx.fillRect(x1 - overlayW, yBase, overlayW, H)
    }*/

    // Arrow hints showing more data left/right (triangles for visibility)
    const cy = yBase + H/2
    ctx.save(); ctx.fillStyle = theme.arrow;
    if (scrollDayOffset > 0 + 0.01){
      const ax = M.l - 5, ah = 5, aw = 4
      ctx.beginPath(); ctx.moveTo(ax, cy); ctx.lineTo(ax + aw, cy - ah); ctx.lineTo(ax + aw, cy + ah); ctx.closePath(); ctx.fill()
    }
    if (scrollDayOffset + visibleDays < totalDays - 0.01){
      const ax = cssW - M.r + 5, ah = 5, aw = 4
      ctx.beginPath(); ctx.moveTo(ax, cy); ctx.lineTo(ax - aw, cy - ah); ctx.lineTo(ax - aw, cy + ah); ctx.closePath(); ctx.fill()
    }
    ctx.restore()
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
        viewStart = s; viewEnd = e; syncScrollToRange(); emitRange(); updateAfterRange()
      }
    }
  }

  function emitRange(){
    if (!time || !values) return
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
    // Resize selection length keeping the current end anchored when possible
    const day = dayMs
    let end = Math.max(firstAll + day - 1, Math.min(lastAll, viewEnd))
    let start = end - days*day + 1
    if (start < firstAll){
      start = firstAll
      end = Math.min(lastAll, start + days*day - 1)
    }
    viewStart = start
    viewEnd = end
    syncScrollToRange(); emitRange(); updateAfterRange()
  }

  function step(dir){
    const s = viewStart + dir*dayMs
    const e = viewEnd + dir*dayMs
    const span = Math.max(dayMs, e - s)
    viewStart = Math.max(firstAll, Math.min(lastAll - span, s))
    viewEnd   = Math.min(lastAll, viewStart + span)
    syncScrollToRange(); emitRange(); updateAfterRange()
  }

  function jump(dir){
    const d = spanDays() * dayMs * dir
    step(d/dayMs)
  }

  // When range changes via keyboard or programmatically, update the active view
  function updateAfterRange(){
    if (viewMode === 'line') draw()
    else if (childCalendar) try{ childCalendar.$set({ externalRange: { start: viewStart, end: viewEnd } }) }catch{}
  }

  // When switching to stacked mode, ensure child mounts fresh and sizes correctly
  $: if (viewMode === 'stacked' && showCanvas) {
    // Defer a resize to let layout settle then force child redraw
    setTimeout(()=>{ try{ window.dispatchEvent(new Event('resize')) }catch{} }, 0)
  }

  // Viewport scroll helpers (continuous)
  function syncScrollToRange(){
    // Center the current selection within the viewport when set programmatically.
    // This makes clicks from Strips or external controllers bring the day into focus.
    const totalDays = Math.round((lastAll - firstAll)/dayMs) + 1
    const cssW = Math.max(320, canvas?.getBoundingClientRect().width || 900)
    const plotW = cssW - M.l - M.r
    const dayWidth = plotW / 365
    const visibleDays = plotW / dayWidth
    const startIdx = Math.floor((Math.max(firstAll, Math.min(lastAll, viewStart)) - firstAll)/dayMs)
    const endIdx = Math.floor((Math.max(firstAll, Math.min(lastAll, viewEnd)) - firstAll)/dayMs)
    const mid = (startIdx + endIdx + 1) / 2
    let newLeft = mid - visibleDays/2
    newLeft = Math.max(0, Math.min(totalDays - visibleDays, newLeft))
    scrollDayOffset = newLeft
  }

  function clampScroll(){
    if (!canvas) return
    const cssW = Math.max(320, canvas.getBoundingClientRect().width || 900)
    const plotW = cssW - M.l - M.r
    const totalDays = Math.round((lastAll - firstAll)/dayMs) + 1
    const dayWidth = plotW / 365
    const visibleDays = plotW / dayWidth
    scrollDayOffset = Math.max(0, Math.min(totalDays - visibleDays, scrollDayOffset))
  }

  let interactionsActive = false
  let hDown=null, hMove=null, hUp=null, hWheel=null
  function mountInteractions(){
    if (interactionsActive || !canvas) return
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
      const x0 = M.l, x1 = cssW - M.r
      const dayWidth = plotW / 365
      return { cssW, plotW, x0, x1, dayWidth }
    }
    function timeFromEvent(ev){
      const rect = cvs.getBoundingClientRect()
      const rawX = ev.clientX - rect.left
      const y = ev.clientY - rect.top
      const { x0, x1, dayWidth } = geometry()
      // single row; accept anywhere within canvas height
      const clampedX = Math.max(x0, Math.min(x1, rawX))
      const dayFrac = (clampedX - x0) / dayWidth
      let t = firstAll + (scrollDayOffset + dayFrac) * dayMs
      t = Math.max(firstAll, Math.min(lastAll, t))
      return { t, x: clampedX, rawX, x0, x1, rowIdx: 0 }
    }
    hDown = (e)=>{
      const info = timeFromEvent(e); if (!info) return
      const { dayWidth, x0, x1 } = geometry()
      const xFromTime=(tt)=> x0 + (((tt - firstAll)/dayMs) - scrollDayOffset) * dayWidth
      const xA = xFromTime(viewStart)
      const xB = xFromTime(viewEnd) + 1
      mode='new'
      if (info.x>=xA-nearPx && info.x<=xA+nearPx) mode='resize-l'
      else if (info.x>=xB-nearPx && info.x<=xB+nearPx) mode='resize-r'
      else if (info.x>xA && info.x<xB) mode='move'
      dragging=true; tAnchor=info.t; startAtDown=viewStart; endAtDown=viewEnd
      document.body.style.userSelect='none'; cvs.style.cursor=(mode==='move'?'grabbing':(mode==='new'?'crosshair':'col-resize'))
    }
    // Wheel to scroll time continuously
    hWheel = (e)=>{
      const { dayWidth } = geometry()
      const deltaPx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const deltaDays = deltaPx / dayWidth
      scrollDayOffset = scrollDayOffset + deltaDays
      clampScroll()
      draw()
      e.preventDefault()
    }
    cvs.addEventListener('wheel', hWheel, { passive: false })
    cvs.addEventListener('mousedown', hDown)
    hMove = (e)=>{
      let info = timeFromEvent(e); if (!info){ if(!dragging) cvs.style.cursor='crosshair'; return }
      if (!dragging){
        const { dayWidth, x0 } = geometry();
        const xFromTime=(tt)=> x0 + (((tt - firstAll)/dayMs) - scrollDayOffset) * dayWidth
        const xA = xFromTime(viewStart)
        const xB = xFromTime(viewEnd) + 1
        if (info.x>=xA-nearPx && info.x<=xA+nearPx) cvs.style.cursor='col-resize'
        else if (info.x>=xB-nearPx && info.x<=xB+nearPx) cvs.style.cursor='col-resize'
        else if (info.x>xA && info.x<xB) cvs.style.cursor='grab'
        else cvs.style.cursor='crosshair'
        return
      }
      // While dragging, continuously scroll when pointer passes edges
      const { x0, x1, dayWidth } = geometry()
      if (info.rawX < x0){
        const dx = (x0 - info.rawX)
        scrollDayOffset -= dx / dayWidth
        clampScroll()
        info = timeFromEvent(e) || info
      } else if (info.rawX > x1){
        const dx = (info.rawX - x1)
        scrollDayOffset += dx / dayWidth
        clampScroll()
        info = timeFromEvent(e) || info
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
      // Do not recenter while dragging; just update selection and redraw
      emitRange(); draw()
    }
    hUp = ()=>{ if(dragging){ dragging=false; mode=null; tAnchor=null; document.body.style.userSelect=''; cvs.style.cursor='crosshair' } }
    window.addEventListener('mousemove', hMove)
    window.addEventListener('mouseup', hUp)
    interactionsActive = true
  }
  function unmountInteractions(){
    if (!interactionsActive || !canvas) return
    try{ canvas.removeEventListener('mousedown', hDown) }catch{}
    try{ canvas.removeEventListener('wheel', hWheel) }catch{}
    try{ window.removeEventListener('mousemove', hMove) }catch{}
    try{ window.removeEventListener('mouseup', hUp) }catch{}
    hDown=hMove=hUp=hWheel=null
    interactionsActive = false
  }

  // Re-aggregate when preset changes
  $: if (values && preset){ aggregate(); updateAfterRange() }
  // Activate interactions only when the line canvas is visible
  $: { if (showCanvas && viewMode==='line') mountInteractions(); else unmountInteractions() }

  onMount(()=>{
    ctx = canvas.getContext('2d')
    readTheme()
    initSeries(); draw();
    // Emit initial ready with both ms and index info
    const i0 = Math.max(0, Math.ceil((viewStart - time[0]) / data.stepMs))
    const i1 = Math.min(values.length - 1, Math.floor((viewEnd - time[0]) / data.stepMs))
    dispatch('ready', { start:viewStart, end:viewEnd, startIdx: i0, endIdx: i1, days: spanDays() })
    emitRange()
    mountInteractions()
    const onResize = ()=>{ clampScroll(); draw() }
    const onKey = (e)=>{
      // ignore when focus is on input controls
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : ''
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.defaultPrevented) return
      // Number keys → quick spans (1,7,14,21,30,90)
      if (/^[1-6]$/.test(e.key)){
        const map = { '1':1, '2':7, '3':14, '4':21, '5':30, '6':90 }
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
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        // granular scroll by ~30 days with up/down
        const { dayWidth } = (function(){ const cssW=Math.max(320, canvas?.getBoundingClientRect().width||900); const plotW=cssW-M.l-M.r; return { dayWidth: plotW/365 } })()
        const days = Math.round(30)
        scrollDayOffset += (e.key === 'ArrowUp' ? -days : days)
        draw(); e.preventDefault(); return
      }
    }
    window.addEventListener('resize', ()=>{ readTheme(); onResize() })
    window.addEventListener('keydown', onKey)
    return ()=> { window.removeEventListener('resize', onResize); window.removeEventListener('keydown', onKey); unmountInteractions() }
  })
</script>

<div class="cgm-widget" bind:this={host} style="contain: layout; display:flex; flex-direction:column;">
  <div id="controlBar" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin:0 0 0px;">
    <div style="display:flex; gap:8px; align-items:center; justify-content:flex-end; flex:0 0 auto;">
        <!--<button type="button" class="qbtn" on:click={()=>{ showCanvas = !showCanvas }} title="Hide/show calendar canvas">{showCanvas ? '↑' : '↓'}</button>-->
        {#if showCanvas}
          <button
            type="button"
            class="qbtn"
            on:click={()=>{ viewMode = (viewMode==='line'?'stacked':'line'); updateAfterRange() }}
            title={viewMode==='line' ? 'Show years stacked' : 'Show years inline'}
            aria-label={viewMode==='line' ? 'Show years stacked' : 'Show years inline'}
          >≡</button>
        {/if}
    </div>
    <!--<div bind:this={periodTextEl} style="text-align:left; color:#000; font-size:12px; font-weight:600; min-width:160px; flex:1 1 auto;">{periodLabel}</div>-->
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
        <button type="button" class={`qbtn ${activeSpan===7 ? 'active' : ''}`} on:click={()=>setSpan(7)}>1w</button>
        <button type="button" class={`qbtn ${activeSpan===14 ? 'active' : ''}`} on:click={()=>setSpan(14)}>2w</button>
        <button type="button" class={`qbtn ${activeSpan===21 ? 'active' : ''}`} on:click={()=>setSpan(21)}>3w</button>
        <button type="button" class={`qbtn ${activeSpan===30 ? 'active' : ''}`} on:click={()=>setSpan(30)}>1m</button>
        <button type="button" class={`qbtn ${activeSpan===90 ? 'active' : ''}`} on:click={()=>setSpan(90)}>3m</button>
      </div>
    </div>
  </div>
  {#if showCanvas && viewMode==='stacked'}
    <div class="stacked-container" style="position:relative; z-index:1;">
      <div class="stack-embed" style="width:100%; position:relative; z-index:1;">
      <CgmCalendar
        bind:this={childCalendar}
        data={data}
        initialRange={{ start: viewStart, end: viewEnd }}
        preset={preset}
        showMonthLabels={showMonthLabels}
        showData={showData}
        showCanvas={true}
        selectionFill={selectionFill}
        selectionStroke={selectionStroke}
        on:rangechange={(e)=>{ const d=e.detail; viewStart=d.start; viewEnd=d.end; emitRange() }}
        on:ready={(e)=>{ const d=e.detail; viewStart=d.start; viewEnd=d.end; dispatch('ready', d) }}
      />
      </div>
    </div>
  {/if}
  <!-- Primary/secondary controlled by viewMode by toggling visibility -->
  <div class="line-container" style={`display:${showCanvas && viewMode==='line' ? 'block':'none'};`}>
    <canvas bind:this={canvas} style="width:100%; border:0; padding-bottom: 10px;"></canvas>
  </div>
</div>

<style>
  .qbtn, .navbtn {
    padding: 4px;
    border: 0px solid #bbb;
    border-radius: 6px;
    background: none !important;
    cursor: pointer;
    opacity:0.5;
  }
  .qbtn:hover, .navbtn:hover { opacity:0.75;}
  .qbtn.active {
    color:#111 !important;
    opacity:1;
  }
  .qbtn.active:hover { }
</style>
