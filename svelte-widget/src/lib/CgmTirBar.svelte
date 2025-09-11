<script>
  import { onMount } from 'svelte'

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'N'

  // Derived
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

  const COLORS = { vlow:'#e57373', low:'#ff9e80', targ:'#86c89d', high:'#ffcc80', vhigh:'#ff8a65' }

  // results
  let pct = { vlow:0, low:0, targ:0, high:0, vhigh:0 }
  let present = 0, expected = 0

  function presetName(){ return preset==='T' ? 'Tight' : (preset==='P' ? 'Pregnancy' : 'General') }
  function rangeText(){
    const th = TH()
    if (isMmol()){
      const fmt = v => (Math.round(v*10)/10).toFixed(1)
      return `${fmt(th.low)}–${fmt(th.high)} mmol/L`
    } else {
      return `${Math.round(th.low)}–${Math.round(th.high)} mg/dL`
    }
  }
  // Make right legend reactive on preset (and units)
  $: currentPresetName = (preset==='T' ? 'Tight' : (preset==='P' ? 'Pregnancy' : 'General'))
  // Force dependency on preset and data.units so Svelte recomputes when either changes
  $: currentRangeText = (()=>{
    const mmol = /mmol/i.test(data?.units || 'mmol')
    let low, high
    if (mmol){
      if (preset==='T'){ low=3.9; high=7.8 }
      else if (preset==='P'){ low=3.5; high=7.8 }
      else { low=3.9; high=10.0 }
      const fmt=(v)=>{ const s=(Math.round(v*10)/10).toFixed(1); return s.endsWith('.0')? s.slice(0,-2) : s }
      return `${fmt(low)}–${fmt(high)} mmol/L`
    } else {
      if (preset==='T'){ low=70; high=140 }
      else if (preset==='P'){ low=63; high=140 }
      else { low=70; high=180 }
      return `${Math.round(low)}–${Math.round(high)} mg/dL`
    }
  })()

  function initSeries(){
    if (!data) return
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  $: if (data) initSeries()

  $: if (data && range && time && values && preset){
    const { start, end } = range
    const i0 = Math.max(0, Math.ceil((start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((end - time[0]) / data.stepMs))
    if (i1 < i0){ pct={vlow:0,low:0,targ:0,high:0,vhigh:0}; present=0; expected=0; }
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
      expected = Math.max(1, i1 - i0 + 1)
      if (valid === 0) pct={vlow:0,low:0,targ:0,high:0,vhigh:0}
      else pct={
        vlow: c.vlow/valid*100,
        low:  c.low/valid*100,
        targ: c.targ/valid*100,
        high: c.high/valid*100,
        vhigh:c.vhigh/valid*100,
      }
    }
  }

  onMount(()=>{ initSeries() })
</script>

<div class="tirbar">
  <div class="bar">
    <div class="seg vlow"  style="width:{pct.vlow}%"  title="Very low"></div>
    <div class="seg low"   style="width:{pct.low}%"   title="Low"></div>
    <div class="seg targ"  style="width:{pct.targ}%"  title="Target"></div>
    <div class="seg high"  style="width:{pct.high}%"  title="High"></div>
    <div class="seg vhigh" style="width:{pct.vhigh}%" title="Very high"></div>
  </div>
  <div class="legend">
    <div class="left"><span class="strong">{pct.targ.toFixed(1)}%</span> in range <span class="muted">· Goal >= 70%</span></div>
    <div class="right">{currentPresetName} Range Used: {currentRangeText}</div>
  </div>
</div>

<style>
  .tirbar { border:1px solid #eee; padding:10px; border-radius:8px; background:#fff; max-width:600px; }
  .bar { display:flex; height:16px; border-radius:8px; overflow:hidden; border:1px solid #ddd; }
  .seg { height:100%; }
  .seg.vlow  { background: #e57373; }
  .seg.low   { background: #ff9e80; }
  .seg.targ  { background: #86c89d; }
  .seg.high  { background: #ffcc80; }
  .seg.vhigh { background: #ff8a65; }
  .legend { margin-top:8px; display:flex; align-items:baseline; justify-content:space-between; }
  .legend .left { font-size:12px; }
  .legend .right { font-size:12px; color:#777; margin-left:auto; text-align:right; }
  .strong { font-weight:700; }
  .muted { color:#777; font-size:12px; }
  .muted { color:#777; }
</style>
