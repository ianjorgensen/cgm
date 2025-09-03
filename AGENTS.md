# Repository Guidelines

This repository is a static, client‑side CGM data viewer built with HTML, vanilla JavaScript, and D3. It renders an interactive canvas chart, a mini time‑picker (brush), TIR bar, summary metrics, and an optional AGP view.

## Project Structure & Module Organization
- `/index.html` — main single‑page app (UI, keyboard shortcuts, URL hash state).
- `/cgm_data.js` — data source: `units`, `t0`, `stepMs`, `glucose[]`.
- Other demos: `/view.html`, `/view2.html`, `/3d.html`, `/agp.html` (not required for the main app).
- No build step; assets are loaded directly (D3 via CDN).

## Build, Test, and Development Commands
- Local server (choose one):
  - `python3 -m http.server 8080` → open `http://localhost:8080/index.html`
  - `npx http-server -p 8080`
- Deploy to GitHub Pages: push to `main`, then Settings → Pages → Deploy from branch (main, root). Site: `https://<user>.github.io/<repo>/`.

## Coding Style & Naming Conventions
- JavaScript: ES modules, 2‑space indent, single quotes, no semicolon churn.
- Keep state updates centralized (domain, brush, hash). Prefer small pure helpers.
- Filenames: kebab‑case for new assets; keep HTML/JS at repo root.

## Testing Guidelines
- No formal test suite. Manually verify after changes:
  - Keyboard shortcuts: arrows, `W`/`S`, `Shift`+arrows, `1–6`, `H` (set hash).
  - URL behavior: default to last 14 days; `#t=startMs,endMs` restores selection.
  - Mini brush sync with chart (drag, wheel, zoom) and AGP visibility (≥7 days).

## Commit & Pull Request Guidelines
- Commits: imperative subject (≤72 chars) + brief body when behavior/UI changes.
- PRs: include rationale, screenshots/GIFs for UI, and note any data/compat concerns.
- Preserve keyboard ergonomics and URLs; do not regress GitHub Pages compatibility.

## Security & Configuration Tips
- No secrets—client‑only app. Do not add credentials or tokens.
- Use pinned CDNs (D3@7). Avoid introducing `eval`/unsafe HTML.
