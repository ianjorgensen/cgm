<script>
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'N'

  let root

  const COLORS = { vlow:'#8a2f2f', low:'#d65b5b', targ:'#169b58', high:'#f1aa3b', vhigh:'#e47c2f' }

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  function TH(){
    if (isMmol()){
      if (preset==='T') return { vlow:3.0, low:3.9, high:7.8, vhigh:13.9, unit:'mmol/L' }
      if (preset==='P') return { vlow:3.0, low:3.5, high:7.8, vhigh:13.9, unit:'mmol/L' }
      return { vlow:3.0, low:3.9, high:10.0, vhigh:13.9, unit:'mmol/L' }
    }
    if (preset==='T') return { vlow:54, low:70, high:140, vhigh:250, unit:'mg/dL' }
    if (preset==='P') return { vlow:54, low:63, high:140, vhigh:250, unit:'mg/dL' }
    return { vlow:54, low:70, high:180, vhigh:250, unit:'mg/dL' }
  }

  // Derived series
  let time, values
  const tStart = ()=> new Date(data.t0).getTime()
  $: if (data){ time = Float64Array.from({length:data.glucose.length}, (_,i)=> tStart() + i*data.stepMs); values = Float64Array.from(data.glucose) }

  function windowIdx(){
    if (!values || !time) return { i0:0, i1: values?values.length-1:0 }
    if (!range) return { i0:0, i1: values.length-1 }
    return {
      i0: Math.max(0, Math.ceil((range.start - time[0]) / data.stepMs)),
      i1: Math.min(values.length-1, Math.floor((range.end - time[0]) / data.stepMs))
    }
  }

  const fmtDec = (v)=> (Math.round(v*10)/10).toFixed(1).replace(/\.0$/,'')
  function fmtRange(th, band){
    if (isMmol()){
      const as = (v)=> fmtDec(v)
      if (band==='vhigh') return `>${as(th.vhigh)} ${th.unit}`
      if (band==='high')  return `${as(th.high+0.1)}–${as(th.vhigh)} ${th.unit}`
      if (band==='targ')  return `${as(th.low)}–${as(th.high)} ${th.unit}`
      if (band==='low')   return `${as(th.vlow)}–${as(th.low-0.1)} ${th.unit}`
      return `<${as(th.vlow)} ${th.unit}`
    } else {
      const as = (v)=> Math.round(v)
      if (band==='vhigh') return `>${as(th.vhigh)} ${th.unit}`
      if (band==='high')  return `${as(th.high+1)}–${as(th.vhigh)} ${th.unit}`
      if (band==='targ')  return `${as(th.low)}–${as(th.high)} ${th.unit}`
      if (band==='low')   return `${as(th.vlow)}–${as(th.low-1)} ${th.unit}`
      return `<${as(th.vlow)} ${th.unit}`
    }
  }

  function fmtDur(ms){ const m=Math.round(ms/60000); const h=Math.floor(m/60); const mm=m%60; return `(${h}h${String(mm).padStart(2,'0')}min)` }

  function draw(){
    if (!root || !values) return
    const { i0, i1 } = windowIdx()
    const th = TH()
    let n=0, c={ vlow:0, low:0, targ:0, high:0, vhigh:0 }
    for (let i=i0;i<=i1;i++){
      const v=values[i]; if(!(Number.isFinite(v)&&v>=0)) continue
      n++
      if (v < th.vlow) c.vlow++
      else if (v < th.low) c.low++
      else if (v <= th.high) c.targ++
      else if (v <= th.vhigh) c.high++
      else c.vhigh++
    }
    const pct=(k)=> n? Math.round(1000*c[k]/n)/10 : 0
    const bandDurMs=(k)=> c[k] * data.stepMs

    // layout
    const W = Math.max(700, root.getBoundingClientRect().width || 700)
    const H = 360
    const M = { l:78, r:50, t:20, b:20 }
    const svg = d3.select(root).selectAll('svg').data([0]).join('svg').attr('width', W).attr('height', H)
    svg.selectAll('*').remove()

    // Left stacked bar with fixed band heights (visual)
    const bar = { x:M.l+20, w:56, top:M.t+18, h:H-M.t-M.b-36 }
    const hmap = { vhigh:72, high:72, targ:140, low:20, vlow:20 }
    let y=bar.top
    ;(['vhigh','high','targ','low','vlow']).forEach(k=>{ svg.append('rect').attr('x',bar.x).attr('y',y).attr('width',bar.w).attr('height',hmap[k]).attr('fill',COLORS[k]); y+=hmap[k] })
    // Threshold labels left of bar
    const leftText = (txt, yy)=> svg.append('text').attr('x', bar.x-10).attr('y', yy).attr('text-anchor','end').attr('dominant-baseline','middle').attr('font-weight',700).attr('fill','#222').text(txt)
    leftText(isMmol()? fmtDec(th.vhigh): String(Math.round(th.vhigh)), bar.top + hmap.vhigh)
    leftText(isMmol()? fmtDec(th.high) : String(Math.round(th.high)),  bar.top + hmap.vhigh + hmap.high)
    leftText(th.unit, bar.top + hmap.vhigh + hmap.high + hmap.targ/2)
    leftText(isMmol()? fmtDec(th.low)  : String(Math.round(th.low)),   bar.top + hmap.vhigh + hmap.high + hmap.targ)
    leftText(isMmol()? fmtDec(th.vlow) : String(Math.round(th.vlow)),  bar.top + hmap.vhigh + hmap.high + hmap.targ + hmap.low)

    // Rows for each band label and value
    const rows = [
      {k:'vhigh', label:'Very High'},
      {k:'high',  label:'High'},
      {k:'targ',  label:'Target'},
      {k:'low',   label:'Low'},
      {k:'vlow',  label:'Very Low'}
    ]
    const rowY = (idx)=> M.t + 30 + idx*70
    rows.forEach((r, idx)=>{
      const yy = rowY(idx)
      // separator line
      if (idx>0) svg.append('line').attr('x1', M.l+110).attr('x2', W-M.r).attr('y1', yy-24).attr('y2', yy-24).attr('stroke','#e1e4ea')
      svg.append('text').attr('x', M.l+120).attr('y', yy).attr('font-weight', 800).attr('fill', '#111').text(r.label)
      svg.append('text').attr('x', M.l+120 + 90).attr('y', yy).attr('fill', '#888').text(fmtRange(th, r.k))
      svg.append('text').attr('x', W-M.r-120).attr('y', yy).attr('text-anchor','end').attr('font-weight',800).attr('fill','#111').text(`${pct(r.k)}%`)
      svg.append('text').attr('x', W-M.r-20).attr('y', yy).attr('fill', '#888').text(fmtDur(bandDurMs(r.k)))
    })
  }

  onMount(()=> draw())
  $: if (data && (range || true) && preset){ draw() }
</script>

<div bind:this={root} style="width:100%;"></div>

