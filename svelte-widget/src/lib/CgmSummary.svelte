<script>
  import { onMount } from 'svelte'
  import * as d3 from 'd3'

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'N' // 'N' general, 'T' tight, 'P' pregnancy

  let avgText = '—'
  let gmiText = '—'
  let cvText  = '—'
  let activeText = '—'
  let presentCnt = 0, expectedCnt = 0
  let periodText = ''
  let daysCount = 0

  let time, values, dayMs = 24*60*60*1000
  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const toMg = (v)=> isMmol() ? v*18 : v
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

  function initSeries(){
    if (!data) return
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  // Re-create series when data changes
  $: if (data) { initSeries() }

  // Compute metrics whenever range or data-derived arrays change
  $: if (data && range && time && values) {
    const { start, end } = range
    const i0 = Math.max(0, Math.ceil((start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((end - time[0]) / data.stepMs))
    try {
      if (typeof window !== 'undefined' && (window).CGM_DEBUG) {
        console.log('[CgmSummary] update', {
          startISO: new Date(start).toISOString(),
          endISO: new Date(end).toISOString(),
          stepMs: data.stepMs,
          i0, i1,
          len: values.length
        })
      }
    } catch {}
    if (i1 < i0){ avgText='—'; gmiText='—'; cvText='—'; activeText='—'; presentCnt=0; expectedCnt=0; periodText=''; daysCount=0; }
    else {
      const slice = []
      for (let i=i0;i<=i1;i++){ const v = values[i]; if (Number.isFinite(v) && v>=0) slice.push(v) }
      const expected = Math.max(1, i1 - i0 + 1)
      const present = slice.length
      presentCnt = present; expectedCnt = expected
      const activePct = 100 * present / expected
      activeText = `${activePct.toFixed(1)}%`
      const mean = d3.mean(slice)
      const variance = d3.variance(slice) ?? 0
      const sd = Math.sqrt(variance)
      const gmi = Number.isFinite(mean) ? (3.31 + 0.02392 * toMg(mean)) : NaN
      const cv = Number.isFinite(mean) && mean !== 0 ? (sd/mean*100) : NaN
      avgText = Number.isFinite(mean) ? (isMmol() ? `${mean.toFixed(1)} mmol/L` : `${Math.round(mean)} mg/dL`) : '—'
      gmiText = Number.isFinite(gmi) ? `${gmi.toFixed(1)}%` : '—'
      cvText  = Number.isFinite(cv)  ? `${cv.toFixed(1)}%`  : '—'
    const fmtMD = d3.timeFormat('%b %e, %Y')
      const sD = new Date(start), eD = new Date(end)
      periodText = `${fmtMD(sD)} – ${fmtMD(eD)}`
      const utc0 = Date.UTC(sD.getUTCFullYear(), sD.getUTCMonth(), sD.getUTCDate())
      const utc1 = Date.UTC(eD.getUTCFullYear(), eD.getUTCMonth(), eD.getUTCDate())
      daysCount = Math.max(1, Math.floor((utc1 - utc0)/dayMs) + 1)
    }
  }

  onMount(()=>{ initSeries() })
</script>

  <div class="summary" style="padding:0 10px;">
  <!--<div class="metric"><div><b>Time Periods</b></div><div>{periodText} ({daysCount} days)</div></div>-->
  <div class="metric"><div><b>Average Glucose</b><div class="muted">Goal: {isMmol() ? `Target ${TH().low.toFixed(1)}–${TH().high.toFixed(1)} mmol/L` : `Target ${Math.round(TH().low)}–${Math.round(TH().high)} mg/dL`}</div></div><div>{avgText}</div></div>
  <div class="metric"><div><b>Glucose Management Indicator (GMI)</b><div class="muted">Goal: &lt;7%</div></div><div>{gmiText}</div></div>
  <div class="metric"><div><b>Glucose Variability (CV)</b><div class="muted">Goal: ≤36%</div></div><div>{cvText}</div></div>
  <div class="muted" style="font-size:11px; margin-top:6px; margin-left: 8px;">Time CGM Active: {activeText}%</div>
</div>

<style>
  .metric { display:flex; justify-content:space-between; padding:6px 8px; border-bottom:1px solid #f1f1f1; }
  .metric:last-child { border-bottom:none; }
  /* Emphasize right-side values */
  .metric > div:last-child { font-weight:700; color:#111; }
  .muted { color:#777; }
</style>
