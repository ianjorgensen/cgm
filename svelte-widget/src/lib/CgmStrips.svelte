<script>
  import { onMount } from 'svelte'
  import targets from '../../targets.json'

  import * as d3 from 'd3'

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'general' // 'general' | 'tight' | 'pregnancy'
  // Optional: color lines/fills across the entire padded week window.
  // Default is false so non-selected areas are greyed out.
  export let colorWholeWeek = false

  let svg
  function cssVar(name, def){ try{ const v=(getComputedStyle(svg).getPropertyValue(name)||'').trim(); return v||def }catch{return def} }

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const unit = ()=> isMmol() ? 'mmol' : 'mg'
  const unitPretty = ()=> isMmol() ? 'mmol/L':'mg/dL'

  

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
    const colGap = 0
    //const rowGap = 12
    const rowGap = 30
    //const M = { l:50, r:20, t:30, b:10 }
    const M = { l:0, r:0, t:40, b:0 }
    // Make day tiles narrow enough to fit 7 per row in typical demo widths
    const cw = Math.max(100, Math.floor((W - M.l - M.r - (cols-1)*colGap)/cols))
    // Slightly more compact rows: ~4/5 of previous height
    const cellH = Math.round(86 * 0.8), innerT = Math.round(18 * 0.8)

    // Compute days padded to full weeks (Monday→Sunday)
    const dayMs = 24*60*60*1000
    const sel0 = range.start, sel1 = range.end
    const startDay0 = d3.timeDay.floor(new Date(sel0)).getTime()
    const endDay0   = d3.timeDay.floor(new Date(sel1)).getTime()
    const startD = new Date(startDay0)
    const endD   = new Date(endDay0)
    const offsetToMon = (startD.getDay()+6)%7 // Monday=0
    const offsetToSun = (7-((endD.getDay()+6)%7)-1) // Sunday end
    // Use d3.timeDay offsets to be DST-safe
    const startDay = d3.timeDay.offset(new Date(startDay0), -offsetToMon).getTime()
    const endDay   = d3.timeDay.offset(new Date(endDay0),   offsetToSun).getTime()
    const endCutoff = d3.timeDay.offset(new Date(endDay), 1).getTime()
    const days = d3.timeDay.range(new Date(startDay), d3.timeDay.offset(new Date(endDay), 1)).map(d=>d.getTime())
    const nDays = days.length
    const rows = Math.ceil(nDays / cols)
    const H = M.t + rows*cellH + (rows-1)*rowGap + M.b
    svg.setAttribute('height', H)

    // map absolute ms to day index map for faster lookups
    const byDay = new Map(days.map(d=>[d, []]))
    for (let i=0;i<values.length;i++){
      const v = values[i]; if (!(Number.isFinite(v) && v>=0)) continue
      const t = time[i]
      // include data within padded week range [startDay, endDay+1day)
      if (t < startDay || t >= endCutoff) continue
      // bucket by local day using d3.timeDay to avoid DST issues
      const ds = d3.timeDay.floor(new Date(t)).getTime()
      if (!byDay.has(ds)) continue
      byDay.get(ds).push({ t: t - ds, v, a: t })
    }

    // thresholds & scales
    const th = targets[preset].thresholds[unit()]
    const toLabel = v => isMmol() ? (Math.round(v*10)/10).toFixed(1) : Math.round(v).toString()
    const perHr = 60*60*1000 / data.stepMs

    // day-of-week headers across first row (Mon→Sun)
    //const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    const weekdays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    weekdays.forEach((d,i)=>{
      if (rows>0){
        d3.select(svg).append('text')
          .attr('x', M.l + i*(cw+colGap) + cw/2)
          .attr('y', 16)
          .attr('text-anchor','middle')
          .attr('fill', cssVar('--cgm-muted', '#555'))
          .attr('font-size',10)
          .text(d)
      }
    })

    // vertical end-of-day guides at day boundaries (right edge of each tile),
    // drawn per row with gaps around date numbers (not continuous across rows)
    // Skip drawing these guides inside regions where both adjacent days are in the future.
    const today = d3.timeDay.floor(new Date()).getTime()
    for (let c=1;c<=cols-1;c++){
      const xg = M.l + c*(cw+colGap)
      for (let r=0;r<rows;r++){
        const rowStartIdx = r*cols
        const idxLeft = rowStartIdx + (c-1)
        const idxRight = rowStartIdx + c
        const dsLeft = days[idxLeft]
        const dsRight = days[idxRight]
        // Skip future-only separators
        if ((dsLeft!==undefined && dsLeft>today) && (dsRight!==undefined && dsRight>today)) continue
        // Draw the separator at the boundary between today and the future
        const gy = M.t + r*(cellH + rowGap)
        d3.select(svg).append('line')
          .attr('x1', xg).attr('x2', xg)
          .attr('y1', gy + 4)
          .attr('y2', gy + cellH - 4)
          .attr('stroke', cssVar('--cgm-grid', '#e6e6e6')).attr('stroke-width', 1)
      }
    }

    // draw each cell (day)
    // `today` computed above for guide lines reuse
    const fmtMon = d3.timeFormat('%b'), fmtYear = d3.timeFormat('%Y')
    const ord = (n)=>{ const v=n%100; if(v<11||v>13){ const u=n%10; if(u===1) return 'st'; if(u===2) return 'nd'; if(u===3) return 'rd' } return 'th' }
    days.forEach((ds, idx)=>{
      const r = Math.floor(idx / cols)
      const c = idx % cols
      const gx = M.l + c*(cw + colGap)
      const gy = M.t + r*(cellH + rowGap)
      const g = root.append('g').attr('transform', `translate(${gx},${gy})`).attr('class','day')
      const x = d3.scaleLinear().domain([0, 24*perHr - 1]).range([0, cw])
      const y = d3.scaleLinear().domain(isMmol()? [0, 20]: [0, 360]).range([cellH-innerT, 0])

      const isFuture = ds > today
      if (!isFuture){
        // background band and threshold lines (match play.html)
        g.append('rect')
          .attr('x',0).attr('y',y(th.high))
          .attr('width',cw).attr('height',Math.max(1,y(th.low)-y(th.high)))
          .attr('fill', cssVar('--cgm-target-band-bg', '#efefef'))
        g.append('line').attr('x1',0).attr('x2',cw).attr('y1',y(th.high)).attr('y2',y(th.high)).attr('stroke', cssVar('--cgm-threshold', '#2e7d32')).attr('opacity',0.7)
        g.append('line').attr('x1',0).attr('x2',cw).attr('y1',y(th.low)).attr('y2',y(th.low)).attr('stroke', cssVar('--cgm-threshold', '#2e7d32')).attr('opacity',0.7)
      }

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
      const vizStart = colorWholeWeek ? startDay : sel0
      const vizEnd   = colorWholeWeek ? (endCutoff - 1) : sel1
      const inside = (d)=> d.a>=vizStart && d.a<=vizEnd
      const areaAbove = d3.area()
        .defined(d=>Number.isFinite(d.v) && d.v>th.high && inside(d))
        .x(d=>x(d.t/data.stepMs))
        .y0(d=>y(th.high))
        .y1(d=>y(d.v))
      if (!isFuture) segs.forEach(seg=>{ if (seg.length>1) g.append('path').attr('d', areaAbove(seg)).attr('fill', cssVar('--cgm-high', '#fdae61')).attr('opacity',0.35) })

      // red area below target
      const areaBelow = d3.area()
        .defined(d=>Number.isFinite(d.v) && d.v<th.low && inside(d))
        .x(d=>x(d.t/data.stepMs))
        .y0(d=>y(d.v))
        .y1(d=>y(th.low))
      if (!isFuture) segs.forEach(seg=>{ if (seg.length>1) g.append('path').attr('d', areaBelow(seg)).attr('fill', cssVar('--cgm-low-strong', '#d73027')).attr('opacity',0.25) })

      // glucose line colored by band (below=red, in=green, above=orange) per contiguous segment
      const lineAll = d3.line().x(d=>x(d.t/data.stepMs)).y(d=>y(d.v)).curve(d3.curveMonotoneX)
      const inDef   = d=>Number.isFinite(d.v) && inside(d) && d.v>=th.low && d.v<=th.high
      const lowDef  = d=>Number.isFinite(d.v) && inside(d) && d.v < th.low
      const highDef = d=>Number.isFinite(d.v) && inside(d) && d.v > th.high
      const mk = (pred,color)=>d3.line().defined(pred).x(d=>x(d.t/data.stepMs)).y(d=>y(d.v)).curve(d3.curveMonotoneX)
      const lineIn   = mk(inDef, cssVar('--cgm-in-range', '#1a9850'))
      const lineLow  = mk(lowDef, cssVar('--cgm-low-strong', '#d73027'))
      const lineHigh = mk(highDef, cssVar('--cgm-high', '#fdae61'))
      if (!isFuture) {
        segs.forEach(seg=>{
          if (seg.length>1){
            // outside selection: grey context
            const lineGrey = d3.line().defined(d=>Number.isFinite(d.v) && !inside(d)).x(d=>x(d.t/data.stepMs)).y(d=>y(d.v)).curve(d3.curveMonotoneX)
            g.append('path').attr('d', lineGrey(seg)).attr('stroke', cssVar('--cgm-context', '#c7c7c7')).attr('fill','none').attr('stroke-width',1.2).attr('opacity',0.8)
            g.append('path').attr('d', lineLow(seg)).attr('stroke','#d73027').attr('fill','none').attr('stroke-width',1.5)
            g.append('path').attr('d', lineHigh(seg)).attr('stroke','#fdae61').attr('fill','none').attr('stroke-width',1.5)
            g.append('path').attr('d', lineIn(seg)).attr('stroke','#1a9850').attr('fill','none').attr('stroke-width',1.5)
          }
        })
      }

      // date number on top-left and 12pm label centered
      const dObj = new Date(ds)
      const dayNum = dObj.getDate()
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      const briefLabel = String(dayNum)
      const fullLabel = `${dayNum}${ord(dayNum)} ${monthNames[dObj.getMonth()]} ${dObj.getFullYear()}`
      if (!isFuture){
        g.append('text')
          .attr('class','date-label date-brief')
          .attr('x', 0).attr('y', -8)
          .attr('fill','#777').attr('font-size',10).attr('text-anchor','start')
          .text(briefLabel)
        g.append('text')
          .attr('class','date-label date-full')
          .attr('x', 0).attr('y', -8)
          .attr('fill','#777').attr('font-size',10).attr('text-anchor','start')
          .text(fullLabel)
        if (r < rows - 1){
        g.append('text').attr('x', cw/2).attr('y', cellH-2).attr('text-anchor','middle').attr('fill', cssVar('--cgm-axis-color', '#777')).attr('font-size',10).text('12pm')
        }
      }

      // Interactive layer: hover highlights date; click selects that day
      if (!isFuture){
        g.append('rect')
          .attr('x', -12).attr('y', -10)
          .attr('width', cw + 12).attr('height', cellH)
          .attr('fill', 'rgba(0,0,0,0.001)')
          .style('pointer-events','all')
          .on('mouseenter', ()=> { g.classed('hover', true) })
          .on('mouseleave', ()=> { g.classed('hover', false) })
      }
    })
  }

  $: if (data && range && preset) draw()
  $: if (svg) draw()
  onMount(()=>{ initSeries(); draw(); window.addEventListener('resize', draw) })
</script>

<svg bind:this={svg} style="width:100%; display:block;"></svg>

<style>
  :global(.day.hover .date-label) {
    fill: var(--cgm-text, #111) !important;
    font-weight: inherit;
  }
  :global(.day .date-full) { display: none; }
  :global(.day.hover .date-full) { display: inline; }
  :global(.day.hover .date-brief) { display: none; }
</style>
