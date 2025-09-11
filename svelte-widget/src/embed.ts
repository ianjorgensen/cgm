import CgmTir from './lib/CgmTir.svelte'
import CgmSummary from './lib/CgmSummary.svelte'
import CgmTirBar from './lib/CgmTirBar.svelte'
import CgmAgp from './lib/CgmAgp.svelte'
import CgmStrips from './lib/CgmStrips.svelte'

type Data = { units: string; t0: string; stepMs: number; glucose: number[] }
type Options = { initialRange?: { start:number; end:number }, preset?: 'N'|'T'|'P', monthLabels?: boolean }

export function createTirCalendar(targetId: string, data: Data, opts: Options = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  const comp = new CgmTir({ target, props: { data, initialRange: opts.initialRange ?? null, externalRange: null, preset: opts.preset || 'N', showMonthLabels: opts.monthLabels ?? true } })
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
  return { on, setRange, getRange, setPreset, destroy: ()=> comp.$destroy() }
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

type TirBarOptions = { initialRange?: { start:number; end:number }, source?: { on: Function }, preset?: 'N'|'T'|'P' }
export function createCgmTirBar(targetId: string, data: Data, opts: TirBarOptions = {}){
  const target = document.getElementById(targetId)
  if (!target) throw new Error(`No element with id "${targetId}"`)
  let range = opts.initialRange || null
  const comp = new CgmTirBar({ target, props: { data, range, preset: opts.preset || 'N' } })
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
  (window as any).createCgmTirBar = createCgmTirBar
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
