#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = __dirname
const distDir = path.join(root, '..', 'dist')
const dataSrc = path.join(root, '..', '..', 'cgm-data', 'cgm_data.json')
const dataDst = path.join(distDir, 'cgm_data.json')
const demoHtmlSrc = path.join(root, '..', 'demo', 'demo.html')
const demoHtmlDst = path.join(distDir, 'index.html')
const utilsSrc = path.join(root, '..', 'demo', 'utils')
const utilsDst = path.join(distDir, 'utils')

function ensureDir(p){ if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true }) }
function copyFile(src, dst){ ensureDir(path.dirname(dst)); fs.copyFileSync(src, dst) }
function copyDir(src, dst){
  if (!fs.existsSync(src)) return
  ensureDir(dst)
  for (const ent of fs.readdirSync(src, { withFileTypes: true })){
    const s = path.join(src, ent.name)
    const d = path.join(dst, ent.name)
    if (ent.isDirectory()) copyDir(s, d)
    else copyFile(s, d)
  }
}

ensureDir(distDir)

try { copyFile(dataSrc, dataDst); console.log('Copied data ->', path.relative(process.cwd(), dataDst)) } catch (e){ console.warn('Skip data copy:', e.message) }
try { copyDir(utilsSrc, utilsDst); console.log('Copied utils ->', path.relative(process.cwd(), utilsDst)) } catch (e){ console.warn('Skip utils copy:', e.message) }
try {
  let html = fs.readFileSync(demoHtmlSrc, 'utf8')
  html = html
    .replace('../dist/lib/style.css', 'lib/style.css')
    .replace('../dist/lib/cgm-tir.umd.js', 'lib/cgm-tir.umd.js')
    .replace('../dist/cgm_data.json', 'cgm_data.json')
    .replace('<title>Ripple</title>', '<title>CGM Demo</title>')
  fs.writeFileSync(demoHtmlDst, html)
  console.log('Wrote', path.relative(process.cwd(), demoHtmlDst))
} catch (e){ console.warn('Skip index.html generation:', e.message) }

