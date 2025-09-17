<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import * as d3 from 'd3'
  import targets from '../../targets.json'

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'general' // 'general' | 'tight' | 'pregnancy'

  const dispatch = createEventDispatcher()

  let avgText = '—'
  let gmiText = '—'
  let cvText  = '—'
  let targetRangeText = '—'
  let presetLabel = 'General'
  let avgGoalText = ''
  let gmiGoalText = ''
  let cvGoalText  = ''
  let activeText = '—'
  let presentCnt = 0, expectedCnt = 0
  let periodText = ''
  let daysCount = 0

  let time, values, dayMs = 24*60*60*1000

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const unit = ()=> isMmol() ? 'mmol' : 'mg'
  const unitPretty = ()=> isMmol() ? 'mmol/L':'mg/dL'
  const toMg = (v)=> isMmol() ? v*18 : v

  
  
  function initSeries(){
    if (!data) return
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  // Display string for the current target range based on preset/units (prefer targets.json)
  $: (function(){
    const thresholds = targets[preset].thresholds[unit()]
    targetRangeText = thresholds.low + '-' + thresholds.high + unitPretty()
  })()

  // Human label for current preset (prefer targets.json)
  $: presetLabel = targets[preset].label

  // Inline goals for top metrics from targets.json when available
  $: (function(){
    const g = targets[preset].metricsGoals;
    // Average Glucose
    avgGoalText = g.averageGlucose[unit()]
    // GMI
    gmiGoalText = g.gmi
    // CV
    cvGoalText = g.cv
  })()

  function setPresetLocal(key){
    if (key!==preset){ preset = key; dispatch('presetchange', { preset: key }) }
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
      // Period label: show year only on the last date when within same year
      function fmtPeriod(sms, ems){
        const s=new Date(sms), e=new Date(ems)
        const fmtMD = d3.timeFormat('%b %e'), fmtMDY=d3.timeFormat('%b %e, %Y'), fmtDY=d3.timeFormat('%e, %Y')
        const utc0 = Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())
        const utc1 = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())
        const sameDay = utc0===utc1
        if (sameDay) return fmtMDY(e)
        if (s.getFullYear()===e.getFullYear()){
          if (s.getMonth()===e.getMonth()) return `${fmtMD(s)} – ${fmtDY(e)}`
          // Different month, same year: show months on both, year only on end
          return `${fmtMD(s)} – ${fmtMDY(e)}`
        }
        return `${fmtMDY(s)} – ${fmtMDY(e)}`
      }
      periodText = fmtPeriod(start, end)
      const sD = new Date(start), eD = new Date(end)
      const utc0 = Date.UTC(sD.getUTCFullYear(), sD.getUTCMonth(), sD.getUTCDate())
      const utc1 = Date.UTC(eD.getUTCFullYear(), eD.getUTCMonth(), eD.getUTCDate())
      daysCount = Math.max(1, Math.floor((utc1 - utc0)/dayMs) + 1)
    }
  }

  // Humanized span label (1 day, 1 week, 2 weeks, 1 month, 3 months) based on hours
  $: spanLabel = (()=>{
    if (!range) return `${daysCount} Days`
    const H = 60*60*1000
    const hours = Math.max(0, Math.round((range.end - range.start) / H))
    const daysEq = Math.round(hours / 24)
    if (daysEq === 1) return '1 Day'
    //if (daysEq === 3) return '3 Days'
    if (daysEq === 7) return '1 Week'
    if (daysEq === 14) return '2 Weeks'
    if (daysEq === 21) return '3 Weeks'
    if (daysEq === 30) return '1 Month'
    if (daysEq === 90) return '3 Months'
    // default: pluralize daysCount
    return `${daysCount} Days`
  })()

  onMount(()=>{ initSeries() })
</script>

  <div class="summary" style="padding:0 10px;">
    <div class="metric"><div><b>{spanLabel}</b></div><div>{periodText}</div></div>
    <div class="metric">
      <div>
        <b>Target Range</b>
        <div class="target-switch">
          <button type="button" class="opt {preset==='general' ? 'active' : 'muted'}" on:click={()=> setPresetLocal('general')} aria-label="Set target range: General">General</button>·
          <button type="button" class="opt {preset==='tight' ? 'active' : 'muted'}" on:click={()=> setPresetLocal('tight')} aria-label="Set target range: Tight">Tight</button>·
          <button type="button" class="opt {preset==='pregnancy' ? 'active' : 'muted'}" on:click={()=> setPresetLocal('pregnancy')} aria-label="Set target range: Pregnancy">Pregnancy</button>
        </div>
      </div>
      <div style="font-weight: normal;">{targetRangeText}</div>
    </div>
    <div class="muted" style="font-size:11px; margin-top:6px; margin-left: 8px;  padding-bottom: 30px">Time CGM Active: {activeText}</div>
    <div class="metric"><div><b>Average Glucose</b><div class="muted"style="font-size:11px;">Goal: {avgGoalText}</div></div><div>{avgText}</div></div>
    <div class="metric"><div><b>Glucose Management Indicator (GMI)</b><div class="muted"style="font-size:11px;">Goal: {gmiGoalText}</div></div><div>{gmiText}</div></div>
    <div class="metric"><div><b>Glucose Variability (CV)</b><div class="muted" style="font-size:11px;">Goal: {cvGoalText}</div></div><div>{cvText}</div></div>
  </div>

<style>
  .metric { display:flex; justify-content:space-between; padding:6px 8px; border-bottom:1px solid var(--cgm-border, #f1f1f1); }
  .metric:last-child { border-bottom:none; }
  /* Emphasize right-side values */
  .metric > div:last-child { font-weight:700; color: var(--cgm-text, #111); }
  .metric b { color: var(--cgm-title, var(--cgm-text, #111)); }
  .muted { color: var(--cgm-muted, #777); }
  .target-switch { display:flex; gap:8px; margin-top:4px; }
  .opt { border:0; background:none; cursor:pointer; font-size:11px; color: var(--cgm-muted, #555); padding:0 !important }
  .opt.muted { opacity:0.5; }
  .opt.active { opacity:1; color: var(--cgm-text, #111); }
  .opt:hover { color: var(--cgm-text, #111); }
  :global(.cgm-widget), :global(.cgm-widget *), :global(.cgm-widget text) {
    font-family: var(--cgm-font, system-ui, sans-serif);
  }
</style>
