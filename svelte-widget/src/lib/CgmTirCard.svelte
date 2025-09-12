<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let data
  export let range = null // { start, end } in ms
  export let preset = 'N'

  // Derived series
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

  const COLORS = { vlow:'#e57373', low:'#ffb46b', targ:'#169b58', high:'#ffb869', vhigh:'#f0715a' }

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

  function emit(){
    try { dispatch('stats', { pct, present, expected, preset, units: data?.units || 'mmol/L' }) } catch {}
  }

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
    emit()
  }

  function fmtPct(p){
    if (!Number.isFinite(p) || p<=0) return '0 %'
    if (p < 1) return '<1 %'
    return `${Math.round(p)} %`
  }
  function presetLabel(){ return preset==='T' ? 'Tight' : (preset==='P' ? 'Pregnancy' : 'General') }
  function rangeText(){
    const th = TH()
    if (isMmol()){
      const fmt=v=>{ const s=(Math.round(v*10)/10).toFixed(1); return s.endsWith('.0')? s.slice(0,-2):s }
      return `${fmt(th.low)}–${fmt(th.high)} mmol/L`
    }
    return `${Math.round(th.low)}–${Math.round(th.high)} mg/dL`
  }
</script>

<div class="tir-card">
  <div class="stack">
    <div class="seg vlow" style="flex-basis:{pct.vlow}%"></div>
    <div class="seg low"  style="flex-basis:{pct.low}%"></div>
    <div class="seg targ" style="flex-basis:{pct.targ}%"></div>
    <div class="seg high" style="flex-basis:{pct.high}%"></div>
    <div class="seg vhigh"style="flex-basis:{pct.vhigh}%"></div>
  </div>
  <div class="labels">
    <div class="row small">{fmtPct(pct.vlow)} Very Low</div>
    <div class="row small">{fmtPct(pct.low)} Low</div>
    <div class="row big"><span class="strong">{fmtPct(pct.targ)}</span> In Range</div>
    <div class="row small">{fmtPct(pct.high)} High</div>
    <div class="row small">{fmtPct(pct.vhigh)} Very High</div>
    <div class="note">{presetLabel()} Range Used: {rangeText()}</div>
  </div>
  
</div>

<style>
  .tir-card { display:flex; gap:18px; align-items:flex-start; }
  .stack { width:124px; height:160px; border:1px solid #e0e0e0; border-radius:2px; display:flex; flex-direction:column; overflow:hidden; }
  .seg { width:100%; }
  .seg.vlow  { background:#f0715a; height:auto; }
  .seg.low   { background:#ffb46b; height:auto; }
  .seg.targ  { background:#169b58; height:auto; }
  .seg.high  { background:#ffcc80; height:auto; }
  .seg.vhigh { background:#f0715a; height:auto; }
  .labels { min-width:220px; }
  .row.small { color:#545b66; font-size:14px; line-height:22px; }
  .row.big { color:#111; font-size:26px; font-weight:700; margin:8px 0 4px; }
  .row.big .strong { font-weight:800; }
  .note { margin-top:10px; color:#6a707a; font-size:14px; font-weight:600; }
</style>
