import CgmCalendar from './lib/CgmCalendar.svelte'
import CgmSummary from './lib/CgmSummary.svelte'
import CgmTir from './lib/CgmTir.svelte'
import CgmAgp from './lib/CgmAgp.svelte'
import CgmTirCard from './lib/CgmTirCard.svelte'
import CgmTirAgpCard from './lib/CgmTirAgpCard.svelte'
import CgmTirAgpCardCanvas from './lib/CgmTirAgpCardCanvas.svelte'
import CgmTirEndsCardCanvas from './lib/CgmTirEndsCardCanvas.svelte'
import CgmStrips from './lib/CgmStrips.svelte'
import CgmTirModern from './lib/CgmTirModern.svelte'
import CgmTirClaude from './lib/CgmTirClaude.svelte'
import CgmTirVertical from './lib/CgmTirVertical.svelte'
import CgmTirDetailed from './lib/CgmTirDetailed.svelte'

type Data = { units: string; t0: string; stepMs: number; glucose: number[] }
type Options = { initialRange?: { start:number; end:number }, preset?: 'N'|'T'|'P', monthLabels?: boolean, dataVisible?: boolean, canvasVisible?: boolean }

export function createTirCalendar(targetId: string, data: Data, opts: Options = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  const comp = new CgmCalendar({ target, props: { data, initialRange: opts.initialRange ?? null, externalRange: null, preset: opts.preset || 'N', showMonthLabels: opts.monthLabels ?? true, showData: opts.dataVisible ?? true, showCanvas: opts.canvasVisible ?? true } })
  const listeners = new Map<string, Function[]>()
  let currentRange: { start:number; end:number } | null = opts.initialRange ?? null
  function on(name: 'rangechange'|'ready', fn: (detail:any)=>void){
    const arr = listeners.get(name) || []
    arr.push(fn); listeners.set(name, arr)
  }
  comp.$on('rangechange', (e)=>{ const d=(e as CustomEvent).detail; currentRange = { start:d.start, end:d.end }; listeners.get('rangechange')?.forEach(fn=>fn(d)) })
  comp.$on('ready', (e)=>{ const d=(e as CustomEvent).detail; currentRange = { start:d.start, end:d.end }; listeners.get('ready')?.forEach(fn=>fn(d)) })
  function setRange(a:any, b?:number){
    if (typeof a === 'number' && typeof b === 'number'){
      comp.$set({ externalRange: { start: a, end: b } })
    } else if (a && typeof a.start === 'number' && typeof a.end === 'number'){
      comp.$set({ externalRange: { start: a.start, end: a.end } })
    } else {
      throw new Error('setRange expects (start:number, end:number) or {start,end}')
    }
  }
  function getRange(){ return currentRange }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  function setDataVisible(v:boolean){ comp.$set({ showData: !!v }) }
  function setMonthLabels(v:boolean){ comp.$set({ showMonthLabels: !!v }) }
  function setCanvasVisible(v:boolean){ comp.$set({ showCanvas: !!v }) }
  return { on, setRange, getRange, setPreset, setDataVisible, setMonthLabels, setCanvasVisible, destroy: ()=> comp.$destroy() }
}

// Also attach to window for UMD consumers
if (typeof window !== 'undefined') {
  // New name
  (window as any).createTirCalendar = createTirCalendar
  // Back-compat alias
  ;(window as any).createCgmTir = createTirCalendar
}

type SummaryOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmSummary(targetId: string, data: Data, opts: SummaryOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  // internal range state, seeded by opts or left null until we hear from source
  let range = opts.initialRange || null
  const comp = new CgmSummary({ target, props: { data, range, preset: opts.preset || 'N' } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number'){
      comp.$set({ range: { start: rOrStart, end } })
    } else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number'){
      comp.$set({ range: rOrStart })
    } else {
      throw new Error('setRange expects (start:number, end:number) or {start,end}')
    }
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmSummary = createCgmSummary
}

type TirOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTir(targetId: string, data: Data, opts: TirOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTir({ target, props: { data, range, preset: opts.preset || 'N' } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTir = createCgmTir
}


type AgpOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmAgp(targetId: string, data: Data, opts: AgpOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmAgp({ target, props: { data, range, preset: opts.preset || 'N' } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmAgp = createCgmAgp
}

// Modern TIR (SVG)
type TirModernOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirModern(targetId: string, data: Data, opts: TirModernOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirModern({ target, props: { data, range, preset: opts.preset || 'N' } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirModern = createCgmTirModern
}

// Claude-style fixed SVG TIR widget
type TirClaudeOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirClaude(targetId: string, data: Data, opts: TirClaudeOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirClaude({ target, props: { data, range, preset: opts.preset || 'N' } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirClaude = createCgmTirClaude
}
// Vertical TIR (copy of index.html TIR)
type TirVerticalOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirVertical(targetId: string, data: Data, opts: TirVerticalOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirVertical({ target, props: { data, range, preset: opts.preset || 'N' } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirVertical = createCgmTirVertical
}


type StripsOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmStrips(targetId: string, data: Data, opts: StripsOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmStrips({ target, props: { data, range, preset: opts.preset || 'N' } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmStrips = createCgmStrips
}
type TirCardOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirCard(targetId: string, data: Data, opts: TirCardOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirCard({ target, props: { data, range, preset: opts.preset || 'N' } })
  const listeners = new Map<string, Function[]>()
  let lastStats: any = null
  function on(name: 'stats', fn: (detail:any)=>void){ const arr=listeners.get(name)||[]; arr.push(fn); listeners.set(name,arr) }
  comp.$on('stats', (e)=>{ const d=(e as CustomEvent).detail; lastStats=d; listeners.get('stats')?.forEach(fn=>fn(d)) })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  function getStats(){ return lastStats }
  return { on, setRange, setData, setPreset, getStats, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirCard = createCgmTirCard
}

type TirAgpCardOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirAgpCard(targetId: string, data: Data, opts: TirAgpCardOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirAgpCard({ target, props: { data, range, preset: opts.preset || 'N' } })
  const listeners = new Map<string, Function[]>()
  let lastStats: any = null
  function on(name: 'stats', fn: (detail:any)=>void){ const arr=listeners.get(name)||[]; arr.push(fn); listeners.set(name,arr) }
  comp.$on('stats', (e)=>{ const d=(e as CustomEvent).detail; lastStats=d; listeners.get('stats')?.forEach(fn=>fn(d)) })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  function getStats(){ return lastStats }
  return { on, setRange, setData, setPreset, getStats, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirAgpCard = createCgmTirAgpCard
}

type TirAgpCardCanvasOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirAgpCardCanvas(targetId: string, data: Data, opts: TirAgpCardCanvasOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirAgpCardCanvas({ target, props: { data, range, preset: opts.preset || 'N' } })
  const listeners = new Map<string, Function[]>()
  let lastStats: any = null
  function on(name: 'stats', fn: (detail:any)=>void){ const arr=listeners.get(name)||[]; arr.push(fn); listeners.set(name,arr) }
  comp.$on('stats', (e)=>{ const d=(e as CustomEvent).detail; lastStats=d; listeners.get('stats')?.forEach(fn=>fn(d)) })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  function getStats(){ return lastStats }
  return { on, setRange, setData, setPreset, getStats, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirAgpCardCanvas = createCgmTirAgpCardCanvas
}

type TirEndsCardCanvasOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirEndsCardCanvas(targetId: string, data: Data, opts: TirEndsCardCanvasOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirEndsCardCanvas({ target, props: { data, range, preset: opts.preset || 'N' } })
  const listeners = new Map<string, Function[]>()
  function on(name: 'stats', fn: (detail:any)=>void){ const arr=listeners.get(name)||[]; arr.push(fn); listeners.set(name,arr) }
  comp.$on('stats', (e)=>{ const d=(e as CustomEvent).detail; listeners.get('stats')?.forEach(fn=>fn(d)) })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  return { on, setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirEndsCardCanvas = createCgmTirEndsCardCanvas
}

// Detailed TIR with SVG visualization
type TirDetailedOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirDetailed(targetId: string, data: Data, opts: TirDetailedOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirDetailed({ target, props: { data, range, preset: opts.preset || 'N' } })
  const listeners = new Map<string, Function[]>()
  let lastStats: any = null
  function on(name: 'stats', fn: (detail:any)=>void){ const arr=listeners.get(name)||[]; arr.push(fn); listeners.set(name,arr) }
  comp.$on('stats', (e)=>{ const d=(e as CustomEvent).detail; lastStats=d; listeners.get('stats')?.forEach(fn=>fn(d)) })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p:'N'|'T'|'P'){ comp.$set({ preset: p }) }
  function getStats(){ return lastStats }
  return { on, setRange, setData, setPreset, getStats, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined') {
  (window as any).createCgmTirDetailed = createCgmTirDetailed
}
