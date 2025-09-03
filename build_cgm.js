#!/usr/bin/env node
/*
  Build cgm_data.js from any CGM-like files in the current folder.
  - Interval: 5 minutes (300_000 ms)
  - Units: mmol/L; converts mg/dL -> mmol/L by /18 when values look like mg/dL
  - Missing slots: -1
  - Deduplicates by 5‑minute bin (keeps the last value seen per bin)
*/

const fs = require('fs');
const path = require('path');

const STEP_MS = 5 * 60 * 1000;

function isProbablyMgdl(v){
  return v >= 30; // mmol rarely >= 30, mg/dL typically 40..400
}

function parseMaybeDate(x){
  if (x == null) return NaN;
  if (typeof x === 'number') return x > 1e11 ? x : x*1000; // seconds or ms
  let s = String(x);
  // Normalize common Health export format: "YYYY-MM-DD HH:MM:SS +0000"
  s = s.replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})\s([+-]\d{2})(\d{2})$/, '$1T$2$3:$4');
  // Also accept "YYYY-MM-DD HH:MM:SS" (assume local, let Date parse)
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? NaN : d.getTime();
}

function extractFromObject(o){
  if (o == null || typeof o !== 'object') return null;
  const tKeys = ['ts','timestamp','time','date','datetime','systemTime','startTime','start','startDate','creationDate'];
  const vKeys = ['sgv','glucose','value','mmol','mgdl','mg/dl','reading','glucoseValue','Blood Glucose','blood_glucose'];
  let t;
  for (const k of tKeys){ if (k in o){ t = parseMaybeDate(o[k]); if (!Number.isNaN(t)) break; } }
  if (Number.isNaN(t)) return null;
  let v;
  for (const k of vKeys){ if (k in o){
      const raw = o[k];
      if (typeof raw === 'string'){
        const num = parseFloat(raw.replace(/,/g,'.'));
        if (Number.isFinite(num)) { v = num; break; }
      } else {
        const num = Number(raw);
        if (Number.isFinite(num)) { v = num; break; }
      }
    } }
  if (!Number.isFinite(v)) return null;
  // normalize mmol
  let mmol = v;
  const unit = (String(o.unit||'').toLowerCase());
  if (unit.includes('mg/d') || unit.includes('mgdl') || isProbablyMgdl(v)) mmol = v/18;
  return { t, v: mmol };
}

function extractFromCSV(text){
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  function parseCSVLine(line){
    const out = [];
    let cur = '';
    let q = false;
    for (let i=0;i<line.length;i++){
      const ch = line[i];
      if (ch === '"') { q = !q; continue; }
      if (!q && ch === ','){ out.push(cur); cur=''; continue; }
      cur += ch;
    }
    out.push(cur);
    return out.map(s=>s.trim());
  }
  const header = parseCSVLine(lines[0]).map(s=>s.trim().toLowerCase());
  const cols = { time: -1, value: -1 };
  const timeCandidates = ['time','timestamp','date','datetime','systemtime','starttime','start date','start'];
  const valueCandidates = ['sgv','glucose','value','mmol','mgdl','mg/dl','reading','glucosevalue','blood glucose','blood_glucose'];
  let unitCol = -1;
  for (let i=0;i<header.length;i++){
    const h = header[i];
    if (cols.time === -1 && timeCandidates.includes(h)) cols.time = i;
    if (cols.value === -1 && valueCandidates.includes(h)) cols.value = i;
    if (unitCol === -1 && (h === 'unit' || h === 'units')) unitCol = i;
  }
  // Heuristic: if not found, try first date-like column and first numeric column
  if (cols.time === -1 || cols.value === -1){
    // scan first 10 data lines
    const sampleLines = lines.slice(1, Math.min(lines.length, 20));
    const dateScore = new Array(header.length).fill(0);
    const numScore = new Array(header.length).fill(0);
    for (const L of sampleLines){
      const parts = parseCSVLine(L);
      for (let i=0;i<parts.length;i++){
        const t = parseMaybeDate(parts[i]);
        if (!Number.isNaN(t)) dateScore[i]++;
        const n = Number(parts[i].replace?.(',', '.') ?? parts[i]);
        if (Number.isFinite(n)) numScore[i]++;
      }
    }
    if (cols.time === -1) cols.time = dateScore.indexOf(Math.max(...dateScore));
    if (cols.value === -1) cols.value = numScore.indexOf(Math.max(...numScore));
  }
  if (cols.time === -1 || cols.value === -1) return [];
  const out = [];
  for (let i=1;i<lines.length;i++){
    const parts = parseCSVLine(lines[i]);
    if (parts.length <= Math.max(cols.time, cols.value)) continue;
    const t = parseMaybeDate(parts[cols.time]);
    let raw = parts[cols.value];
    let val = Number(raw.replace?.(',', '.') ?? raw);
    if (!Number.isNaN(t) && Number.isFinite(val)){
      let mmol = val;
      const unit = unitCol >=0 && unitCol < parts.length ? String(parts[unitCol]).toLowerCase() : '';
      if (unit.includes('mg/d') || unit.includes('mgdl') || isProbablyMgdl(val)) mmol = val/18;
      out.push({ t, v: mmol });
    }
  }
  return out;
}

