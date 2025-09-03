#!/usr/bin/env node
/*
  Build cgm_data.js from a CSV file (e.g., HealthMetrics-2020-10-19.csv).
  - Use: node build_from_csv.js /path/to/HealthMetrics-2020-10-19.csv [--out cgm_data.js]
  - Produces: ES module with { units, t0, stepMs=300000, glucose[] }
  - 5‑minute bins; missing samples = -1
  - Deduplicates exact duplicates (same timestamp and value)
  - Converts mg/dL → mmol/L automatically (value/18) when necessary
*/

const fs = require('fs');
const path = require('path');

const STEP_MS = 5 * 60 * 1000; // 5 minutes

// --- CSV helpers -----------------------------------------------------------
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

function readCSV(filePath){
  const text = fs.readFileSync(filePath,'utf8');
  const lines = text.split(/\r?\n/);
  // skip BOM/empty
  while (lines.length && !lines[0].trim()) lines.shift();
  if (!lines.length) throw new Error('Empty CSV file');
  const header = parseCSVLine(lines[0]).map(s=>s.trim());
  const rows = lines.slice(1).filter(Boolean).map(parseCSVLine);
  return { header, rows };
}

// --- Parsing helpers -------------------------------------------------------
function parseMaybeDate(x){
  if (x == null) return NaN;
  if (typeof x === 'number') return x > 1e11 ? x : x*1000; // seconds or ms
  let s = String(x).trim();
  // Normalize common formats: "YYYY-MM-DD HH:MM:SS +0000" → ISO
  s = s.replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})\s([+-]\d{2})(\d{2})$/, '$1T$2$3:$4');
  // Also accept "YYYY-MM-DD HH:MM:SS"
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? NaN : d.getTime();
}

function isProbablyMgdl(v){
  // mmol/L rarely >= 30; mg/dL often 40..400
  return v >= 30;
}

// --- Main ------------------------------------------------------------------
function collectCsvFiles(p){
  const files = [];
  function walk(dir){
    const entries = fs.readdirSync(dir, { withFileTypes:true });
    for (const e of entries){
      if (e.name.startsWith('.')) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.csv$/i.test(e.name)) files.push(full);
    }
  }
  const st = fs.statSync(p);
  if (st.isDirectory()) walk(p);
  else files.push(p);
  return files;
}

function parseCsvFile(filePath, dupGlobal){
  const { header, rows } = readCSV(filePath);
  // Find columns heuristically
  const lower = header.map(h=>h.toLowerCase());
  const timeCandidates = ['date','time','timestamp','datetime','start date','start','systemtime','creationdate'];
  let timeIdx = lower.findIndex(h=>timeCandidates.includes(h));
  if (timeIdx === -1){
    timeIdx = lower.findIndex(h=>/\b(date|time)\b/i.test(h));
  }
  // Prefer any header containing "glucose" for value column
  let valueIdx = lower.findIndex(h=>h.includes('glucose'));
  if (valueIdx === -1){
    const valueCandidates = ['glucose','value','blood glucose','blood_glucose','sgv','reading'];
    valueIdx = lower.findIndex(h=>valueCandidates.includes(h));
  }
  const unitIdx = lower.findIndex(h=>h==='unit' || h==='units');
  // fallback: pick the most date-like and most numeric columns from a small sample
  if (timeIdx === -1 || valueIdx === -1){
    const dateScore = new Array(header.length).fill(0);
    const numScore = new Array(header.length).fill(0);
    for (const row of rows.slice(0, Math.min(30, rows.length))){
      for (let i=0;i<row.length;i++){
        const t = parseMaybeDate(row[i]); if (!Number.isNaN(t)) dateScore[i]++;
        const n = Number(String(row[i]).replace(',','.')); if (Number.isFinite(n)) numScore[i]++;
      }
    }
    if (timeIdx === -1) timeIdx = dateScore.indexOf(Math.max(...dateScore));
    if (valueIdx === -1) valueIdx = numScore.indexOf(Math.max(...numScore));
  }
  if (timeIdx === -1 || valueIdx === -1){
    console.error('Skipping (no time/value columns):', path.basename(filePath));
    return [];
  }

  // Extract readings (timestamp ms, mmol/L)
  const dupKey = new Set(); // per-file dedupe by same date+value
  const readings = [];
  for (const row of rows){
    if (row.length <= Math.max(timeIdx, valueIdx)) continue;
    const dateStr = row[timeIdx];
    const t = parseMaybeDate(dateStr);
    let raw = row[valueIdx];
    if (raw == null || raw === '') continue;
    let v = Number(String(raw).replace(',','.'));
    if (Number.isNaN(t) || !Number.isFinite(v)) continue;
    // Detect units from column header or a units column
    let mmol = v;
    const unitFromHeader = header[valueIdx].toLowerCase();
    const unit = (unitIdx >= 0 && unitIdx < row.length) ? String(row[unitIdx]).toLowerCase() : '';
    const isMg = unitFromHeader.includes('mg/d') || unitFromHeader.includes('mgdl') || unit.includes('mg/d') || unit.includes('mgdl') || isProbablyMgdl(v);
    if (isMg) mmol = v / 18;
    // de-duplicate by exact (date, value) pair using the original string date field value
    const dKey = `${dateStr}__${mmol.toFixed(2)}`;
    if (dupKey.has(dKey)) continue;
    dupKey.add(dKey);
    // also dedupe globally across files
    if (dupGlobal){
      if (dupGlobal.has(dKey)) continue;
      dupGlobal.add(dKey);
    }
    readings.push({ t, v: mmol });
  }
  return readings;
}

function main(){
  const argv = process.argv.slice(2);
  if (!argv.length){
    console.error('Usage: node build_from_csv.js <file.csv|folder> [--out cgm_data.js]');
    process.exit(1);
  }
  const outIdx = argv.indexOf('--out');
  const outPath = outIdx >= 0 ? argv[outIdx+1] : 'cgm_data.js';
  const srcArg = argv[0];
  const srcPath = path.resolve(process.cwd(), srcArg);
  if (!fs.existsSync(srcPath)){
    console.error('Path not found:', srcPath);
    process.exit(1);
  }

  const files = collectCsvFiles(srcPath);
  if (!files.length){
    console.error('No CSV files found at:', srcPath);
    process.exit(1);
  }

  const dupGlobal = new Set();
  let readings = [];
  for (const f of files){
    try {
      const arr = parseCsvFile(f, dupGlobal);
      if (arr.length){
        readings.push(...arr);
        console.log(`+ ${arr.length.toString().padStart(4,' ')} from ${path.basename(f)}`);
      }
    } catch (e){
      console.error('Failed to parse', f, e.message);
    }
  }

  if (!readings.length){
    console.error('No readings parsed. Check the header names and file format.');
    process.exit(1);
  }

  // Sort and bin into 5‑minute steps
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
    series[bin] = Math.round(v*100)/100; // keep last in bin
  }

  const moduleText = `// Auto-generated CGM dataset\nexport const units = 'mmol/L';\nexport const t0 = '${new Date(t0).toISOString()}';\nexport const stepMs = ${STEP_MS};\nexport const glucose = ${JSON.stringify(series)};\n`;

  fs.writeFileSync(path.resolve(process.cwd(), outPath), moduleText);
  console.log(`Wrote ${outPath} with ${n} samples from ${new Date(t0).toISOString()} to ${new Date(t1).toISOString()}`);
}

main();
