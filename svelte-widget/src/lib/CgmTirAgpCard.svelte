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

  const COLORS = { vlow:'#8a2f2f', low:'#d65b5b', targ:'#169b58', high:'#f1aa3b', vhigh:'#e47c2f' }

  // results
  let pct = { vlow:0, low:0, targ:0, high:0, vhigh:0 }
  let present = 0

  function initSeries(){
    if (!data) return
    const t0 = new Date(data.t0).getTime()
    time = Float64Array.from({length: data.glucose.length}, (_,i)=> t0 + i*data.stepMs)
    values = Float64Array.from(data.glucose)
  }

  $: if (data) initSeries()

  function emit(){
    try { dispatch('stats', { pct, present, preset, units: data?.units || 'mmol/L' }) } catch {}
  }

  $: if (data && range && time && values && preset){
    const { start, end } = range
    const i0 = Math.max(0, Math.ceil((start - time[0]) / data.stepMs))
    const i1 = Math.min(values.length-1, Math.floor((end - time[0]) / data.stepMs))
    if (i1 < i0){ pct={vlow:0,low:0,targ:0,high:0,vhigh:0}; present=0 }
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

  const fmtPct = (p)=> `${Math.round(p)}%`
  const fmtGoal = (txt)=> txt
  const combineTop = ()=> Math.round(pct.high + pct.vhigh)
  const combineLow = ()=> Math.round(pct.low + pct.vlow)
  const unitValue = (v)=> isMmol() ? (Math.round(v*10)/10).toString() : Math.round(v).toString()
</script>

<div class="agp-card">
  <!-- Left stacked bar with threshold markers -->
  <div class="barcol">
    <div class="stack">
      <div class="seg vhigh" style="flex-basis:{pct.vhigh}%"></div>
      <div class="seg high"  style="flex-basis:{pct.high}%"></div>
      <div class="seg targ"  style="flex-basis:{pct.targ}%"></div>
      <div class="seg low"   style="flex-basis:{pct.low}%"></div>
      <div class="seg vlow"  style="flex-basis:{pct.vlow}%"></div>
    </div>
    <div class="ticks">
      <div class="tick" style="top:18%"><span>{unitValue(TH().high)}</span></div>
      <div class="tick" style="top:6%"><span>{unitValue(TH().vhigh)}</span></div>
    </div>
  </div>

  <!-- Right details -->
  <div class="rightcol">
    <div class="group top">
      <div class="goal">Goal: &lt;5%</div>
      <div class="row"><div class="label">Very High</div><div class="val">{fmtPct(pct.vhigh)}</div></div>
      <div class="row"><div class="label">High</div><div class="val">{fmtPct(pct.high)}</div></div>
      <div class="bracket">
        <div class="brace"></div>
        <div class="sum">{combineTop()}% <span class="goaltext">Goal: &lt;25%</span></div>
      </div>
    </div>

    <div class="group mid">
      <div class="row emph"><div class="label">Target</div><div class="val">{fmtPct(pct.targ)}</div></div>
      <div class="goal inline">Goal: ≥70%</div>
      <div class="note">Each 5% increase is clinically beneficial</div>
    </div>

    <div class="group low">
      <div class="row"><div class="label">Low</div><div class="val">{fmtPct(pct.low)}</div></div>
      <div class="row"><div class="label">Very Low</div><div class="val">{fmtPct(pct.vlow)}</div></div>
      <div class="bracket small">
        <div class="brace"></div>
        <div class="sum">{combineLow()}% <span class="goaltext">Goal: &lt;4%</span></div>
      </div>
    </div>
    <div class="foot">Each 1% time in range = about 15 minutes</div>
  </div>
</div>

<style>
  .agp-card { display:flex; gap:18px; align-items:flex-start; border-radius:10px; }
  .barcol { position:relative; width:90px; }
  .stack { width:70px; height:260px; border-radius:4px; overflow:hidden; border:1px solid #ddd; margin-left:10px; }
  .seg { width:100%; }
  .seg.vhigh{ background: var(--vh, #e47c2f); }
  .seg.high { background: var(--h,  #f1aa3b); }
  .seg.targ { background: var(--t,  #169b58); }
  .seg.low  { background: var(--l,  #d65b5b); }
  .seg.vlow { background: var(--vl, #8a2f2f); }
  .ticks { position:absolute; left:0; top:0; bottom:0; width: 90px; }
  .tick { position:absolute; left:0; right:0; height:1px; border-top: 2px solid #b9bfc7; }
  .tick span { position:absolute; left:0; transform:translateX(-2px); top:-8px; font-weight:700; color:#4b515a; font-size:12px; }

  .rightcol { flex:1 1 auto; min-width:260px; position:relative; }
  .group { position:relative; padding:4px 0 10px; }
  .group .row { display:flex; align-items:center; justify-content:space-between; padding:6px 0; }
  .group .row .label { font-weight:700; color:#333; }
  .group .row .val { color:#333; font-weight:700; }
  .group .goal { color:#8c939e; font-size:12px; }
  .group .note { color:#8c939e; font-size:12px; margin-top:4px; }
  .group.mid .row.emph .label { font-weight:800; }
  .group.mid .row.emph .val { font-weight:800; font-size:20px; }
  .group .bracket { position:relative; margin-top:4px; padding-left:110px; }
  .group .bracket .brace { position:absolute; left:80px; top:-26px; bottom:-6px; width:26px; border:2px solid #b9bfc7; border-right:none; border-radius:12px 0 0 12px; }
  .group .bracket.small .brace { top:-22px; bottom:-6px; }
  .group .bracket .sum { font-weight:800; color:#333; font-size:22px; }
  .group .bracket .sum .goaltext { font-weight:600; color:#8c939e; font-size:12px; margin-left:8px; }
  .group.mid { border-top: 2px solid #d9dee5; border-bottom: 2px solid #d9dee5; }
  .group.low { padding-top:10px; }
  .foot { margin-top:6px; color:#8c939e; font-size:12px; text-align:right; }
</style>
