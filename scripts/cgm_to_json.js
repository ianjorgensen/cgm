#!/usr/bin/env node
// Convert ES module-like cgm_data.js (export const ...) into JSON next to it
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const inputPath = resolve(__dirname, '..', 'cgm-data', 'cgm_data.js')
const outputPath = resolve(__dirname, '..', 'cgm-data', 'cgm_data.json')

const src = readFileSync(inputPath, 'utf8')

function pick(re, name){
  const m = src.match(re)
  if (!m) throw new Error(`Could not parse ${name}`)
  return m[m.length - 1]
}

const units = pick(/export const units\s*=\s*(["'])(.*?)\1/, 'units')
const t0 = pick(/export const t0\s*=\s*(["'])(.*?)\1/, 't0')
const stepMsStr = pick(/export const stepMs\s*=\s*(\d+)/, 'stepMs')
const stepMs = Number(stepMsStr)

const gBlock = src.match(/export const glucose\s*=\s*\[([\s\S]*?)\]\s*;/)
if (!gBlock) throw new Error('Could not find glucose array')
const gText = '[' + gBlock[1].trim() + ']'
// Ensure valid JSON numbers (strip trailing commas and spaces)
const glucose = JSON.parse(gText)

const out = { units, t0, stepMs, glucose }
writeFileSync(outputPath, JSON.stringify(out))
console.log('Wrote', outputPath)
