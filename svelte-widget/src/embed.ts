import CgmCalendar from './lib/CgmCalendar.svelte'
import CgmCalendarLine from './lib/CgmCalendarLine.svelte'
import CgmSummary from './lib/CgmSummary.svelte'
import CgmTir from './lib/CgmTir.svelte'
import CgmAgp from './lib/CgmAgp.svelte'
import CgmStrips from './lib/CgmStrips.svelte'
import CgmTirDetailed from './lib/CgmTirDetailed.svelte'

type Data = { units: string; t0: string; stepMs: number; glucose: number[] }
type PresetKey = 'N'|'T'|'P'|'general'|'tight'|'pregnancy'
const normPreset = (p?: PresetKey): 'N'|'T'|'P' => {
  if (!p) return 'N'
  if (p === 'general' || p === 'N') return 'N'
  if (p === 'tight'   || p === 'T') return 'T'
  if (p === 'pregnancy' || p === 'P') return 'P'
  return 'N'
}
type Options = { initialRange?: { start:number; end:number }, preset?: PresetKey, monthLabels?: boolean, dataVisible?: boolean, canvasVisible?: boolean, selectionFill?: string, selectionStroke?: string }

export function createTirCalendar(targetId: string, data: Data, opts: Options = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  const asKey = (p?: PresetKey): 'general'|'tight'|'pregnancy' => {
    if (!p) return 'general'
    const s = String(p).toLowerCase()
    if (s === 'tight' || s === 't') return 'tight'
    if (s === 'pregnancy' || s === 'p') return 'pregnancy'
    return 'general'
  }
  const comp = new CgmCalendar({ target, props: { data, initialRange: opts.initialRange ?? null, externalRange: null, preset: asKey(opts.preset), showMonthLabels: opts.monthLabels ?? true, showData: opts.dataVisible ?? true, showCanvas: opts.canvasVisible ?? true, selectionFill: opts.selectionFill ?? 'transparent', selectionStroke: opts.selectionStroke ?? '#111' } })
  const listeners = new Map<string, Function[]>()
  let currentRange: { start:number; end:number } | null = opts.initialRange ?? null
  function on(name: 'rangechange'|'ready', fn: (detail:any)=>void){ const arr=listeners.get(name) || []; arr.push(fn); listeners.set(name, arr) }
  comp.$on('rangechange', (e)=>{ const d=(e as CustomEvent).detail; currentRange = { start:d.start, end:d.end }; listeners.get('rangechange')?.forEach(fn=>fn(d)) })
  comp.$on('ready', (e)=>{ const d=(e as CustomEvent).detail; currentRange = { start:d.start, end:d.end }; listeners.get('ready')?.forEach(fn=>fn(d)) })
  function setRange(a:any, b?:number){
    if (typeof a === 'number' && typeof b === 'number') comp.$set({ externalRange: { start:a, end:b } })
    else if (a && typeof a.start === 'number' && typeof a.end === 'number') comp.$set({ externalRange: { start:a.start, end:a.end } })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function getRange(){ return currentRange }
  function setPreset(p: PresetKey){ comp.$set({ preset: asKey(p) }) }
  function setDataVisible(v:boolean){ comp.$set({ showData: !!v }) }
  function setMonthLabels(v:boolean){ comp.$set({ showMonthLabels: !!v }) }
  function setCanvasVisible(v:boolean){ comp.$set({ showCanvas: !!v }) }
  return { on, setRange, getRange, setPreset, setDataVisible, setMonthLabels, setCanvasVisible, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined'){
  ;(window as any).createTirCalendar = createTirCalendar
  ;(window as any).createCgmTir = createTirCalendar // back-compat alias
}

export function createTirCalendarLine(targetId: string, data: Data, opts: Options = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  const asKey2 = (p?: PresetKey): 'general'|'tight'|'pregnancy' => {
    if (!p) return 'general'
    const s = String(p).toLowerCase()
    if (s === 'tight' || s === 't') return 'tight'
    if (s === 'pregnancy' || s === 'p') return 'pregnancy'
    return 'general'
  }
  const comp = new CgmCalendarLine({ target, props: { data, initialRange: opts.initialRange ?? null, externalRange: null, preset: asKey2(opts.preset), showMonthLabels: opts.monthLabels ?? true, showData: opts.dataVisible ?? true, showCanvas: opts.canvasVisible ?? true, selectionFill: opts.selectionFill ?? 'transparent', selectionStroke: opts.selectionStroke ?? '#111' } })
  const listeners = new Map<string, Function[]>()
  let currentRange: { start:number; end:number } | null = opts.initialRange ?? null
  function on(name: 'rangechange'|'ready', fn: (detail:any)=>void){ const arr=listeners.get(name) || []; arr.push(fn); listeners.set(name, arr) }
  comp.$on('rangechange', (e)=>{ const d=(e as CustomEvent).detail; currentRange = { start:d.start, end:d.end }; listeners.get('rangechange')?.forEach(fn=>fn(d)) })
  comp.$on('ready', (e)=>{ const d=(e as CustomEvent).detail; currentRange = { start:d.start, end:d.end }; listeners.get('ready')?.forEach(fn=>fn(d)) })
  function setRange(a:any, b?:number){
    if (typeof a === 'number' && typeof b === 'number') comp.$set({ externalRange: { start:a, end:b } })
    else if (a && typeof a.start === 'number' && typeof a.end === 'number') comp.$set({ externalRange: { start:a.start, end:a.end } })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function getRange(){ return currentRange }
  function setPreset(p: PresetKey){ comp.$set({ preset: asKey2(p) }) }
  function setDataVisible(v:boolean){ comp.$set({ showData: !!v }) }
  function setMonthLabels(v:boolean){ comp.$set({ showMonthLabels: !!v }) }
  function setCanvasVisible(v:boolean){ comp.$set({ showCanvas: !!v }) }
  return { on, setRange, getRange, setPreset, setDataVisible, setMonthLabels, setCanvasVisible, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined'){
  ;(window as any).createTirCalendarLine = createTirCalendarLine
}

type SummaryOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: PresetKey, onPresetChange?: (p:PresetKey)=>void }
export function createCgmSummary(targetId: string, data: Data, opts: SummaryOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const asKey = (p?: PresetKey): 'general'|'tight'|'pregnancy' => {
    if (!p) return 'general'
    const s = String(p).toLowerCase()
    if (s === 'tight' || s === 't') return 'tight'
    if (s === 'pregnancy' || s === 'p') return 'pregnancy'
    return 'general'
  }
  const comp = new CgmSummary({ target, props: { data, range, preset: asKey(opts.preset) } })
  const listeners = new Map<string, Function[]>()
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  function on(name: 'presetchange', fn: (detail:{preset: PresetKey})=>void){ const arr=listeners.get(name)||[]; arr.push(fn); listeners.set(name, arr) }
  comp.$on('presetchange', (e)=>{ const d=(e as CustomEvent).detail as { preset: PresetKey }; if (opts.onPresetChange) try{ opts.onPresetChange(d.preset) }catch{}; listeners.get('presetchange')?.forEach(fn=>fn(d)) })
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p: PresetKey){ comp.$set({ preset: asKey(p) }) }
  return { on, setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined'){
  ;(window as any).createCgmSummary = createCgmSummary
}

type TirOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: PresetKey }
export function createCgmTir(targetId: string, data: Data, opts: TirOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const asKey = (p?: PresetKey): 'general'|'tight'|'pregnancy' => {
    if (!p) return 'general'
    const s = String(p).toLowerCase()
    if (s === 'tight' || s === 't') return 'tight'
    if (s === 'pregnancy' || s === 'p') return 'pregnancy'
    return 'general'
  }
  const comp = new CgmTir({ target, props: { data, range, preset: asKey(opts.preset) } })
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
  function setPreset(p: PresetKey){ comp.$set({ preset: asKey(p) }) }
  function getStats(){ return lastStats }
  return { on, setRange, setData, setPreset, getStats, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined'){
  ;(window as any).createCgmTir = createCgmTir
}

type AgpOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: PresetKey }
export function createCgmAgp(targetId: string, data: Data, opts: AgpOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const asKey = (p?: PresetKey): 'general'|'tight'|'pregnancy' => {
    if (!p) return 'general'
    const s = String(p).toLowerCase()
    if (s === 'tight' || s === 't') return 'tight'
    if (s === 'pregnancy' || s === 'p') return 'pregnancy'
    return 'general'
  }
  const comp = new CgmAgp({ target, props: { data, range, preset: asKey(opts.preset) } })
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
  function setPreset(p: PresetKey){ comp.$set({ preset: asKey(p) }) }
  return { setRange, setData, setPreset, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined'){
  ;(window as any).createCgmAgp = createCgmAgp
}

type StripsOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: PresetKey }
export function createCgmStrips(targetId: string, data: Data, opts: StripsOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const asKey = (p?: PresetKey): 'general'|'tight'|'pregnancy' => {
    if (!p) return 'general'
    const s = String(p).toLowerCase()
    if (s === 'tight' || s === 't') return 'tight'
    if (s === 'pregnancy' || s === 'p') return 'pregnancy'
    return 'general'
  }
  const comp = new CgmStrips({ target, props: { data, range, preset: asKey(opts.preset) } })
  function setRange(rOrStart:any, end?:number){
    if (typeof rOrStart === 'number' && typeof end === 'number') comp.$set({ range: { start:rOrStart, end } })
    else if (rOrStart && typeof rOrStart.start === 'number' && typeof rOrStart.end === 'number') comp.$set({ range: rOrStart })
    else throw new Error('setRange expects (start:number, end:number) or {start,end}')
  }
  function setData(newData: Data){ comp.$set({ data: newData }) }
  function setPreset(p: PresetKey){ comp.$set({ preset: asKey(p) }) }
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

if (typeof window !== 'undefined'){
  ;(window as any).createCgmStrips = createCgmStrips
}

type TirDetailedOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: PresetKey }
export function createCgmTirDetailed(targetId: string, data: Data, opts: TirDetailedOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const asKey = (p?: PresetKey): 'general'|'tight'|'pregnancy' => {
    if (!p) return 'general'
    const s = String(p).toLowerCase()
    if (s === 'tight' || s === 't') return 'tight'
    if (s === 'pregnancy' || s === 'p') return 'pregnancy'
    return 'general'
  }
  const comp = new CgmTirDetailed({ target, props: { data, range, preset: asKey(opts.preset), showTime: false } })
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
  function setShowTime(v:boolean){ comp.$set({ showTime: !!v }) }
  if (opts.source && typeof (opts.source as any).on === 'function'){
    ;(opts.source as any).on('rangechange', ({ start, end }: any)=> setRange({ start, end }))
    ;(opts.source as any).on('ready', ({ start, end }: any)=> setRange({ start, end }))
    if (typeof (opts.source as any).getRange === 'function'){
      const r = (opts.source as any).getRange()
      if (r && typeof r.start === 'number' && typeof r.end === 'number') setRange(r)
    }
  }
  function setPreset(p: PresetKey){ comp.$set({ preset: asKey(p) }) }
  function getStats(){ return lastStats }
  return { on, setRange, setData, setPreset, setShowTime, getStats, destroy: ()=> comp.$destroy() }
}

if (typeof window !== 'undefined'){
  ;(window as any).createCgmTirDetailed = createCgmTirDetailed
}
