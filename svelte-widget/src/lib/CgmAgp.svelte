<script>
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  export let data
  export let range = null // { start, end }
  export let preset = 'N'

  let svg
  let W = 900, H = 260
  const M = { l:50, r:60, t:20, b:26 }
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

  let time, values
  function initSeries(){
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  function quantileSorted(a, p){
    if (!a.length) return NaN
    const pos = (a.length-1)*p; const b = Math.floor(pos); const r = pos-b
    return a[b] + (a[Math.min(a.length-1,b+1)]-a[b])*(r||0)
  }

  function computeSeries(i0, i1){
    const samplesPerDay = Math.max(1, Math.round(dayMs / data.stepMs))
    const byMin = Array.from({length:samplesPerDay}, ()=> [])
    const days = new Set()
    for (let i=i0;i<=i1;i++){
      const v = values[i]; if (!(Number.isFinite(v) && v>=0)) continue
      const t = time[i]
      const d = new Date(t); const midnight = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
      days.add(midnight)
      let bin = Math.round((t - midnight) / data.stepMs)
      if (bin < 0) bin = 0; else if (bin >= samplesPerDay) bin = samplesPerDay-1
      byMin[bin].push(v)
    }
    const series = byMin.map((arr,i)=>{
      const a = Float64Array.from(arr).sort()
      return {
        t:i,
        p05: quantileSorted(a, 0.05),
        p25: quantileSorted(a, 0.25),
        p50: quantileSorted(a, 0.50),
        p75: quantileSorted(a, 0.75),
        p95: quantileSorted(a, 0.95),
      }
    })
    return { series, samplesPerDay }
  }

  function draw(){
    if (!svg || !data || !range || !time || !values) return
    const bbox = svg.getBoundingClientRect()
    W = Math.max(360, bbox.width || 900)
    H = Math.max(220, bbox.height || 260)
    const root = d3.select(svg)
    root.selectAll('*').remove()

    // indices for range
    const i0 = Math.max(0, Math.ceil((range.start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((range.end - time[0]) / data.stepMs))
    if (i1 < i0) return

    const { series, samplesPerDay } = computeSeries(i0, i1)
    const ys = series.flatMap(s=>[s.p05, s.p95]).filter(Number.isFinite)
    if (!ys.length){
      root.append('text').attr('x',M.l).attr('y',H/2).text('Not enough data in selection to compute AGP');
      return
    }

    const x = d3.scaleLinear().domain([0, samplesPerDay-1]).range([M.l, W-M.r])
    // y axis: cap max similar to play.html
    const th = TH()
    const capMax = isMmol() ? 20 : 360
    // Fixed Y domain independent of selection
    const y = d3.scaleLinear().domain([th.vlow, capMax]).range([H-M.b, M.t])

    // bands and areas
    const area = (y0, y1)=> d3.area().defined(d=>Number.isFinite(y0(d))&&Number.isFinite(y1(d)))
      .x(d=>x(d.t)).y0(y0).y1(y1)

    const aBelow = d3.area().defined(d=>Number.isFinite(d.p05)&&Number.isFinite(d.p95) && d.p05 < th.low)
      .x(d=>x(d.t)).y0(d=>y(Math.min(d.p95, th.low))).y1(d=>y(d.p05))
    const aIn = d3.area().defined(d=>Number.isFinite(d.p05)&&Number.isFinite(d.p95) && d.p95>th.low && d.p05<th.high)
      .x(d=>x(d.t)).y0(d=>y(Math.min(d.p95, th.high))).y1(d=>y(Math.max(d.p05, th.low)))
    const aAboveMid = d3.area().defined(d=>Number.isFinite(d.p05)&&Number.isFinite(d.p95) && d.p95>th.high && d.p05<th.vhigh)
      .x(d=>x(d.t)).y0(d=>y(Math.min(d.p95, th.vhigh))).y1(d=>y(Math.max(d.p05, th.high)))
    const aAboveVhStraddle = d3.area().defined(d=>Number.isFinite(d.p05)&&Number.isFinite(d.p95) && d.p95>th.vhigh && d.p05<th.vhigh)
      .x(d=>x(d.t)).y0(d=>y(d.p95)).y1(d=>y(th.vhigh))
    const aAboveVh = d3.area().defined(d=>Number.isFinite(d.p05)&&Number.isFinite(d.p95) && d.p05>th.vhigh)
      .x(d=>x(d.t)).y0(d=>y(d.p95)).y1(d=>y(d.p05))

    // Background target band
    root.append('rect')
      .attr('x', M.l).attr('width', (W-M.r) - M.l)
      .attr('y', y(th.high)).attr('height', y(th.low) - y(th.high))
      .attr('fill', '#1a9850').attr('opacity', 0.10)

    root.append('path').attr('d', aBelow(series)).attr('fill','#d73027').attr('opacity',0.18)
    root.append('path').attr('d', aIn(series)).attr('fill','#1a9850').attr('opacity',0.12)
    root.append('path').attr('d', aAboveMid(series)).attr('fill','#fdae61').attr('opacity',0.18)
    root.append('path').attr('d', aAboveVhStraddle(series)).attr('fill','#f46d43').attr('opacity',0.26)
    root.append('path').attr('d', aAboveVh(series)).attr('fill','#f46d43').attr('opacity',0.26)

    // IQR split fills
    const iqrIn = d3.area().defined(d=>Number.isFinite(d.p25)&&Number.isFinite(d.p75) && d.p75>th.low && d.p25<th.high)
      .x(d=>x(d.t)).y0(d=>y(Math.min(Math.max(d.p25, th.low), th.high))).y1(d=>y(Math.max(Math.min(d.p75, th.high), th.low)))
    const iqrAboveMid = d3.area().defined(d=>Number.isFinite(d.p25)&&Number.isFinite(d.p75) && d.p75>th.high && d.p25<th.vhigh)
      .x(d=>x(d.t)).y0(d=>y(Math.min(d.p75, th.vhigh))).y1(d=>y(Math.max(d.p25, th.high)))
    const iqrAboveVhStraddle = d3.area().defined(d=>Number.isFinite(d.p25)&&Number.isFinite(d.p75) && d.p75>th.vhigh && d.p25<th.vhigh)
      .x(d=>x(d.t)).y0(d=>y(d.p75)).y1(d=>y(th.vhigh))
    const iqrBelow = d3.area().defined(d=>Number.isFinite(d.p25)&&Number.isFinite(d.p75) && d.p25<th.low)
      .x(d=>x(d.t)).y0(d=>y(d.p25)).y1(d=>y(Math.min(d.p75, th.low)))

    root.append('path').attr('d', iqrBelow(series)).attr('fill','#d73027').attr('opacity',0.35)
    root.append('path').attr('d', iqrIn(series)).attr('fill','#1a9850').attr('opacity',0.25)
    root.append('path').attr('d', iqrAboveMid(series)).attr('fill','#fdae61').attr('opacity',0.35)
    root.append('path').attr('d', iqrAboveVhStraddle(series)).attr('fill','#f46d43').attr('opacity',0.45)

    // 50th line colored by band with precise splits (low/high/vhigh)
    try {
      const colorFor = v => (v < th.low ? '#d73027' : (v > th.vhigh ? '#f46d43' : (v > th.high ? '#fdae61' : '#1a9850')))
      const line50 = d3.line().x(d=>x(d.t)).y(d=>y(d.p50))
      const addSeg = (segs, col, a, b) => {
        if (!Number.isFinite(a.p50) || !Number.isFinite(b.p50)) return
        if (!segs.length || segs[segs.length-1].color !== col) segs.push({color:col, arr:[a]})
        segs[segs.length-1].arr.push(b)
      }
      function between(v0,v1,B){ return (v0<B && v1>=B) || (v0>B && v1<=B) }
      function inter(t0,v0,t1,v1,B){ const t = t0 + (B - v0) * (t1 - t0) / (v1 - v0); return {t, p50:B} }
      let segs=[]; let prev=null
      for (let i=0;i<series.length;i++){
        const cur=series[i]
        if (!Number.isFinite(cur.p50)) { prev=null; continue }
        if (!prev){ prev=cur; continue }
        const t0=prev.t, v0=prev.p50, t1=cur.t, v1=cur.p50
        let pts=[{t:t0,p50:v0}], vprev=v0, tprev=t0
        const ths=[th.low, th.high, th.vhigh]
        const ascend=v1>v0; const ordered = ascend? ths : ths.slice().reverse()
        ordered.forEach(B=>{ if (between(vprev, v1, B)){ const p=inter(tprev, vprev, t1, v1, B); pts.push(p); vprev=p.p50; tprev=p.t } })
        pts.push({t:t1,p50:v1})
        for (let k=1;k<pts.length;k++){
          const a=pts[k-1], b=pts[k]
          const mid=(a.p50 + b.p50)/2 + (b.p50===a.p50? (b.t>a.t?1e-6:-1e-6):0)
          const col=colorFor(mid)
          addSeg(segs, col, a, b)
        }
        prev=cur
      }
      segs.forEach(seg=>{ if (seg.arr.length>=2) root.append('path').attr('d', line50(seg.arr)).attr('stroke', seg.color).attr('fill','none').attr('stroke-width',2) })
    } catch {}

    // thresholds
    root.append('line').attr('x1',M.l).attr('x2',W-M.r).attr('y1',y(th.high)).attr('y2',y(th.high)).attr('stroke','#6ea77b').attr('stroke-width',1)
    root.append('line').attr('x1',M.l).attr('x2',W-M.r).attr('y1',y(th.low)).attr('y2',y(th.low)).attr('stroke','#6ea77b').attr('stroke-width',1)
    root.append('line').attr('x1',M.l).attr('x2',W-M.r).attr('y1',y(th.vlow)).attr('y2',y(th.vlow)).attr('stroke','#cccccc').attr('stroke-width',1)
    root.append('line').attr('x1',M.l).attr('x2',W-M.r).attr('y1',y(th.vhigh)).attr('y2',y(th.vhigh)).attr('stroke','#cccccc').attr('stroke-width',1)

    // axes + right-side percentile labels
    const perHr = 60*60*1000 / data.stepMs
    const ticks = d3.range(0, 24, 3).map(h=>Math.round(h*perHr))
    const fmtHr = h => (h===0||h===24) ? '12am' : (h<12?`${h}am`:(h===12?'12pm':`${h-12}pm`))
    root.append('g').attr('transform',`translate(0,${H-M.b})`).call(d3.axisBottom(x).tickValues(ticks).tickFormat(t=>fmtHr(Math.round(t/perHr))).tickSizeOuter(0))
    const yTicks = [TH().vlow, TH().low, TH().high, TH().vhigh, (isMmol()?20:360)].filter(v=>v>=th.vlow && v<=capMax)
    const fmtY = isMmol() ? (v=> (Math.round(v*10)/10)) : (v=> Math.round(v))
    root.append('g').attr('transform',`translate(${M.l},0)`).call(d3.axisLeft(y).tickValues(yTicks).tickFormat(fmtY)).call(g=>g.select('.domain').remove())

    // Right-side percentile labels 5,25,50,75,95 at last defined positions
    try {
      const lastOf = key => { for (let i=series.length-1;i>=0;i--){ const v=series[i][key]; if (Number.isFinite(v)) return {t:series[i].t, v}; } return null }
      const pad = 41
      const place = (pct, p)=>{ if (!p) return; const xP=Math.min(W-M.r-2, x(p.t)+pad); const yP=y(p.v); d3.select(svg).append('text').attr('x', xP+5).attr('y', yP).attr('dy','0.35em').attr('text-anchor','start').attr('fill','#000').attr('font-size',11).attr('font-weight', pct===50?700:400).text(`${pct}%`) }
      place(5,  lastOf('p05'))
      place(25, lastOf('p25'))
      place(50, lastOf('p50'))
      place(75, lastOf('p75'))
      place(95, lastOf('p95'))
    } catch {}

    // Green target range pill labels at left for low/high
    try {
      const padX = 6, r = 5, h = 16
      const green = '#1a9850'
      const fmt = v => {
        if (isMmol()){
          const s = (Math.round(v*10)/10).toFixed(1)
          return s.endsWith('.0') ? s.slice(0,-2) : s
        }
        return Math.round(v).toString()
      }
      function pill(val){
        const yPos = y(val)
        
        // compute text width by temporary text
        const tx = d3.select(svg).append('text')
          .attr('x', -9999).attr('y', -9999)
          .attr('fill', '#fff').attr('font-size', 11).attr('font-weight', 700)
          .text(fmt(val))
        const bb = (tx.node()).getBBox()
        tx.remove()
        const w = Math.ceil(bb.width)
        const rectX = M.l - 8 - (w + padX*2)
        const rectY = yPos - h/2
        // rect
        d3.select(svg).append('rect')
          .attr('x', rectX).attr('y', rectY)
          .attr('rx', r).attr('ry', r)
          .attr('width', w + padX*2).attr('height', h)
          .attr('fill', green)
        // text on top
        d3.select(svg).append('text')
          .attr('x', rectX + padX).attr('y', yPos)
          .attr('dy', '0.35em')
          .attr('fill', '#fff').attr('font-size', 11).attr('font-weight', 700)
          .text(fmt(val))
      }
      pill(th.low); pill(th.high)
    } catch {}
  }

  $: if (data && range && time && values && preset) draw()
  onMount(()=>{ initSeries(); draw(); window.addEventListener('resize', draw) })
</script>

<svg bind:this={svg} style="width:100%; height:260px; display:block;"></svg>
