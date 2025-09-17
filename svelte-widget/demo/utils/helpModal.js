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
        <button class="btn" id="kbdClose" aria-label="Close">Close</button>
      </header>
      <div class="content">
        <div class="shortcuts-grid"></div>
      </div>
      <footer>
        <button class="btn" id="kbdClose2">Close</button>
      </footer>
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
  const btn1 = overlay.querySelector('#kbdClose')
  const btn2 = overlay.querySelector('#kbdClose2')
  overlay.addEventListener('click', onOverlayClick)
  btn1.addEventListener('click', close)
  btn2.addEventListener('click', close)
  return {
    open, close, toggle: ()=> toggle(!overlay.classList.contains('show')),
    destroy(){
      try{ overlay.removeEventListener('click', onOverlayClick) }catch{}
      try{ btn1.removeEventListener('click', close); btn2.removeEventListener('click', close) }catch{}
      try{ overlay.remove() }catch{}
    }
  }
}