function extractFromText(text){
  // Try NDJSON (one JSON object per line)
  const lines = text.split(/\r?\n/).filter(Boolean);
  let got = [];
  for (const line of lines){
    try {
      const o = JSON.parse(line); const r = extractFromObject(o); if (r) got.push(r);
    } catch{}
  }
  if (got.length) return got;
  // Try CSV
  return extractFromCSV(text);
}

function extractFromJSON(text){
  try {
    const root = JSON.parse(text);
    const out = [];
    const stack = [root];
    function isGlucoseType(o){
      const s = JSON.stringify(Object.keys(o||{})).toLowerCase();
      return s.includes('glucose');
    }
    while (stack.length){
      const cur = stack.pop();
      if (Array.isArray(cur)){
        for (const it of cur) stack.push(it);
      } else if (cur && typeof cur === 'object'){
        // Direct record?
        if ((cur.value!=null || cur.glucose!=null || cur.sgv!=null || cur['Blood Glucose']!=null) && (isGlucoseType(cur) || ('unit' in cur))){
          const rec = extractFromObject(cur); if (rec) out.push(rec);
        }
        // Health Auto Export groups: { data: { 'HKQuantityTypeIdentifierBloodGlucose': [ ... ] } }
        for (const k of Object.keys(cur)){
          const v = cur[k];
          if (Array.isArray(v) || (v && typeof v === 'object')) stack.push(v);
        }
      }
    }
    return out;
  } catch { return []; }
}

