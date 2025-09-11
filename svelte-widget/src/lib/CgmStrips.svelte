<script>
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'N' // 'N','T','P'

  let svg

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  function TH(){
    if (isMmol()){
      if (preset==='T') return { vlow:3.0, low:3.9, high:7.8 }
      if (preset==='P') return { vlow:3.0, low:3.5, high:7.8 }
      return { vlow:3.0, low:3.9, high:10.0 }
    } else {
      if (preset==='T') return { vlow:54, low:70, high:140 }
      if (preset==='P') return { vlow:54, low:63, high:140 }
      return { vlow:54, low:70, high:180 }
    }
  }

  let time, values
  function initSeries(){
    if (!data) return
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  function draw(){
    if (!svg || !data || !range || !time || !values) return
    const root = d3.select(svg)
    root.selectAll('*').remove()

    const bbox = svg.getBoundingClientRect()
    const W = Math.max(360, bbox.width || 1100)
    const cols = 7
    const gap = 0
    const M = { l:50, r:20, t:30, b:10 }
    const cw = Math.max(140, Math.floor((W - M.l - M.r - (cols-1)*gap)/cols))
    const cellH = 86, innerT = 18

    // Compute days padded to full weeks (Monday→Sunday)
    const dayMs = 24*60*60*1000
    const sel0 = range.start, sel1 = range.end
    const startDay0 = d3.timeDay.floor(new Date(sel0)).getTime()
    const endDay0   = d3.timeDay.floor(new Date(sel1)).getTime()
    const startD = new Date(startDay0)
    const endD   = new Date(endDay0)
    const offsetToMon = (startD.getDay()+6)%7 // Monday=0
    const offsetToSun = (7-((endD.getDay()+6)%7)-1) // Sunday end
    const startDay = startDay0 - offsetToMon*dayMs
    const endDay   = endDay0 + offsetToSun*dayMs
    const days = []
    for (let t=startDay; t<=endDay; t+=dayMs) days.push(t)
    const nDays = days.length
    const rows = Math.ceil(nDays / cols)
    const H = M.t + rows*cellH + (rows-1)*gap + M.b
    svg.setAttribute('height', H)

    // map absolute ms to day index map for faster lookups
    const byDay = new Map(days.map(d=>[d, []]))
    for (let i=0;i<values.length;i++){
      const v = values[i]; if (!(Number.isFinite(v) && v>=0)) continue
      const t = time[i]; if (t<startDay || t> endDay + dayMs) continue
      const d = new Date(t)
      const ds = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
      if (!byDay.has(ds)) continue
      byDay.get(ds).push({ t: t - ds, v, a: t })
    }

    // thresholds & scales
    const th = TH()
    const toLabel = v => isMmol() ? (Math.round(v*10)/10).toFixed(1) : Math.round(v).toString()
    const perHr = 60*60*1000 / data.stepMs

    // day-of-week headers across first row (Mon→Sun)
    const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    weekdays.forEach((d,i)=>{
      if (rows>0){
        d3.select(svg).append('text')
          .attr('x', M.l + i*(cw+gap) + cw/2)
          .attr('y', 16)
          .attr('text-anchor','middle')
          .attr('fill','#555')
          .attr('font-size',10)
          .text(d)
      }
    })

    // vertical end-of-day guides at day boundaries (right edge of each tile),
    // drawn per row with gaps around date numbers (not continuous across rows)
    for (let c=1;c<=cols-1;c++){
      const xg = M.l + c*(cw+gap)
      for (let r=0;r<rows;r++){
        const gy = M.t + r*(cellH + gap)
        d3.select(svg).append('line')
          .attr('x1', xg).attr('x2', xg)
          .attr('y1', gy + 4)
          .attr('y2', gy + cellH - 4)
          .attr('stroke', '#e6e6e6').attr('stroke-width', 1)
      }
    }

    // draw each cell (day)
    days.forEach((ds, idx)=>{
      const r = Math.floor(idx / cols)
      const c = idx % cols
      const gx = M.l + c*(cw + gap)
      const gy = M.t + r*(cellH + gap)
      const g = root.append('g').attr('transform', `translate(${gx},${gy})`)
      const x = d3.scaleLinear().domain([0, 24*perHr - 1]).range([0, cw])
      const y = d3.scaleLinear().domain(isMmol()? [0, 20]: [0, 360]).range([cellH-innerT, 0])

      // background band and threshold lines (match play.html)
      g.append('rect')
        .attr('x',0).attr('y',y(th.high))
        .attr('width',cw).attr('height',Math.max(1,y(th.low)-y(th.high)))
        .attr('fill','#efefef')
      g.append('line').attr('x1',0).attr('x2',cw).attr('y1',y(th.high)).attr('y2',y(th.high)).attr('stroke','#2e7d32').attr('opacity',0.7)
      g.append('line').attr('x1',0).attr('x2',cw).attr('y1',y(th.low)).attr('y2',y(th.low)).attr('stroke','#2e7d32').attr('opacity',0.7)

      // Sort series and split by gaps > 2 readings (do not join across gaps)
      const raw = (byDay.get(ds) || []).slice().sort((a,b)=>a.t-b.t)
      const maxGap = 2 * data.stepMs
      const segs = []
      let cur = []
      for (const p of raw){
        if (!Number.isFinite(p.v)) { if (cur.length) { segs.push(cur); cur=[] }; continue }
        if (cur.length && (p.t - cur[cur.length-1].t) > maxGap){ segs.push(cur); cur=[p] } else { cur.push(p) }
      }
      if (cur.length) segs.push(cur)

      // orange area above target (per segment)
      const inside = (d)=> d.a>=sel0 && d.a<=sel1
      const areaAbove = d3.area()
        .defined(d=>Number.isFinite(d.v) && d.v>th.high && inside(d))
        .x(d=>x(d.t/data.stepMs))
        .y0(d=>y(th.high))
        .y1(d=>y(d.v))
      segs.forEach(seg=>{ if (seg.length>1) g.append('path').attr('d', areaAbove(seg)).attr('fill','#fdae61').attr('opacity',0.35) })

      // red area below target
      const areaBelow = d3.area()
        .defined(d=>Number.isFinite(d.v) && d.v<th.low && inside(d))
        .x(d=>x(d.t/data.stepMs))
        .y0(d=>y(d.v))
        .y1(d=>y(th.low))
      segs.forEach(seg=>{ if (seg.length>1) g.append('path').attr('d', areaBelow(seg)).attr('fill','#d73027').attr('opacity',0.25) })

      // glucose line colored by band (below=red, in=green, above=orange) per contiguous segment
      const lineAll = d3.line().x(d=>x(d.t/data.stepMs)).y(d=>y(d.v)).curve(d3.curveMonotoneX)
      const inDef   = d=>Number.isFinite(d.v) && inside(d) && d.v>=th.low && d.v<=th.high
      const lowDef  = d=>Number.isFinite(d.v) && inside(d) && d.v < th.low
      const highDef = d=>Number.isFinite(d.v) && inside(d) && d.v > th.high
      const mk = (pred,color)=>d3.line().defined(pred).x(d=>x(d.t/data.stepMs)).y(d=>y(d.v)).curve(d3.curveMonotoneX)
      const lineIn   = mk(inDef,'#1a9850')
      const lineLow  = mk(lowDef,'#d73027')
      const lineHigh = mk(highDef,'#fdae61')
      segs.forEach(seg=>{
        if (seg.length>1){
          // outside selection: grey context
          const lineGrey = d3.line().defined(d=>Number.isFinite(d.v) && !inside(d)).x(d=>x(d.t/data.stepMs)).y(d=>y(d.v)).curve(d3.curveMonotoneX)
          g.append('path').attr('d', lineGrey(seg)).attr('stroke','#c7c7c7').attr('fill','none').attr('stroke-width',1.2).attr('opacity',0.8)
          g.append('path').attr('d', lineLow(seg)).attr('stroke','#d73027').attr('fill','none').attr('stroke-width',1.5)
          g.append('path').attr('d', lineHigh(seg)).attr('stroke','#fdae61').attr('fill','none').attr('stroke-width',1.5)
          g.append('path').attr('d', lineIn(seg)).attr('stroke','#1a9850').attr('fill','none').attr('stroke-width',1.5)
        }
      })

      // date number on top-left and 12pm label centered
      const dObj = new Date(ds)
      const dayNum = dObj.getDate()
      const showMonth = dayNum===1
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      const dateLabel = showMonth ? `1 ${monthNames[dObj.getMonth()]}` : String(dayNum)
      g.append('text').attr('x', -12).attr('y', -8).attr('fill','#777').attr('font-size',10).attr('text-anchor','start').text(dateLabel)
      if (r < rows - 1){
        g.append('text').attr('x', cw/2).attr('y', cellH-2).attr('text-anchor','middle').attr('fill','#777').attr('font-size',10).text('12pm')
      }
    })
  }

  $: if (data && range && preset) draw()
  onMount(()=>{ initSeries(); draw(); window.addEventListener('resize', draw) })
</script>

<svg bind:this={svg} style="width:100%; display:block;"></svg>
