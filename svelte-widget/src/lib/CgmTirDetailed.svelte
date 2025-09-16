<script>
  import { createEventDispatcher } from 'svelte'
  import targets from '../../targets.json'
  
  const dispatch = createEventDispatcher()
  let host
  function cssVar(name, def){ try{ const v=(getComputedStyle(host).getPropertyValue(name)||'').trim(); return v||def }catch{return def} }
  export let data
  export let range = null
  export let preset = 'general' // 'general' | 'tight' | 'pregnancy'
  // Optional: draw thin separators between stacked ranges
  export let showSeparators = false

  let time, values
  const dayMs = 24*60*60*1000

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const unit = ()=> isMmol() ? 'mmol' : 'mg'
  const unitPretty = ()=> isMmol() ? 'mmol/L':'mg/dL'
  const toMg = (v)=> isMmol() ? v*18 : v

  const PRESET_CFG = targets
  const TH = ()=> PRESET_CFG[preset].thresholds[unit()]
  // Recompute thresholds reactively when preset or data/units change
  $: currentThresholds = (preset, data, TH())
  let pct = { vlow:0, low:0, targ:0, high:0, vhigh:0 }
  let present = 0, expected = 0
  let minutes = { vlow:0, low:0, targ:0, high:0, vhigh:0 }
  let hoverAll = false
  export let showTime = false
  $: displayTime = hoverAll || showTime
  // Hover/keyboard state toggles Goal <-> (time)
  // (defined once at top)

  function initSeries(){
    if (!data) return
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  $: if (data) initSeries()

  function emit(){
    try { dispatch('stats', { pct, present, expected, preset, units: data?.units || 'mmol/L' }) } catch {}
  }

  $: if (data && range && time && values && preset){
    const { start, end } = range
    const i0 = Math.max(0, Math.ceil((start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((end - time[0]) / data.stepMs))
    if (i1 < i0){ pct={vlow:0,low:0,targ:0,high:0,vhigh:0}; present=0; expected=0; minutes={vlow:0,low:0,targ:0,high:0,vhigh:0}; }
    else {
      const th = TH()
      let c = { vlow:0, low:0, targ:0, high:0, vhigh:0 }, valid=0
      for (let i=i0;i<=i1;i++){
        const v = values[i]; if (!(Number.isFinite(v) && v>=0)) continue
        valid++
        if (v < th.veryLow) c.vlow++
        else if (v < th.low) c.low++
        else if (v <= th.high) c.targ++
        else if (v <= th.veryHigh) c.high++
        else c.vhigh++
      }
      present = valid
      expected = Math.max(1, i1 - i0 + 1)
      if (valid === 0) {
        pct={vlow:0,low:0,targ:0,high:0,vhigh:0}
        minutes={vlow:0,low:0,targ:0,high:0,vhigh:0}
      } else {
        pct={
          vlow: c.vlow/valid*100,
          low:  c.low/valid*100,
          targ: c.targ/valid*100,
          high: c.high/valid*100,
          vhigh:c.vhigh/valid*100,
        }
        // Normalize to 24 hours (1440 minutes)
        const minutesIn24h = 24 * 60
        minutes = {
          vlow: (c.vlow/valid) * minutesIn24h,
          low:  (c.low/valid) * minutesIn24h,
          targ: (c.targ/valid) * minutesIn24h,
          high: (c.high/valid) * minutesIn24h,
          vhigh:(c.vhigh/valid) * minutesIn24h,
        }
      }
    }
    emit()
  }

  function formatTime(mins) {
    const hours = Math.floor(mins / 60)
    const remainingMins = Math.round(mins % 60)
    if (hours === 0) return `${remainingMins}min`
    return `${hours}h${remainingMins.toString().padStart(2, '0')}min`
  }

  // Make getRangeText reactive to preset and data changes
  $: getRangeText = (type) => {
    const th = currentThresholds
    
    if (type === 'vhigh') return `>${th.veryHigh} ${unitPretty()}`
    if (type === 'high') return `${th.high}-${th.veryHigh} ${unitPretty()}`
    if (type === 'targ') return `${th.low}-${th.high} ${unitPretty()}`
    if (type === 'low') return `${th.veryLow}-${th.low} ${unitPretty()}`
    if (type === 'vlow') return `<${th.veryLow} ${unitPretty()}`
    return ''
  }

  // Calculate bar heights based on percentages
  const chartHeight = 180
  const svgHeight = 240
  const rightX = 340 // right-aligned anchor for value text and callout ends
  const svgWidth = rightX + 10 // trim extra right whitespace
  $: barHeights = {
    vhigh: (pct.vhigh / 100) * chartHeight,
    high: (pct.high / 100) * chartHeight,
    targ: (pct.targ / 100) * chartHeight,
    low: (pct.low / 100) * chartHeight,
    vlow: (pct.vlow / 100) * chartHeight
  }

  // Calculate positions from bottom up
  $: barPositions = {
    vlow: chartHeight - barHeights.vlow,
    low: chartHeight - barHeights.vlow - barHeights.low,
    targ: chartHeight - barHeights.vlow - barHeights.low - barHeights.targ,
    high: chartHeight - barHeights.vlow - barHeights.low - barHeights.targ - barHeights.high,
    vhigh: chartHeight - barHeights.vlow - barHeights.low - barHeights.targ - barHeights.high - barHeights.vhigh
  }

  // Calculate line positions for callouts (middle of each bar)
  $: linePositions = {
    vhigh: barPositions.vhigh + barHeights.vhigh / 2,
    high: barPositions.high + barHeights.high / 2,
    targ: barPositions.targ + barHeights.targ / 2,
    low: barPositions.low + barHeights.low / 2,
    vlow: barPositions.vlow + barHeights.vlow / 2
  }

  // Y-axis label positions - at glucose threshold boundaries
  $: yAxisPositions = {
    low: barPositions.vlow, // Boundary between vlow and low sections
    high: barPositions.targ, // Boundary between target and high sections
    vhigh: barPositions.high // Boundary between high and vhigh sections
  }

  // Text label Y positions - vhigh and vlow stay fixed, others follow callout lines
  $: textPositions = {
    vhigh: 55, // Fixed at top
    high: pct.high > 0 ? 70 + linePositions.high : 105,
    targ: pct.targ > 0 ? 70 + linePositions.targ : 181,
    low: pct.low > 0 ? 70 + linePositions.low : 242,
    vlow: 270 // Fixed at bottom
  } 

  // Goal thresholds for percentages by preset (from clinical guidance)
  function goalPct(type){
    return targets[preset].percentGoals[type]
  }

  // Hover state over entire widget toggles Goal <-> (time)
  // (defined earlier)
</script>

<div class="widget-container" role="img" aria-label="TIR detailed" on:mouseenter={()=> hoverAll=true} on:mouseleave={()=> hoverAll=false}>
  <svg bind:this={host} width="{svgWidth}" height="{svgHeight}" viewBox="0 0 {svgWidth} {svgHeight}">    
    
    <!-- Y-axis values (hidden when no data) -->
    {#if present > 0}
      <text x="35" y="{30 + yAxisPositions.low}" font-family="Arial, sans-serif" font-size="10" fill="#666" text-anchor="end">{isMmol() ? currentThresholds.low.toFixed(1) : currentThresholds.low}</text>
      <text x="35" y="{30 + yAxisPositions.high}" font-family="Arial, sans-serif" font-size="10" fill="#666" text-anchor="end">{isMmol() ? currentThresholds.high.toFixed(1) : currentThresholds.high}</text>
      <text x="35" y="{30 + yAxisPositions.vhigh}" font-family="Arial, sans-serif" font-size="10" fill="#666" text-anchor="end">{isMmol() ? currentThresholds.veryHigh.toFixed(1) : currentThresholds.veryHigh}</text>
    {/if}
    
    <!-- Callout lines (rendered first so bars are on top) -->
    <!-- Very High - always connects to fixed top position -->
    <path d="M 40 {30 + linePositions.vhigh} L 65 {30 + linePositions.vhigh} L 65 25 Q 65 15 70 15 L {rightX} 15" stroke="#ccc" stroke-width="1" fill="none"/>
    
    {#if pct.high > 0}
      <line x1="90" y1="{30 + linePositions.high}" x2="{rightX}" y2="{textPositions.high - 40}" stroke="#ccc" stroke-width="1"/>
    {/if}
    {#if pct.targ > 0}
      <line x1="90" y1="{30 + linePositions.targ}" x2="{rightX}" y2="{textPositions.targ - 40}" stroke="#ccc" stroke-width="1"/>
    {/if}
    {#if pct.low > 0}
      <line x1="90" y1="{30 + linePositions.low}" x2="{rightX}" y2="{textPositions.low - 40}" stroke="#ccc" stroke-width="1"/>
    {/if}
    
    <!-- Very Low - always connects to fixed bottom position -->
    <path d="M 40 {30 + linePositions.vlow} L 65 {30 + linePositions.vlow} L 65 225 Q 65 230 70 230 L {rightX} 230" stroke="#ccc" stroke-width="1" fill="none"/>
    
    <!-- Chart background -->
    <rect x="40" y="30" width="50" height="180" fill="white" stroke="#ccc" stroke-width="1"/>
    
    <!-- Color bars from bottom to top -->
    {#if barHeights.vlow > 0}
      <rect x="40" y="{30 + barPositions.vlow}" width="50" height="{barHeights.vlow}" fill="{cssVar('--cgm-very-low', '#e57373')}"/>
    {/if}
    {#if barHeights.low > 0}
      <rect x="40" y="{30 + barPositions.low}" width="50" height="{barHeights.low}" fill="{cssVar('--cgm-low', '#ff9e80')}"/>
    {/if}
    {#if barHeights.targ > 0}
      <rect x="40" y="{30 + barPositions.targ}" width="50" height="{barHeights.targ}" fill="{cssVar('--cgm-in-range', '#86c89d')}"/>
    {/if}
    {#if barHeights.high > 0}
      <rect x="40" y="{30 + barPositions.high}" width="50" height="{barHeights.high}" fill="{cssVar('--cgm-high', '#ffcc80')}"/>
    {/if}
    {#if barHeights.vhigh > 0}
      <rect x="40" y="{30 + barPositions.vhigh}" width="50" height="{barHeights.vhigh}" fill="{cssVar('--cgm-very-high', '#ff8a65')}"/>
    {/if}

    <!-- Thin white separators at band boundaries (behind flag) -->
    {#if showSeparators}
      {#if barHeights.vlow>2 && barHeights.low>2}
        <line x1="40" x2="90" y1="{30 + barPositions.vlow}" y2="{30 + barPositions.vlow}" stroke="#fff" stroke-width="1"/>
      {/if}
      {#if barHeights.low>2 && barHeights.targ>2}
        <line x1="40" x2="90" y1="{30 + barPositions.low}" y2="{30 + barPositions.low}" stroke="#fff" stroke-width="1"/>
      {/if}
      {#if barHeights.targ>2 && barHeights.high>2}
        <line x1="40" x2="90" y1="{30 + barPositions.targ}" y2="{30 + barPositions.targ}" stroke="#fff" stroke-width="1"/>
      {/if}
      {#if barHeights.high>2 && barHeights.vhigh>2}
        <line x1="40" x2="90" y1="{30 + barPositions.high}" y2="{30 + barPositions.high}" stroke="#fff" stroke-width="1"/>
      {/if}
    {/if}
    
    <!-- Range labels and percentages -->
    <!-- Very High -->
    <g transform="translate(0, {textPositions.vhigh - 40})">
      <text x="103" y="0" font-family="Arial, sans-serif">
        <tspan font-size="12" font-weight="bold" fill="#333">Very High</tspan>
        <tspan font-size="10" fill="#777"> {getRangeText('vhigh')}</tspan>
      </text>
      <text x="{rightX}" y="0" font-family="Arial, sans-serif" text-anchor="end">
        <tspan font-size="12" font-weight="bold" fill="#333">{Math.round(pct.vhigh)}%</tspan>
        <tspan font-size="10" fill="#777"> {displayTime ? `(${formatTime(minutes.vhigh)})` : `Goal ${goalPct('veryHigh')}`}</tspan>
      </text>
    </g>
    
    <!-- High -->
    <g transform="translate(0, {textPositions.high - 40})">
      <text x="103" y="0" font-family="Arial, sans-serif">
        <tspan font-size="12" font-weight="bold" fill="#333">High</tspan>
        <tspan font-size="10" fill="#777"> {getRangeText('high')}</tspan>
      </text>
      <text x="{rightX}" y="0" font-family="Arial, sans-serif" text-anchor="end">
        <tspan font-size="12" font-weight="bold" fill="#333">{Math.round(pct.high)}%</tspan>
        <tspan font-size="10" fill="#777"> {displayTime ? `(${formatTime(minutes.high)})` : `Goal ${goalPct('high')}`}</tspan>
      </text>
    </g>
    
    <!-- Target -->
    <g transform="translate(0, {textPositions.targ - 40})">
      <text x="103" y="0" font-family="Arial, sans-serif">
        <tspan font-size="12" font-weight="bold" fill="#333">Target</tspan>
        <tspan font-size="10" fill="#777"> {getRangeText('targ')}</tspan>
      </text>
      <text x="{rightX}" y="0" font-family="Arial, sans-serif" text-anchor="end">
        <tspan font-size="12" font-weight="bold" fill="#333">{Math.round(pct.targ)}%</tspan>
        <tspan font-size="10" fill="#777"> {displayTime ? `(${formatTime(minutes.targ)})` : `Goal ${goalPct('inRange')}`}</tspan>
      </text>
    </g>
    
    <!-- Low -->
    <g transform="translate(0, {textPositions.low - 40})">
      <text x="103" y="0" font-family="Arial, sans-serif">
        <tspan font-size="12" font-weight="bold" fill="#333">Low</tspan>
        <tspan font-size="10" fill="#777"> {getRangeText('low')}</tspan>
      </text>
      <text x="{rightX}" y="0" font-family="Arial, sans-serif" text-anchor="end">
        <tspan font-size="12" font-weight="bold" fill="#333">{Math.round(pct.low)}%</tspan>
        <tspan font-size="10" fill="#777"> {displayTime ? `(${formatTime(minutes.low)})` : `Goal ${goalPct('low')}`}</tspan>
      </text>
    </g>
    
    <!-- Very Low -->
    <g transform="translate(0, {textPositions.vlow - 40})">
      <text x="103" y="0" font-family="Arial, sans-serif">
        <tspan font-size="12" font-weight="bold" fill="#333">Very Low</tspan>
        <tspan font-size="10" fill="#777"> {getRangeText('vlow')}</tspan>
      </text>
      <text x="340" y="0" font-family="Arial, sans-serif" text-anchor="end">
        <tspan font-size="12" font-weight="bold" fill="#333">{Math.round(pct.vlow)}%</tspan>
        <tspan font-size="10" fill="#777"> {displayTime ? `(${formatTime(minutes.vlow)})` : `Goal ${goalPct('veryLow')}`}</tspan>
      </text>
    </g>
  </svg>
</div>

<style>
  .widget-container {
    border-radius: 8px;
    overflow: hidden;
    display: inline-block;
  }
  svg {
    display: block;
  }
</style>
