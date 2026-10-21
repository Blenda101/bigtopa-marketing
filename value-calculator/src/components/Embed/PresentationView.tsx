import { useEffect } from 'react'
import { EmbedCalculator } from './EmbedCalculator'
import { EMBED_CSS } from './styles'

// Full-page embed for presenting a collection: /?site=<id>&theme=light|dark&accent=<hex>

const PAGE_BG: Record<string, string> = {
  dark: '#080C14',
  light: '#F3EEE6',
}

interface Props {
  siteId: string
  theme: string
  accent: string
}

export function PresentationView({ siteId, theme, accent }: Props) {
  useEffect(() => {
    if (!document.getElementById('bt-embed-styles')) {
      const style = document.createElement('style')
      style.id = 'bt-embed-styles'
      style.textContent = EMBED_CSS
      document.head.appendChild(style)
    }
    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'
    document.head.appendChild(font)
    document.body.style.margin = '0'
    document.body.style.background = PAGE_BG[theme] ?? PAGE_BG.dark
  }, [theme])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '48px 16px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 1040 }}>
        <EmbedCalculator siteId={siteId} theme={theme} accent={accent} />
      </div>
    </div>
  )
}
