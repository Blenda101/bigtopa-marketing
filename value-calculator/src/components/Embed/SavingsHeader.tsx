import { Calculation } from './EmbedResults'

interface Props {
  calc: Calculation
  showPrice: boolean
  onAdjust: () => void
}

export function SavingsHeader({ calc, showPrice, onAdjust }: Props) {
  const amount = (n: number) => `$${Math.round(Math.abs(n)).toLocaleString()}/yr`
  const positive = calc.yearlySavings >= 0

  const label = showPrice
    ? `${positive ? 'You could save' : 'Additional cost'} · replaces ${calc.replacedCount} app${calc.replacedCount !== 1 ? 's' : ''}`
    : `Current spend · ${calc.appCount} app${calc.appCount !== 1 ? 's' : ''}`
  const value = showPrice
    ? `${positive ? '' : '+'}${amount(calc.yearlySavings)}`
    : amount(calc.totalYearlyCost)

  return (
    <div className="bt-savings-bar">
      <div>
        <div className="bt-savings-label">{label}</div>
        <div className="bt-savings-amount">{value}</div>
      </div>
      <button className="bt-adjust-btn" onClick={onAdjust}>
        Adjust
      </button>
    </div>
  )
}
