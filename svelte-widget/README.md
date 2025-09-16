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


Theming Guide
-------------

All widgets support theming via CSS custom properties (variables). Define the variables on any container element that wraps your widgets; the widgets read them from computed styles and apply to SVG and canvas rendering as well as HTML.

- How it works
  - Widgets read CSS variables from their root container (the element you mount into). Canvas drawing uses those values at render time.
  - No global CSS required; scoping variables to a wrapper lets you theme multiple instances differently on the same page.

- Core variables
  - Text/Font/UI: `--cgm-font`, `--cgm-bg`, `--cgm-border`, `--cgm-grid`, `--cgm-text`, `--cgm-muted`
  - Selection: `--cgm-selection-fill`, `--cgm-selection-stroke`
  - Ranges (bands): `--cgm-very-low`, `--cgm-low`, `--cgm-in-range`, `--cgm-high`, `--cgm-very-high`
  - Strong accents (AGP/lines): `--cgm-low-strong`, `--cgm-very-high-strong`, `--cgm-threshold`
  - Context/other: `--cgm-target-band-bg`, `--cgm-context`, `--cgm-arrow`, `--cgm-outside-light`, `--cgm-outside-mid`, `--cgm-outside-dark`

- Minimal example

  <style>
    .cgm-theme {
      --cgm-font: Inter, system-ui, sans-serif;
      --cgm-bg: #fff; --cgm-border: #e5e5e5; --cgm-grid: #eee;
      --cgm-text: #111; --cgm-muted: #666;
      --cgm-selection-fill: rgba(0,0,0,0.10); --cgm-selection-stroke: #111;
      --cgm-very-low: #e57373; --cgm-low: #ff9e80; --cgm-in-range: #86c89d;
      --cgm-high: #ffcc80; --cgm-very-high: #ff8a65;
      --cgm-low-strong: #d73027; --cgm-very-high-strong: #f46d43; --cgm-threshold: #2e7d32;
      --cgm-target-band-bg: #efefef; --cgm-context: #c7c7c7; --cgm-arrow: gray;
      --cgm-outside-light: #ededed; --cgm-outside-mid: #c4c4c4; --cgm-outside-dark: #b5b5b5;
    }
  </style>
  <div class="cgm-theme">
    <div id="viz"></div>
    <div id="summary"></div>
    <div id="agp"></div>
    <div id="strips"></div>
  </div>

- Optional dark palette

  <style>
    .cgm-dark {
      --cgm-bg: #0f1116; --cgm-border: #1f2430; --cgm-grid: #1b202b;
      --cgm-text: #e6e6e6; --cgm-muted: #9aa3b2;
      --cgm-selection-fill: rgba(255,255,255,0.07); --cgm-selection-stroke: #e6e6e6;
      --cgm-very-low: #ff7a7a; --cgm-low: #ffb199; --cgm-in-range: #7fd3a3;
      --cgm-high: #ffd591; --cgm-very-high: #ffa07a;
      --cgm-low-strong: #ff5a4d; --cgm-very-high-strong: #ff7a4d; --cgm-threshold: #79c28a;
      --cgm-target-band-bg: #1a1f2a; --cgm-context: #4a4f5c; --cgm-arrow: #80869a;
      --cgm-outside-light: #2a2f3a; --cgm-outside-mid: #3a3f4a; --cgm-outside-dark: #4a4f5a;
    }
  </style>

Tips
- You can mix and match variables; any not provided fall back to sensible defaults.
- For fonts, set `--cgm-font` on the wrapper; all text (HTML, SVG, canvas labels) uses it.
- Canvas elements re-read variables on window resize; for dynamic theme toggles, dispatch a `resize` event after changing CSS variables if needed.
