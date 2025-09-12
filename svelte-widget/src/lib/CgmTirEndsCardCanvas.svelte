<script>
  import { onMount, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let data
  export let range = null // { start, end }
  export let preset = 'N'

  let canvas, ctx

  const dayMs = 24*60*60*1000
  let time, values
  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const TH = ()=>{
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

  function init(){
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length:data.glucose.length},(_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }
  $: data && init()

  let pct = { vlow:0, vhigh:0 }
  function compute(){
    if (!range || !time) return
    const { start, end } = range
    const i0 = Math.max(0, Math.ceil((start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((end - time[0]) / data.stepMs))
    let c = { vlow:0, vhigh:0 }, valid=0
    const th=TH()
    for(let i=i0;i<=i1;i++){
      const v = values[i]; if(!(Number.isFinite(v)&&v>=0)) continue
      valid++
      if (v < th.vlow) c.vlow++
      else if (v > th.vhigh) c.vhigh++
    }
    if (valid>0){ pct.vlow = c.vlow/valid*100; pct.vhigh=c.vhigh/valid*100 } else { pct.vlow=0; pct.vhigh=0 }
    dispatch('stats',{ pct, preset, units: data?.units||'mmol/L' })
  }
  $: compute()

  const FS={ goal:14, label:28, pct:28, tick:16 }

  function roundHookTop(xL, yTop, len, r){
    // Draw a top-facing hook opening to the right
    ctx.beginPath()
    ctx.moveTo(xL + r, yTop)
    ctx.arcTo(xL, yTop, xL, yTop + r, r)
    ctx.lineTo(xL, yTop + r)
    ctx.lineTo(xL + len, yTop + r)
    ctx.stroke()
  }
  function roundHookBottom(xL, yBase, len, r){
    // Draw a bottom-facing hook opening to the right
    ctx.beginPath()
    ctx.moveTo(xL + r, yBase)
    ctx.arcTo(xL, yBase, xL, yBase - r, r)
    ctx.lineTo(xL, yBase - r)
    ctx.lineTo(xL + len, yBase - r)
    ctx.stroke()
  }

  function unitValue(v){ return isMmol() ? (Math.round(v*10)/10).toString() : Math.round(v).toString() }

  function draw(){
    if (!canvas) return
    const DPR = Math.max(1, window.devicePixelRatio||1)
    const cssW = Math.max(480, canvas.getBoundingClientRect().width||600)
    const cssH = 680
    canvas.style.width = cssW+'px'; canvas.style.height=cssH+'px'
    canvas.width = Math.floor(cssW*DPR); canvas.height = Math.floor(cssH*DPR)
    ctx.setTransform(DPR,0,0,DPR,0,0)
    ctx.clearRect(0,0,cssW,cssH)
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,cssW,cssH)

    const leftX = 80, barW=90, barTop=120, barH=440
    // draw stacked bar with constant bands visual
    const th=TH()
    const h_vhigh=140, h_high=140, h_targ=140, h_low=10, h_vlow=10
    let y=barTop
    ctx.fillStyle=COLORS.vhigh; ctx.fillRect(leftX,y,barW,h_vhigh); y+=h_vhigh
    ctx.fillStyle='#e9e9e9'; ctx.fillRect(leftX,y,barW,2); // thin seam
    ctx.fillStyle=COLORS.high; ctx.fillRect(leftX,y,barW,h_high); y+=h_high
    ctx.fillStyle='#e9e9e9'; ctx.fillRect(leftX,y,barW,2)
    ctx.fillStyle=COLORS.targ; ctx.fillRect(leftX,y,barW,h_targ); y+=h_targ
    ctx.fillStyle='rgba(255,255,255,0.35)'; ctx.fillRect(leftX+6,y-6,barW-12,2) // faint inner line
    ctx.fillStyle=COLORS.low; ctx.fillRect(leftX,y,barW,h_low); y+=h_low
    ctx.fillStyle=COLORS.vlow; ctx.fillRect(leftX,y,barW,h_vlow)

    // threshold labels (left and right of the bar)
    ctx.fillStyle='#2f3741'; ctx.font=`700 ${FS.tick}px system-ui`; ctx.textAlign='right'; ctx.textBaseline='middle'
    const yVH = barTop+h_vhigh
    const yH  = barTop+h_vhigh+h_high
    ctx.fillText(unitValue(th.vhigh), leftX-10, yVH)
    ctx.fillText(unitValue(th.high), leftX-10, yH)
    ctx.textAlign='left'
    ctx.fillText(unitValue(th.vhigh), leftX+barW+10, yVH)
    ctx.fillText(unitValue(th.high), leftX+barW+10, yH)

    // VERY HIGH annotation
    const labelX = leftX + barW + 20
    const vhY = barTop - 32
    ctx.strokeStyle='#000'; ctx.lineWidth=4; roundHookTop(leftX-22, vhY, 70, 14)
    ctx.fillStyle='#8c939e'; ctx.font=`600 ${FS.goal}px system-ui`; ctx.textAlign='center'; ctx.fillText('Goal: <5%', labelX+120, vhY-8)
    ctx.fillStyle='#111'; ctx.font=`800 ${FS.label}px system-ui`; ctx.textAlign='left'; ctx.fillText('Very High', labelX, barTop-2)
    ctx.textAlign='right'; ctx.fillText(`${Math.round(pct.vhigh)}%`, labelX+260, barTop-2)

    // VERY LOW annotation
    const baseY = barTop + barH + 24
    ctx.strokeStyle='#000'; ctx.lineWidth=4; roundHookBottom(leftX-22, baseY, 70, 14)
    ctx.fillStyle='#111'; ctx.font=`800 ${FS.label}px system-ui`; ctx.textAlign='left'; ctx.fillText('Very Low', labelX, baseY+10)
    ctx.textAlign='right'; ctx.fillText(`${Math.round(pct.vlow)}%`, labelX+260, baseY+10)
    ctx.fillStyle='#8c939e'; ctx.font=`600 ${FS.goal}px system-ui`; ctx.textAlign='center'; ctx.fillText('Goal: <1%', labelX+120, baseY+46)
  }

  function onResize(){ draw() }
  onMount(()=>{ ctx = canvas.getContext('2d'); draw(); window.addEventListener('resize', onResize); return ()=> window.removeEventListener('resize', onResize) })

  $: draw()
</script>

<canvas bind:this={canvas} style="width:100%; display:block;"></canvas>