// Fallback for Health Auto Export JSON that may not parse into simple arrays
// Scans text and groups nearby fields around glucose records.
function extractFromHealthAutoExportText(text){
  const lines = text.split(/\r?\n/);
  const out = [];
  let inGlucoseBlock = false;
  let cur = { t: undefined, v: undefined, unit: undefined };
  const flush = () => {
    if (Number.isFinite(cur.v) && Number.isFinite(cur.t)){
      const mmol = (cur.unit && cur.unit.toLowerCase().includes('mg')) || isProbablyMgdl(cur.v)
        ? cur.v/18 : cur.v;
      out.push({ t: cur.t, v: mmol });
    }
    cur = { t: undefined, v: undefined, unit: undefined };
  };
  for (let i=0;i<lines.length;i++){
    const L = lines[i];
    if (/HKQuantityTypeIdentifierBloodGlucose|Blood\s*Glucose/i.test(L)) inGlucoseBlock = true;
    if (inGlucoseBlock){
      const mDate = L.match(/\"(startDate|creationDate|date|datetime|time|start)\"\s*:\s*\"([^\"]+)\"/i);
      if (mDate){ const t = parseMaybeDate(mDate[2]); if (!Number.isNaN(t)) cur.t = t; }
      const mUnit = L.match(/\"unit\"\s*:\s*\"([^\"]+)\"/i);
      if (mUnit) cur.unit = mUnit[1];
      const mValStr = L.match(/\"(value|glucose|sgv|Blood\s*Glucose)\"\s*:\s*\"?([0-9]+(?:[\.,][0-9]+)?)\"?/i);
      if (mValStr){ const n = parseFloat(mValStr[2].replace(',','.')); if (Number.isFinite(n)) cur.v = n; }
      if (/\}/.test(L)) { // end of object
        flush(); inGlucoseBlock = false;
      }
    }
  }
  return out;
}

function gatherReadingsFromFile(filePath){
  const ext = path.extname(filePath).toLowerCase();
  const txt = fs.readFileSync(filePath,'utf8');
  if (ext === '.json'){
    let arr = extractFromJSON(txt);
    if (!arr.length) arr = extractFromHealthAutoExportText(txt);
    return arr;
  }
  // HealthAutoExport sometimes writes .jsonl or .ndjson or text with JSON lines
  if (ext === '.jsonl' || ext === '.ndjson') return extractFromText(txt);
  // Fallback to text heuristic
  return extractFromText(txt);
}

function listFilesRecursive(root){
  const out = [];
  function walk(dir){
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries){
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(p);
    }
  }
  walk(root);
  return out;
}

function main(){
  const DEFAULT_IMPORT_DIR = "/Users/ian/Library/Mobile Documents/iCloud~com~ifunography~HealthExport/Documents/New Automation";
  const DEFAULT_FILE = path.join(DEFAULT_IMPORT_DIR, 'HealthAutoExport-2025-09-02.json');
  const argPath = process.argv[2];
  let importRoot = argPath || (fs.existsSync(DEFAULT_FILE) ? DEFAULT_FILE : (fs.existsSync(DEFAULT_IMPORT_DIR) ? DEFAULT_IMPORT_DIR : process.cwd()));
  const skipExt = new Set(['.html','.js','.md','.png','.jpg','.jpeg','.gif','.svg','.map']);

  let files = [];
  try {
    const st = fs.statSync(importRoot);
    if (st.isFile()) files = [importRoot];
    else files = listFilesRecursive(importRoot);
  } catch { files = []; }
  files = files
    .filter(f=>!['cgm_data.js','build_cgm.js','package.json'].includes(path.basename(f)))
    .filter(f=>{ try { return fs.statSync(f).isFile(); } catch { return false; } });

  let readings = [];
  for (const f of files){
    const ext = path.extname(f).toLowerCase();
    if (skipExt.has(ext)) continue;
    try {
      const arr = gatherReadingsFromFile(f);
      if (arr.length) {
        readings.push(...arr);
        console.log(`+ ${arr.length.toString().padStart(4,' ')} readings from ${f}`);
      }
    } catch (e){
      // ignore unreadable files
    }
  }
  const debug = process.argv.includes('--debug');
  if (!readings.length){
    console.error('No readings found. Place JSON/CSV with timestamp + glucose value.');
    try {
      const raw = fs.readFileSync(importRoot,'utf8');
      const j = extractFromJSON(raw); const h = extractFromHealthAutoExportText(raw);
      console.error('JSON walker sample:', JSON.stringify(j.slice(0,3)));
      console.error('Text scanner sample:', JSON.stringify(h.slice(0,3)));
    } catch {}
    process.exit(1);
  }
  // sort by time and normalize
  readings.sort((a,b)=>a.t-b.t);
  const tMin = readings[0].t;
  const tMax = readings[readings.length-1].t;
  const t0 = Math.floor(tMin / STEP_MS) * STEP_MS;
  const t1 = Math.ceil(tMax / STEP_MS) * STEP_MS;
  const n = Math.round((t1 - t0) / STEP_MS) + 1;
  const series = new Array(n).fill(-1);
  for (const {t,v} of readings){
    const bin = Math.round((t - t0) / STEP_MS);
    if (bin < 0 || bin >= n) continue;
    // dedupe by bin (keep last value)
    series[bin] = Number.isFinite(v) ? Math.round(v*100)/100 : -1;
  }

  if (debug){
    console.log('First 5 readings:', readings.slice(0,5));
  }
  const out = `// Auto-generated CGM dataset\nexport const units = 'mmol/L';\nexport const t0 = '${new Date(t0).toISOString()}';\nexport const stepMs = ${STEP_MS};\nexport const glucose = ${JSON.stringify(series)};\n`;
  fs.writeFileSync(path.join(process.cwd(),'cgm_data.js'), out);
  console.log(`Scanned: ${importRoot}`);
  console.log(`Wrote cgm_data.js with ${n} samples from ${new Date(t0).toISOString()} to ${new Date(t1).toISOString()}`);
}

main();
