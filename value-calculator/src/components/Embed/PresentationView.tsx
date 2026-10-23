import { useEffect, useState } from 'react'
import { EmbedCalculator, Layout, PAGE_BG } from './EmbedCalculator'
import { EMBED_CSS } from './styles'

// Full-page embed for presenting a collection: /?site=<id>[&theme=light|dark|white&accent=<hex>&layout=compact|split]
// Without theme/accent the collection's saved colours are used.

interface Props {
  siteId: string
  theme?: string
  accent?: string
  layout?: Layout
}

export function PresentationView({ siteId, theme, accent, layout }: Props) {
  const [resolvedTheme, setResolvedTheme] = useState(theme || 'light')

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
  }, [])

  useEffect(() => {
    document.body.style.background = PAGE_BG[resolvedTheme] ?? PAGE_BG.dark
  }, [resolvedTheme])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '48px 16px', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: 1040 }}>
        <EmbedCalculator siteId={siteId} theme={theme} accent={accent} layout={layout} onThemeResolved={setResolvedTheme} />
      </div>
    </div>
  )
}
