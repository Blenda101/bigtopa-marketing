import React from 'react'

interface Props {
  savings: number
  replacedCount: number
  onAdjust: () => void
}

export function SavingsHeader({ savings, replacedCount, onAdjust }: Props) {
  const positive = savings >= 0
  const amount = `$${Math.round(Math.abs(savings)).toLocaleString()}/yr`
  const label = positive ? 'You could save' : 'Additional cost'

  return (
    <div className="bt-savings-bar">
      <div>
        <div className="bt-savings-label">
          {label} · replaces {replacedCount} app{replacedCount !== 1 ? 's' : ''}
        </div>
        <div className="bt-savings-amount">
          {positive ? '' : '+'}{amount}
        </div>
      </div>
      <button className="bt-adjust-btn" onClick={onAdjust}>
        Adjust
      </button>
    </div>
  )
}
