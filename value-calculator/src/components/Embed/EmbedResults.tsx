import { useMemo } from 'react'

interface App {
  id: string
  name: string
  cost_per_user: number
  pricing_type?: 'per_user' | 'flat'
}

export interface Pricing {
  flat_monthly: number
  per_user_monthly: number
}

export interface Cta {
  label?: string | null
  url?: string | null
}

export interface Calculation {
  appCount: number
  totalMonthlyCost: number
  totalYearlyCost: number
  bigTopaYearlyCost: number
  yearlySavings: number
  replacedCount: number
}

// Per-user apps scale with team size; flat apps are one cost for the org
export function calculate(selectedApps: App[], companySize: number, pricing: Pricing): Calculation {
  const totalMonthlyCost = selectedApps.reduce(
    (sum, app) => sum + app.cost_per_user * (app.pricing_type === 'flat' ? 1 : companySize),
    0
  )
  const totalYearlyCost = totalMonthlyCost * 12
  const bigTopaYearlyCost = (pricing.flat_monthly + pricing.per_user_monthly * companySize) * 12
  return {
    appCount: selectedApps.length,
    totalMonthlyCost,
    totalYearlyCost,
    bigTopaYearlyCost,
    yearlySavings: totalYearlyCost - bigTopaYearlyCost,
    replacedCount: Math.min(Math.ceil(selectedApps.length * 0.8), selectedApps.length),
  }
}

const money = (n: number) => `$${Math.round(Math.abs(n)).toLocaleString()}`

export function TeamSizeCard({ companySize, onChange }: { companySize: number; onChange: (n: number) => void }) {
  return (
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
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  )
}

export function ResultsCard({ calc, showPrice }: { calc: Calculation; showPrice: boolean }) {
  return (
    <div className="bt-card">
      <div className="bt-replace-tag">
        {showPrice
          ? `Replace ${calc.replacedCount} app${calc.replacedCount !== 1 ? 's' : ''} with BigTopa`
          : `${calc.appCount} app${calc.appCount !== 1 ? 's' : ''} · ${calc.appCount} login${calc.appCount !== 1 ? 's' : ''} · ${calc.appCount} place${calc.appCount !== 1 ? 's' : ''} things get lost`}
      </div>
      {showPrice ? (
        <>
          <div className="bt-metric">
            <span className="bt-metric-label">Current cost</span>
            <span className="bt-metric-val">{money(calc.totalYearlyCost)}/yr</span>
          </div>
          <div className="bt-metric">
            <span className="bt-metric-label">BigTopa cost</span>
            <span className="bt-metric-val accent">{money(calc.bigTopaYearlyCost)}/yr</span>
          </div>
          <div className="bt-metric">
            <span className="bt-metric-label">Your savings</span>
            <span className={`bt-metric-val ${calc.yearlySavings >= 0 ? 'green' : 'accent'}`}>
              {calc.yearlySavings >= 0 ? '' : '–'}{money(calc.yearlySavings)}/yr
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="bt-metric">
            <span className="bt-metric-label">Current spend / month</span>
            <span className="bt-metric-val">{money(calc.totalMonthlyCost)}</span>
          </div>
          <div className="bt-metric">
            <span className="bt-metric-label">Current spend / year</span>
            <span className="bt-metric-val accent">{money(calc.totalYearlyCost)}</span>
          </div>
        </>
      )}
    </div>
  )
}

export function CtaButton({ cta }: { cta?: Cta }) {
  if (!cta?.label || !cta.url) return null
  return (
    <a className="bt-cta-btn" href={cta.url} target="_blank" rel="noopener noreferrer">
      {cta.label}
    </a>
  )
}

interface Props {
  apps: App[]
  selectedIds: string[]
  companySize: number
  onCompanySizeChange: (n: number) => void
  pricing: Pricing
  showPrice: boolean
  cta?: Cta
  onBack: (calc: Calculation) => void
}

export function EmbedResults({
  apps,
  selectedIds,
  companySize,
  onCompanySizeChange,
  pricing,
  showPrice,
  cta,
  onBack,
}: Props) {
  const calc = useMemo(
    () => calculate(apps.filter(a => selectedIds.includes(a.id)), companySize, pricing),
    [apps, selectedIds, companySize, pricing]
  )

  return (
    <div className="bt-results bt-fade">
      <button className="bt-back-btn" onClick={() => onBack(calc)}>
        ← Back to apps
      </button>
      <TeamSizeCard companySize={companySize} onChange={onCompanySizeChange} />
      <ResultsCard calc={calc} showPrice={showPrice} />
      <CtaButton cta={cta} />
    </div>
  )
}
