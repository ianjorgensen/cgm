<script>
  // SVG widget modeled after the provided mockup, but data-driven
  import { onMount } from 'svelte'

  export let data
  export let range = null // { start, end } ms
  export let preset = 'N' // 'N' | 'T' | 'P'

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  function TH(){
    if (isMmol()){
      if (preset==='T') return { vlow:3.0, low:3.9, high:7.8, vhigh:13.9, unit:'mmol/L' }
      if (preset==='P') return { vlow:3.0, low:3.5, high:7.8, vhigh:13.9, unit:'mmol/L' }
      return { vlow:3.0, low:3.9, high:10.0, vhigh:13.9, unit:'mmol/L' }
    } else {
      if (preset==='T') return { vlow:54, low:70, high:140, vhigh:250, unit:'mg/dL' }
      if (preset==='P') return { vlow:54, low:63, high:140, vhigh:250, unit:'mg/dL' }
      return { vlow:54, low:70, high:180, vhigh:250, unit:'mg/dL' }
    }
  }

  let time, values
  const tStart = ()=> new Date(data.t0).getTime()
  $: if (data){
    time = Float64Array.from({length:data.glucose.length}, (_,i)=> tStart() + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  function idxWindow(){
    if (!values) return { i0:0, i1:0 }
    if (!range) return { i0:0, i1:values.length-1 }
    const i0 = Math.max(0, Math.ceil((range.start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((range.end - time[0]) / data.stepMs))
    return { i0, i1 }
  }

  function pct(v, n){ return n ? Math.round(1000*v/n)/10 : 0 }
  function dur(ms){ const m=Math.round(ms/60000); const h=Math.floor(m/60); const mm=m%60; return `(${h}h${String(mm).padStart(2,'0')}min)` }
  const fmt1 = (x)=> isMmol() ? (Math.round(x*10)/10).toFixed(1).replace(/\.0$/,'') : String(Math.round(x))

  let stats = { vhigh:{pct:0,dur:'(0min)'}, high:{pct:0,dur:'(0min)'}, targ:{pct:0,dur:'(0min)'}, low:{pct:0,dur:'(0min)'}, vlow:{pct:0,dur:'(0min)'} }
  function compute(){
    if (!values) return
    const th = TH(); const { i0, i1 } = idxWindow()
    let n=0; let c={ vlow:0, low:0, targ:0, high:0, vhigh:0 }
    for (let i=i0;i<=i1;i++){
      const v=values[i]; if (!(Number.isFinite(v) && v>=0)) continue
      n++
      if (v < th.vlow) c.vlow++
      else if (v < th.low) c.low++
      else if (v <= th.high) c.targ++
      else if (v <= th.vhigh) c.high++
      else c.vhigh++
    }
    const step = data.stepMs
    stats = {
      vhigh: { pct: pct(c.vhigh,n), dur: dur(c.vhigh*step) },
      high:  { pct: pct(c.high,n),  dur: dur(c.high*step)  },
      targ:  { pct: pct(c.targ,n),  dur: dur(c.targ*step)  },
      low:   { pct: pct(c.low,n),   dur: dur(c.low*step)   },
      vlow:  { pct: pct(c.vlow,n),  dur: dur(c.vlow*step)  }
    }
  }

  onMount(compute)
  $: if (data && (range || true) && preset){ compute() }
</script>

<svg width="400" height="320" viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
  <!-- Bar slot -->
  <rect x="15" y="40" width="50" height="210" fill="white" stroke="#ccc" stroke-width="1"/>

  <!-- Axis ticks (units + thresholds, data-driven) -->
  <text x="10" y="250" font-size="10" fill="#666" text-anchor="end">{fmt1(TH().vlow)}</text>
  <text x="10" y="220" font-size="10" fill="#666" text-anchor="end">{fmt1(TH().low)}</text>
  <text x="10" y="165" font-size="10" fill="#666" text-anchor="end">{fmt1(TH().high)}</text>
  <text x="10" y="85"  font-size="10" fill="#666" text-anchor="end">{fmt1(TH().vhigh)}</text>
  <text x="8" y="155" font-size="10" fill="#666" text-anchor="middle" transform="rotate(-90, 8, 155)">{TH().unit}</text>

  <!-- Stacked bar segments (fixed visual heights to match mock) -->
  <!-- Very High -->
  <rect x="15" y="40" width="50" height="25" fill="#ff6600"/>
  <!-- High -->
  <rect x="15" y="65" width="50" height="50" fill="#ff8c00"/>
  <!-- Target -->
  <rect x="15" y="115" width="50" height="120" fill="#2d8f2d"/>
  <!-- Low -->
  <rect x="15" y="235" width="50" height="12" fill="#990000"/>
  <!-- Very Low -->
  <rect x="15" y="247" width="50" height="3" fill="#cc0000"/>

  <!-- Labels & values, data-driven -->
  <!-- Very High -->
  <text x="80" y="48" font-size="11" font-weight="bold" fill="#333">Very High</text>
  <text x="80" y="60" font-size="9" fill="#666">&gt;{fmt1(TH().vhigh)} {TH().unit}</text>
  <text x="370" y="48" font-size="11" font-weight="bold" fill="#333" text-anchor="end">{stats.vhigh.pct}%</text>
  <text x="370" y="60" font-size="9" fill="#666" text-anchor="end">{stats.vhigh.dur}</text>

  <!-- High -->
  <text x="80" y="82" font-size="11" font-weight="bold" fill="#333">High</text>
  <text x="80" y="94" font-size="9" fill="#666">{isMmol() ? `${fmt1(TH().high+0.1)}-${fmt1(TH().vhigh)} ${TH().unit}` : `${fmt1(TH().high+1)}-${fmt1(TH().vhigh)} ${TH().unit}`}</text>
  <text x="370" y="82" font-size="11" font-weight="bold" fill="#333" text-anchor="end">{stats.high.pct}%</text>
  <text x="370" y="94" font-size="9" fill="#666" text-anchor="end">{stats.high.dur}</text>

  <!-- Target -->
  <text x="80" y="165" font-size="11" font-weight="bold" fill="#333">Target</text>
  <text x="80" y="177" font-size="9" fill="#666">{fmt1(TH().low)}-{fmt1(TH().high)} {TH().unit}</text>
  <text x="370" y="165" font-size="11" font-weight="bold" fill="#333" text-anchor="end">{stats.targ.pct}%</text>
  <text x="370" y="177" font-size="9" fill="#666" text-anchor="end">{stats.targ.dur}</text>

  <!-- Low -->
  <text x="80" y="235" font-size="11" font-weight="bold" fill="#333">Low</text>
  <text x="80" y="247" font-size="9" fill="#666">{isMmol() ? `${fmt1(TH().vlow)}-${fmt1(TH().low-0.1)} ${TH().unit}` : `${fmt1(TH().vlow)}-${fmt1(TH().low-1)} ${TH().unit}`}</text>
  <text x="370" y="235" font-size="11" font-weight="bold" fill="#333" text-anchor="end">{stats.low.pct}%</text>
  <text x="370" y="247" font-size="9" fill="#666" text-anchor="end">{stats.low.dur}</text>

  <!-- Very Low -->
  <text x="80" y="265" font-size="11" font-weight="bold" fill="#333">Very Low</text>
  <text x="80" y="277" font-size="9" fill="#666">&lt;{fmt1(TH().vlow)} {TH().unit}</text>
  <text x="370" y="265" font-size="11" font-weight="bold" fill="#333" text-anchor="end">{stats.vlow.pct}%</text>
  <text x="370" y="277" font-size="9" fill="#666" text-anchor="end">{stats.vlow.dur}</text>
</svg>

