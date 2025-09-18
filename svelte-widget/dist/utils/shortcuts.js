// Lightweight keyboard shortcuts helper for demos
// Usage:
//   const kb = initShortcuts({
//     actions: {
//       h: (e)=>{ openHelp(); return true },
//       d: (e)=>{ toggleTheme(); return true },
//       ArrowLeft: (e)=>{ /* ... */ }
//     }
//   })
//   // later: kb.destroy()

export function initShortcuts({ actions = {}, guardInputs = true } = {}){
  const handler = (e)=>{
    if (guardInputs){
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : ''
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.defaultPrevented) return
    }
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key // normalize letters
    const fn = actions[key]
    if (typeof fn === 'function'){
      const shouldPrevent = fn(e) === true
      if (shouldPrevent) e.preventDefault()
    }
  }
  window.addEventListener('keydown', handler)
  return {
    destroy(){ try{ window.removeEventListener('keydown', handler) }catch{} },
    setActions(map){ actions = map || {} }
  }
}

