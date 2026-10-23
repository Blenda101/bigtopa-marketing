import { useMemo, useState, DragEvent } from 'react'
import { BadgeGrid, DRAG_TYPE } from './BadgeGrid'
import { calculate, CtaButton, Cta, Pricing, ResultsCard, TeamSizeCard } from './EmbedResults'
import { SortMode } from './EmbedCalculator'

interface App {
  id: string
  name: string
  logo: string
  cost_per_user: number
  pricing_type?: 'per_user' | 'flat'
  category: string
}

interface Props {
  apps: App[]
  sortMode: SortMode
  onSortModeChange: (mode: SortMode) => void
  pricing: Pricing
  showPrice: boolean
  cta?: Cta
}

// Side-by-side layout: available apps on the left, "Apps we use" + live summary on the right.
// Apps move by click or drag in either direction.
export function SplitCalculator({ apps, sortMode, onSortModeChange, pricing, showPrice, cta }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [companySize, setCompanySize] = useState(25)
  const [dragOver, setDragOver] = useState<'available' | 'used' | null>(null)

  const available = apps.filter(a => !selectedIds.includes(a.id))
  const used = selectedIds.map(id => apps.find(a => a.id === id)).filter((a): a is App => !!a)

  const calc = useMemo(() => calculate(used, companySize, pricing), [used, companySize, pricing])

  const add = (id: string) => setSelectedIds(prev => (prev.includes(id) ? prev : [...prev, id]))
  const remove = (id: string) => setSelectedIds(prev => prev.filter(x => x !== id))

  const dropZone = (zone: 'available' | 'used', onDrop: (id: string) => void) => ({
    onDragOver: (e: DragEvent) => {
      e.preventDefault()
      setDragOver(zone)
    },
    onDragLeave: () => setDragOver(null),
    onDrop: (e: DragEvent) => {
      e.preventDefault()
      setDragOver(null)
      const id = e.dataTransfer.getData(DRAG_TYPE)
      if (id) onDrop(id)
    },
  })

  return (
    <div className="bt-split bt-fade">
      <div className={`bt-panel${dragOver === 'available' ? ' bt-drop-active' : ''}`} {...dropZone('available', remove)}>
        <div className="bt-panel-head">
          <span className="bt-panel-title">Available apps</span>
          <div className="bt-sort-toggle">
            <button
              className={`bt-sort-btn${sortMode === 'name' ? ' bt-sort-active' : ''}`}
              onClick={() => onSortModeChange('name')}
            >
              A–Z
            </button>
            <button
              className={`bt-sort-btn${sortMode === 'category' ? ' bt-sort-active' : ''}`}
              onClick={() => onSortModeChange('category')}
            >
              Category
            </button>
          </div>
        </div>
        <BadgeGrid
          apps={available}
          selectedIds={[]}
          onToggle={add}
          sortMode={sortMode}
          draggable
          emptyText={apps.length ? 'All apps added' : undefined}
        />
      </div>

      <div className="bt-split-side">
        <div className={`bt-panel${dragOver === 'used' ? ' bt-drop-active' : ''}`} {...dropZone('used', add)}>
          <div className="bt-panel-head">
            <span className="bt-panel-title">Apps we use</span>
            {used.length > 0 && (
              <button className="bt-adjust-btn" onClick={() => setSelectedIds([])}>
                Clear
              </button>
            )}
          </div>
          {used.length === 0 ? (
            <div className="bt-drop-hint">Click or drag apps here</div>
          ) : (
            <div className="bt-used-list">
              {used.map(app => (
                <button
                  key={app.id}
                  className="bt-used-chip"
                  draggable
                  onDragStart={e => e.dataTransfer.setData(DRAG_TYPE, app.id)}
                  onClick={() => remove(app.id)}
                  title={`Remove ${app.name}`}
                >
                  <img src={app.logo} alt="" className="bt-used-img" />
                  <span>{app.name}</span>
                  <span className="bt-used-x">×</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <TeamSizeCard companySize={companySize} onChange={setCompanySize} />
        <ResultsCard calc={calc} showPrice={showPrice} />
        <CtaButton cta={cta} />
      </div>
    </div>
  )
}
