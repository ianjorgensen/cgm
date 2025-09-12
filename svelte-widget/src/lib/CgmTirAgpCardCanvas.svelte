<script>
  import { onMount, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'N'

  let canvas
  let ctx

  // Derived series
  let time, values
  const dayMs = 24*60*60*1000

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const TH = ()=> {
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

  const COLORS = { vlow:'#8a2f2f', low:'#d65b5b', targ:'#169b58', high:'#f1aa3b', vhigh:'#e47c2f' }
  // Font sizes (smaller overall scale)
  const FS = {
    tick: 11,
    goal: 11,
    label: 16,
    labelSmall: 14,
    targetLabel: 18,
    note: 11,
    percentXL: 30,
    percentL: 24
  }

  // results
  let pct = { vlow:0, low:0, targ:0, high:0, vhigh:0 }
  let present = 0

  function initSeries(){
    if (!data) return
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  $: if (data) initSeries()

  function emit(){
    try { dispatch('stats', { pct, present, preset, units: data?.units || 'mmol/L' }) } catch {}
  }

  $: if (data && range && time && values && preset){
    const { start, end } = range
    const i0 = Math.max(0, Math.ceil((start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((end - time[0]) / data.stepMs))
    if (i1 < i0){ pct={vlow:0,low:0,targ:0,high:0,vhigh:0}; present=0 }
    else {
      const th = TH()
      let c = { vlow:0, low:0, targ:0, high:0, vhigh:0 }, valid=0
      for (let i=i0;i<=i1;i++){
        const v = values[i]; if (!(Number.isFinite(v) && v>=0)) continue
        valid++
        if (v < th.vlow) c.vlow++
        else if (v < th.low) c.low++
        else if (v <= th.high) c.targ++
        else if (v <= th.vhigh) c.high++
        else c.vhigh++
      }
      present = valid
      if (valid === 0) pct={vlow:0,low:0,targ:0,high:0,vhigh:0}
      else pct={
        vlow: c.vlow/valid*100,
        low:  c.low/valid*100,
        targ: c.targ/valid*100,
        high: c.high/valid*100,
        vhigh:c.vhigh/valid*100,
      }
    }
    draw(); emit()
  }

  function fmtPct(p){ return `${Math.round(p)}%` }
  function unitValue(v){ return isMmol() ? (Math.round(v*10)/10).toString() : Math.round(v).toString() }

  function roundRectPath(x,y,w,h,r){
    ctx.beginPath()
    ctx.moveTo(x+r,y)
    ctx.lineTo(x+w-r,y)
    ctx.arcTo(x+w,y,x+w,y+r,r)
    ctx.lineTo(x+w,y+h-r)
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
    ctx.lineTo(x+r,y+h)
    ctx.arcTo(x,y+h,x,y+h-r,r)
    ctx.lineTo(x,y+r)
    ctx.arcTo(x,y,x+r,y,r)
  }

  function openBracketPath(xL, xR, yTop, yBot, r){
    // Draw three-sided bracket: horizontal top from xL->(xR-r), rounded corner, vertical, rounded corner, bottom back to xL
    ctx.beginPath()
    ctx.moveTo(xL, yTop)
    ctx.lineTo(xR - r, yTop)
    ctx.arcTo(xR, yTop, xR, yTop + r, r)
    ctx.lineTo(xR, yBot - r)
    ctx.arcTo(xR, yBot, xR - r, yBot, r)
    ctx.lineTo(xL, yBot)
  }

  function draw(){
    if (!canvas) return
    const DPR = Math.max(1, window.devicePixelRatio || 1)
    const cssW = Math.max(600, canvas.getBoundingClientRect().width || 820)
    const cssH = 320
    canvas.style.width = cssW + 'px'
    canvas.style.height = cssH + 'px'
    canvas.width = Math.floor(cssW * DPR)
    canvas.height = Math.floor(cssH * DPR)
    ctx.setTransform(DPR,0,0,DPR,0,0)
    ctx.clearRect(0,0,cssW,cssH)
    // rounded white card background
    ctx.fillStyle='#fff'; ctx.strokeStyle='#e5e7eb'; ctx.lineWidth=1
    roundRectPath(8,8,cssW-16,cssH-16,12); ctx.fill(); ctx.stroke()

    // Layout metrics
    const leftX = 56, barW = 70, barH = 240, topY = 36
    // Legend-like stacked bar with fixed band heights (to match reference)
    const h_vhigh = 72
    const h_high  = 72
    const h_targ  = 80
    const h_low   = 8
    const h_vlow  = 8
    let y = topY
    ctx.strokeStyle = '#d6d9df'; ctx.lineWidth=1; ctx.strokeRect(leftX, topY, barW, barH)
    const seg = (c, h)=>{ if(h<=0) return; ctx.fillStyle=c; ctx.fillRect(leftX, y, barW, h); y += h }
    seg(COLORS.vhigh, h_vhigh)
    seg(COLORS.high,  h_high)
    seg(COLORS.targ,  h_targ)
    seg(COLORS.low,   h_low)
    seg(COLORS.vlow,  h_vlow)

    // Threshold labels at High/Very High and Target/High boundaries
    ctx.fillStyle='#4b515a'; ctx.font=`700 ${FS.tick}px system-ui`; ctx.textAlign='right'; ctx.textBaseline='middle'
    const yVHigh = topY + h_vhigh
    const yHigh  = topY + h_vhigh + h_high
    ctx.fillText(unitValue(TH().vhigh), leftX - 10, yVHigh)
    ctx.fillText(unitValue(TH().high), leftX - 10, yHigh)
    // Duplicate labels on right side of the bar for quick reading
    ctx.textAlign='left'
    ctx.fillText(unitValue(TH().vhigh), leftX + barW + 10, yVHigh)
    ctx.fillText(unitValue(TH().high),  leftX + barW + 10, yHigh)

    // Right content
    const rightX = leftX + barW + 32
    ctx.fillStyle='#8c939e'; ctx.font=`600 ${FS.goal}px system-ui`; ctx.textAlign='left'; ctx.fillText('Goal: <5%', rightX, topY - 8)
    // Very High & High rows
    ctx.fillStyle='#333'; ctx.font=`800 ${FS.label}px system-ui`; ctx.textAlign='left'; ctx.textBaseline='alphabetic'
    const yVH = topY + 16, yH = topY + 48
    ctx.fillText('Very High', rightX, yVH)
    ctx.textAlign='right'; ctx.fillText(fmtPct(pct.vhigh), rightX + 148, yVH)
    ctx.textAlign='left'; ctx.fillText('High', rightX, yH)
    ctx.textAlign='right'; ctx.fillText(fmtPct(pct.high), rightX + 148, yH)
    // Open bracket around Very High + High summary
    const bxTop = yVH - 12
    const bxBot = yH + 10
    const bxL = rightX + 160
    const bxR = bxL + 240
    ctx.strokeStyle='#b9bfc7'; ctx.lineWidth=2; openBracketPath(bxL, bxR, bxTop, bxBot, 14); ctx.stroke()
    // Small left hook above the "Very High" label
    const hookR = 10
    const hookX = rightX - 12
    const hookY = bxTop
    ctx.beginPath();
    ctx.moveTo(hookX + hookR, hookY)
    ctx.arcTo(hookX, hookY, hookX, hookY + hookR, hookR)
    ctx.stroke()
    ctx.font=`800 ${FS.percentXL}px system-ui`; ctx.fillStyle='#333'; ctx.textAlign='left'; ctx.fillText(`${Math.round(pct.vhigh + pct.high)}%`, bxL + 24, (bxTop + bxBot)/2 + 10)
    ctx.textAlign='right'; ctx.font=`600 ${FS.goal}px system-ui`; ctx.fillStyle='#8c939e'; ctx.fillText('Goal: <25%', bxR - 10, (bxTop + bxBot)/2 + 10)
    const bracketRight = bxR

    // Target section
    const midY = topY + 118
    // Target row: single underline beneath label/percents
    const yLabel = midY + 26
    const yLine  = yLabel + 6
    ctx.fillStyle='#333'; ctx.font=`800 ${FS.targetLabel}px system-ui`; ctx.textAlign='left'; ctx.fillText('Target', rightX, yLabel)
    ctx.textAlign='right'; ctx.fillText(fmtPct(pct.targ), rightX + 148, yLabel)
    ctx.fillStyle='#8c939e'; ctx.font=`600 ${FS.goal}px system-ui`; ctx.textAlign='left'; ctx.fillText('Goal: ≥70%', bracketRight - 84, yLabel - 2)
    // underline
    ctx.strokeStyle='#9aa1ab'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(rightX, yLine); ctx.lineTo(bracketRight, yLine); ctx.stroke()
    // note under the line
    ctx.textAlign='center'; ctx.font=`${FS.note}px system-ui`; ctx.fillText('Each 5% increase is clinically beneficial', (rightX + bracketRight)/2, yLine + 16)

    // Low + Very Low
    const lowY = midY + 86
    const veryLowY = lowY + 28
    ctx.fillStyle='#333'; ctx.font=`800 ${FS.label}px system-ui`; ctx.textAlign='left'; ctx.fillText('Low', rightX, lowY)
    ctx.textAlign='right'; ctx.fillText(fmtPct(pct.low), rightX + 148, lowY)
    ctx.textAlign='left'; ctx.fillText('Very Low', rightX, veryLowY)
    ctx.textAlign='right'; ctx.fillText(fmtPct(pct.vlow), rightX + 148, veryLowY)
    // Left hook + rounded entry into baseline under "Very Low"
    const hookLeftX = rightX - 12
    const hookTopY  = lowY + 6
    const baseY     = veryLowY + 8
    const lineRight = bracketRight
    ctx.strokeStyle='#b9bfc7'; ctx.lineWidth=2
    ctx.beginPath()
    // top small hook under "Low"
    ctx.moveTo(hookLeftX + 12, hookTopY)
    ctx.arcTo(hookLeftX, hookTopY, hookLeftX, hookTopY + 12, 12)
    // down to baseline and rounded into horizontal line
    ctx.lineTo(hookLeftX, baseY - 12)
    ctx.arcTo(hookLeftX, baseY, hookLeftX + 12, baseY, 12)
    // extend baseline to the right
    ctx.lineTo(lineRight, baseY)
    ctx.stroke()
    // Combined percent and goal text on the baseline
    ctx.textAlign='left'; ctx.font=`800 ${FS.percentL}px system-ui`; ctx.fillStyle='#333'; ctx.fillText(`${Math.round(pct.low + pct.vlow)}%`, hookLeftX + 80, baseY + 8)
    ctx.textAlign='left'; ctx.font=`600 ${FS.goal}px system-ui`; ctx.fillStyle='#8c939e'; ctx.fillText('Goal: <4%', hookLeftX + 160, baseY - 2)

    // Footer
    ctx.textAlign='right'; ctx.fillStyle='#8c939e'; ctx.font=`${FS.note}px system-ui`; ctx.fillText('Each 1% time in range = about 15 minutes', cssW - 24, topY + barH + 28)
  }

  function onResize(){ draw() }

  onMount(()=>{
    ctx = canvas.getContext('2d')
    draw()
    window.addEventListener('resize', onResize)
    return ()=> window.removeEventListener('resize', onResize)
  })
</script>

<canvas bind:this={canvas} style="width:100%; height:auto; display:block;"></canvas>
