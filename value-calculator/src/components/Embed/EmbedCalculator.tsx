import { useState, useEffect, CSSProperties, useMemo } from 'react'
import { supabase } from '../../lib/supabase'
import { BadgeGrid } from './BadgeGrid'
import { SavingsHeader } from './SavingsHeader'
import { EmbedResults } from './EmbedResults'

export type SortMode = 'name' | 'category'

interface App {
  id: string
  name: string
  logo: string
  cost_per_user: number
  category: string
  sites?: string[] | null
}

interface Pricing {
  base_price: number
  price_per_user: number
}

interface SavedCalc {
  yearlySavings: number
  replacedCount: number
}

type EmbedState = 'selecting' | 'calculating' | 'done'

const THEMES: Record<string, Record<string, string>> = {
  dark: {
    '--bt-ink':   '#080C14',
    '--bt-ink2':  '#0D1220',
    '--bt-ink3':  '#141B2D',
    '--bt-edge':  '#1E2840',
    '--bt-rule':  'rgba(255,255,255,0.06)',
    '--bt-white': '#FAFBFF',
    '--bt-muted': '#8892A4',
    '--bt-hint':  '#4D5A70',
  },
  light: {
    '--bt-ink':   'transparent',
    '--bt-ink2':  '#EDE6DC',
    '--bt-ink3':  '#E6DDD2',
    '--bt-edge':  '#C4B5A5',
    '--bt-rule':  '#D8CFC4',
    '--bt-white': '#1A0E05',
    '--bt-muted': '#6B5D50',
    '--bt-hint':  '#9E8E80',
  },
}

interface Props {
  siteId: string
  theme: string
  accent: string
}

export function EmbedCalculator({ siteId, theme, accent }: Props) {
  const [apps, setApps] = useState<App[]>([])
  const [pricing, setPricing] = useState<Pricing>({ base_price: 499, price_per_user: 10 })
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [companySize, setCompanySize] = useState(25)
  const [embedState, setEmbedState] = useState<EmbedState>('selecting')
  const [lastCalc, setLastCalc] = useState<SavedCalc | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('name')

  const sortedApps = useMemo(() => {
    if (sortMode === 'name') return [...apps].sort((a, b) => a.name.localeCompare(b.name))
    return [...apps].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
  }, [apps, sortMode])

  const themeVars = {
    ...(THEMES[theme] ?? THEMES.dark),
    '--bt-accent': accent,
  } as CSSProperties

  useEffect(() => {
    Promise.all([loadApps(), loadPricing()]).finally(() => setLoading(false))
  }, [siteId])

  async function loadApps() {
    const { data, error } = await supabase.from('apps').select('*').order('name')
    if (error || !data) return
    const filtered = (data as App[]).filter(
      app => !app.sites?.length || app.sites.includes(siteId)
    )
    setApps(filtered)
  }

  async function loadPricing() {
    const { data } = await supabase
      .from('pricing')
      .select('base_price, price_per_user')
      .eq('id', 1)
      .single()
    if (data) setPricing(data as Pricing)
  }

  function toggleApp(id: string) {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  if (loading) {
    return (
      <div className="bt-embed" style={themeVars}>
        <div className="bt-loading">Loading…</div>
      </div>
    )
  }

  return (
    <div className="bt-embed" style={themeVars}>
      {embedState === 'calculating' ? (
        <EmbedResults
          apps={sortedApps}
          selectedIds={selectedIds}
          companySize={companySize}
          onCompanySizeChange={setCompanySize}
          pricing={pricing}
          onBack={calc => {
            setLastCalc(calc)
            setEmbedState('done')
          }}
        />
      ) : (
        <div className="bt-fade">
          {embedState === 'done' && lastCalc && (
            <SavingsHeader
              savings={lastCalc.yearlySavings}
              replacedCount={lastCalc.replacedCount}
              onAdjust={() => setEmbedState('calculating')}
            />
          )}

          {/* Sort toggle */}
          <div className="bt-sort-row">
            <span className="bt-sort-label">Sort by</span>
            <div className="bt-sort-toggle">
              <button
                className={`bt-sort-btn${sortMode === 'name' ? ' bt-sort-active' : ''}`}
                onClick={() => setSortMode('name')}
              >
                A–Z
              </button>
              <button
                className={`bt-sort-btn${sortMode === 'category' ? ' bt-sort-active' : ''}`}
                onClick={() => setSortMode('category')}
              >
                Category
              </button>
            </div>
          </div>

          <BadgeGrid
            apps={sortedApps}
            selectedIds={selectedIds}
            onToggle={toggleApp}
            sortMode={sortMode}
          />
          <button
            className="bt-calc-btn"
            disabled={selectedIds.length === 0}
            onClick={() => setEmbedState('calculating')}
          >
            {selectedIds.length === 0
              ? 'Select apps to calculate savings'
              : `Calculate savings · ${selectedIds.length} app${selectedIds.length > 1 ? 's' : ''} selected`}
          </button>
        </div>
      )}
    </div>
  )
}
