import { useMemo } from 'react'

interface App {
  id: string
  name: string
  cost_per_user: number
}

interface Pricing {
  base_price: number
}

interface Calculation {
  totalYearlyCost: number
  bigTopaYearlyCost: number
  yearlySavings: number
  replacedCount: number
}

interface Props {
  apps: App[]
  selectedIds: string[]
  companySize: number
  onCompanySizeChange: (n: number) => void
  pricing: Pricing
  onBack: (calc: Calculation) => void
}

export function EmbedResults({
  apps,
  selectedIds,
  companySize,
  onCompanySizeChange,
  pricing,
  onBack,
}: Props) {
  const selectedApps = apps.filter(a => selectedIds.includes(a.id))

  const calc = useMemo<Calculation>(() => {
    const totalMonthlyCost = selectedApps.reduce(
      (sum, app) => sum + app.cost_per_user * companySize,
      0
    )
    const totalYearlyCost = totalMonthlyCost * 12
    const bigTopaYearlyCost = pricing.base_price * companySize
    const yearlySavings = totalYearlyCost - bigTopaYearlyCost
    const replacedCount = Math.min(
      Math.ceil(selectedApps.length * 0.8),
      selectedApps.length
    )
    return { totalYearlyCost, bigTopaYearlyCost, yearlySavings, replacedCount }
  }, [selectedApps, companySize, pricing])

  const fmt = (n: number) => `$${Math.round(Math.abs(n)).toLocaleString()}/yr`

  return (
    <div className="bt-results bt-fade">
      <button className="bt-back-btn" onClick={() => onBack(calc)}>
        ← Back to apps
      </button>

      {/* Team size */}
      <div className="bt-card">
        <div className="bt-slider-row">
          <span className="bt-slider-label">People in your org</span>
          <span className="bt-slider-val">{companySize}</span>
        </div>
        <input
          type="range"
          className="bt-range"
          min={1}
          max={500}
          value={companySize}
          onChange={e => onCompanySizeChange(Number(e.target.value))}
        />
      </div>

      {/* Results breakdown */}
      <div className="bt-card">
        <div className="bt-replace-tag">
          Replace {calc.replacedCount} app{calc.replacedCount !== 1 ? 's' : ''} with BigTopa
        </div>
        <div className="bt-metric">
          <span className="bt-metric-label">Current cost</span>
          <span className="bt-metric-val">{fmt(calc.totalYearlyCost)}</span>
        </div>
        <div className="bt-metric">
          <span className="bt-metric-label">BigTopa cost</span>
          <span className="bt-metric-val accent">{fmt(calc.bigTopaYearlyCost)}</span>
        </div>
        <div className="bt-metric">
          <span className="bt-metric-label">Your savings</span>
          <span className={`bt-metric-val ${calc.yearlySavings >= 0 ? 'green' : 'accent'}`}>
            {calc.yearlySavings >= 0 ? '' : '–'}{fmt(calc.yearlySavings)}
          </span>
        </div>
      </div>
    </div>
  )
}
