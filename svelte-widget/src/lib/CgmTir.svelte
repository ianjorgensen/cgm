<script>
  import { onMount } from 'svelte'
  import targets from '../../targets.json'

  export let data
  export let range = null // { start, end } in ms
  export let preset = 'general' // 'general' | 'tight' | 'pregnancy'

  // Derived
  let time, values
  const dayMs = 24*60*60*1000

  const isMmol = ()=> /mmol/i.test(data?.units || 'mmol')
  const unitKey = ()=> isMmol() ? 'mmol' : 'mg'
  const TH = ()=> targets[preset].thresholds[unitKey()]

  let host
  function cssVar(name, def){ try{ const v=(getComputedStyle(host).getPropertyValue(name)||'').trim(); return v||def }catch{return def} }
  $: COLORS = {
    vlow: cssVar('--cgm-very-low', '#e57373'),
    low: cssVar('--cgm-low', '#ff9e80'),
    targ: cssVar('--cgm-in-range', '#86c89d'),
    high: cssVar('--cgm-high', '#ffcc80'),
    vhigh: cssVar('--cgm-very-high', '#ff8a65')
  }

  // results
  let pct = { vlow:0, low:0, targ:0, high:0, vhigh:0 }
  let present = 0, expected = 0

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

<div class="tirbar" bind:this={host}>
  <div class="bar">
    <div class="seg vlow"  style="width:{pct.vlow}%"  title="Very low"></div>
    <div class="seg low"   style="width:{pct.low}%"   title="Low"></div>
    <div class="seg targ"  style="width:{pct.targ}%"  title="Target"></div>
    <div class="seg high"  style="width:{pct.high}%"  title="High"></div>
    <div class="seg vhigh" style="width:{pct.vhigh}%" title="Very high"></div>
  </div>
  <div class="legend">
    <div class="left"><span class="strong">{pct.targ.toFixed(1)}%</span> in range</div>
    <div class="right">
      {#if preset==='tight'}Tight{:else if preset==='pregnancy'}Pregnancy{:else}General{/if}
      {#if isMmol()} {TH().low.toFixed(1)}–{TH().high.toFixed(1)} mmol/L{:else} {Math.round(TH().low)}–{Math.round(TH().high)} mg/dL{/if}
    </div>
  </div>
</div>

<style>
  .tirbar { border:1px solid var(--cgm-border, #eee); padding:10px; border-radius:8px; background: var(--cgm-bg, #fff); max-width:600px; }
  .bar { display:flex; height:16px; border-radius:8px; overflow:hidden; border:1px solid #ddd; }
  .seg { height:100%; }
  .seg.vlow  { background: var(--cgm-very-low, #e57373); }
  .seg.low   { background: var(--cgm-low, #ff9e80); }
  .seg.targ  { background: var(--cgm-in-range, #86c89d); }
  .seg.high  { background: var(--cgm-high, #ffcc80); }
  .seg.vhigh { background: var(--cgm-very-high, #ff8a65); }
  .legend { margin-top:8px; display:flex; align-items:baseline; justify-content:space-between; }
  .legend .left { font-size:12px; }
  .legend .right { font-size:12px; color: var(--cgm-muted, #777); margin-left:auto; text-align:right; }
  .strong { font-weight:700; }
  .muted { color: var(--cgm-muted, #777); font-size:12px; }
</style>
