Svelte CGM TIR Widget
=====================

This is a reusable Svelte widget that renders the yearly Daily Time‑in‑Range visualization (canvas) together with the control bar (period label, quick buttons, step/jump navigation). It’s designed to be embedded into any website and to work with the JSON format produced at `cgm-data/cgm_data.json`.

Two ways to embed

1) As a custom element (web component)
   - Build the custom element bundle and include it directly on any page.
   - Usage:
     <cgm-tir data="{...json...}" on:rangechange="..."></cgm-tir>

2) As a small helper function
   - Load the UMD bundle and call a global initializer `createCgmTir(targetId, data, opts)`.

Props and events

- Props
  - `data`: required. `{ units, t0, stepMs, glucose }`
  - `initialRange?`: `{ start: number, end: number }` (ms since epoch). Defaults to full dataset.

- Events
  - `rangechange`: fires whenever the selected range changes. `detail = { start, end, days }`.
  - `ready`: fires once after first render. `detail = { start, end }`.

Build (local)

1. cd svelte-widget
2. npm install
3. Build the library and the custom element:
   - npm run build:lib   → dist/lib (ESM + UMD; exposes `createCgmTir`)
   - npm run build:ce    → dist/ce  (custom element; registers `<cgm-tir>`)

Quick embed examples

Custom element (no framework):

<script src="./dist/ce/cgm-tir.ce.js"></script>
<cgm-tir id="viz" style="display:block;width:100%;"></cgm-tir>
<script>
  fetch('./cgm-data/cgm_data.json').then(r=>r.json()).then(data=>{
    const el = document.getElementById('viz')
    el.data = data
    el.addEventListener('rangechange', (e)=>{
      console.log('range', e.detail)
    })
  })
</script>

Initializer function (UMD):

<script src="./dist/lib/cgm-tir.umd.js"></script>
<div id="viz"></div>
<script>
  fetch('./cgm-data/cgm_data.json').then(r=>r.json()).then(data=>{
    const api = window.createCgmTir('viz', data, { span: '90d' })
    api.on('rangechange', ({start,end,days})=> console.log(start,end,days))
  })
</script>

Summary widget (keeps in sync with CGM TIR)

<script src="./dist/lib/cgm-tir.umd.js"></script>
<div id="viz"></div>
<div id="summary" style="max-width:1100px; margin-top:10px;"></div>
<script>
  Promise.all([
    fetch('./cgm-data/cgm_data.json').then(r=>r.json())
  ]).then(([data])=>{
    const tir = window.createCgmTir('viz', data)
    window.createCgmSummary('summary', data, { source: tir })
  })
</script>
