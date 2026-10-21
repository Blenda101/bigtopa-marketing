import React from 'react'
import { createRoot } from 'react-dom/client'
import { EmbedCalculator } from './components/Embed/EmbedCalculator'
import { EMBED_CSS } from './components/Embed/styles'

function injectStyles() {
  if (document.getElementById('bt-embed-styles')) return
  const style = document.createElement('style')
  style.id = 'bt-embed-styles'
  style.textContent = EMBED_CSS
  document.head.appendChild(style)
}

function mount() {
  injectStyles()
  const containers = document.querySelectorAll<HTMLElement>('[data-bt-calculator]')
  containers.forEach(el => {
    const siteId  = el.getAttribute('data-site')   || 'bigtopa'
    // Optional overrides; otherwise the site's saved theme/accent is used
    const theme   = el.getAttribute('data-theme')  || undefined
    const accent  = el.getAttribute('data-accent') || undefined
    createRoot(el).render(
      <React.StrictMode>
        <EmbedCalculator siteId={siteId} theme={theme} accent={accent} />
      </React.StrictMode>
    )
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
