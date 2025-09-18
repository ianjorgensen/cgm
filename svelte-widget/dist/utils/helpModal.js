// Simple help modal injected into the page
// API: const help = mountHelp(document.body, { shortcuts: [{ keys:'D', desc:'Toggle theme' }, ...], title })
// help.open(), help.close(), help.toggle(), help.destroy()

export function mountHelp(root = document.body, { shortcuts = [], title = 'Keyboard Shortcuts' } = {}){
  const overlay = document.createElement('div')
  overlay.className = 'modal-overlay'
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="kbdTitle">
      <header>
        <h3 id="kbdTitle">${title}</h3>
        <button class="btn icon-btn" id="kbdClose" aria-label="Close" title="Close">×</button>
      </header>
      <div class="content">
        <div class="shortcuts-grid"></div>
      </div>
    </div>`
  const grid = overlay.querySelector('.shortcuts-grid')
  shortcuts.forEach(s=>{
    const k = document.createElement('div'); k.innerHTML = `<span class="kbd">${s.keys}</span>`
    const d = document.createElement('div'); d.textContent = s.desc
    grid.appendChild(k); grid.appendChild(d)
  })
  root.appendChild(overlay)

  const toggle = (show)=> overlay.classList.toggle('show', !!show)
  const close = ()=> toggle(false)
  const open = ()=> toggle(true)
  const onOverlayClick = (e)=>{ if (e.target === overlay) close() }
  const onKey = (e)=>{ if (e.key === 'Escape' && overlay.classList.contains('show')) close() }
  const btn1 = overlay.querySelector('#kbdClose')
  overlay.addEventListener('click', onOverlayClick)
  window.addEventListener('keydown', onKey)
  if (btn1) btn1.addEventListener('click', close)
  return {
    open, close, toggle: ()=> toggle(!overlay.classList.contains('show')),
    destroy(){
      try{ overlay.removeEventListener('click', onOverlayClick) }catch{}
      try{ window.removeEventListener('keydown', onKey) }catch{}
      try{ if (btn1) btn1.removeEventListener('click', close) }catch{}
      try{ overlay.remove() }catch{}
    }
  }
}
