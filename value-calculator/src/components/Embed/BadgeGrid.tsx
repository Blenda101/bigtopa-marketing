import { Fragment } from 'react'
import { SortMode } from './EmbedCalculator'

interface App {
  id: string
  name: string
  logo: string
  category: string
}

interface Props {
  apps: App[]
  selectedIds: string[]
  onToggle: (id: string) => void
  sortMode: SortMode
}

const FALLBACK_SVG = (letter: string) =>
  `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="%231E2840"/><text x="50%25" y="55%25" text-anchor="middle" dominant-baseline="middle" fill="%238892A4" font-size="16" font-family="sans-serif">${letter}</text></svg>`

function Badge({ app, selected, onToggle }: { app: App; selected: boolean; onToggle: () => void }) {
  return (
    <button
      className={`bt-badge${selected ? ' bt-selected' : ''}`}
      onClick={onToggle}
      title={app.name}
    >
      {selected && (
        <span className="bt-check-pip">
          <svg viewBox="0 0 12 12">
            <polyline points="2,6 5,9 10,3" />
          </svg>
        </span>
      )}
      <img
        src={app.logo || FALLBACK_SVG(app.name[0])}
        alt={app.name}
        className="bt-badge-img"
        onError={e => {
          ;(e.target as HTMLImageElement).src = FALLBACK_SVG(app.name[0])
        }}
      />
      <span className="bt-badge-name">{app.name}</span>
    </button>
  )
}

export function BadgeGrid({ apps, selectedIds, onToggle, sortMode }: Props) {
  if (!apps.length) {
    return <div className="bt-empty">No apps configured for this site.</div>
  }

  if (sortMode === 'name') {
    return (
      <div className="bt-badge-grid">
        {apps.map(app => (
          <Badge
            key={app.id}
            app={app}
            selected={selectedIds.includes(app.id)}
            onToggle={() => onToggle(app.id)}
          />
        ))}
      </div>
    )
  }

  // Category mode — group by category with headers
  const groups = apps.reduce<Record<string, App[]>>((acc, app) => {
    const cat = app.category || 'Other'
    ;(acc[cat] ??= []).push(app)
    return acc
  }, {})

  return (
    <div>
      {Object.entries(groups).map(([category, groupApps]) => (
        <Fragment key={category}>
          <div className="bt-cat-header">{category}</div>
          <div className="bt-badge-grid bt-badge-grid-sm">
            {groupApps.map(app => (
              <Badge
                key={app.id}
                app={app}
                selected={selectedIds.includes(app.id)}
                onToggle={() => onToggle(app.id)}
              />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  )
}
