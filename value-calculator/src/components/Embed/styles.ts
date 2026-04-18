// Injected as a <style> tag when the embed script loads.
// --bt-* variables are set as inline styles by EmbedCalculator based on
// data-theme and data-accent attributes — no host CSS variable dependency.

export const EMBED_CSS = `
.bt-embed {
  /* --bt-* vars injected as inline style by the mount script */
  box-sizing: border-box;
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--bt-white);
}

/* Hard reset — prevent host page CSS bleeding into embed elements */
.bt-embed *, .bt-embed *::before, .bt-embed *::after {
  box-sizing: inherit;
}

/* Reset only font/color — do NOT reset background here (breaks filled buttons) */
.bt-embed button, .bt-embed input {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  margin: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

/* Only clear background on buttons that are intentionally ghost */
.bt-embed .bt-back-btn,
.bt-embed .bt-adjust-btn {
  background: none;
  border: none;
}

.bt-embed a {
  color: inherit;
  text-decoration: none;
}

/* accent-color drives native range thumb tint in modern browsers */
.bt-embed input[type="range"] {
  accent-color: var(--bt-accent);
}

/* ── SORT TOGGLE ── */
.bt-sort-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.bt-sort-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .8px;
  text-transform: uppercase;
  color: var(--bt-hint);
}

.bt-sort-toggle {
  display: flex;
  border: 1px solid var(--bt-edge);
  border-radius: 7px;
  overflow: hidden;
}

.bt-sort-btn {
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 500;
  color: var(--bt-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: background .15s, color .15s;
}

.bt-sort-btn + .bt-sort-btn {
  border-left: 1px solid var(--bt-edge);
}

.bt-sort-btn.bt-sort-active {
  background: var(--bt-accent);
  color: #fff;
}

/* ── CATEGORY HEADER ── */
.bt-cat-header {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--bt-hint);
  margin: 14px 0 8px;
}

.bt-cat-header:first-child { margin-top: 0; }

/* ── BADGE GRID ── */
.bt-badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.bt-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 14px 6px 10px;
  border: 1.5px solid var(--bt-edge);
  border-radius: 12px;
  background: var(--bt-ink3);
  cursor: pointer;
  transition: border-color .18s, transform .15s, background .18s;
  position: relative;
  user-select: none;
  text-align: center;
  width: 100%;
}

.bt-badge:hover {
  border-color: var(--bt-muted);
  transform: translateY(-2px);
}

.bt-badge.bt-selected {
  border-color: var(--bt-accent);
  background: color-mix(in srgb, var(--bt-accent) 10%, transparent);
}

.bt-badge-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
}

.bt-badge-name {
  font-size: 11px;
  font-weight: 500;
  color: var(--bt-muted);
  line-height: 1.3;
  word-break: break-word;
}

.bt-badge.bt-selected .bt-badge-name {
  color: var(--bt-white);
}

.bt-check-pip {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: var(--bt-accent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bt-check-pip svg {
  width: 10px;
  height: 10px;
  stroke: #fff;
  fill: none;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ── CALCULATE BUTTON ── */
.bt-calc-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background: var(--bt-accent);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  letter-spacing: .2px;
  transition: opacity .15s;
  font-family: inherit;
}

.bt-calc-btn:disabled {
  opacity: .35;
  cursor: not-allowed;
}

.bt-calc-btn:not(:disabled):hover {
  opacity: .88;
}

/* ── SAVINGS HEADER ── */
.bt-savings-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(232,98,26,.1);
  border: 1px solid rgba(232,98,26,.25);
  border-radius: 10px;
  margin-bottom: 14px;
  animation: bt-slide-in .3s ease both;
}

@keyframes bt-slide-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.bt-savings-label {
  font-size: 11px;
  color: var(--bt-muted);
  margin-bottom: 2px;
}

.bt-savings-amount {
  font-size: 19px;
  font-weight: 700;
  color: var(--bt-accent);
}

.bt-adjust-btn {
  font-size: 11px;
  color: var(--bt-muted);
  background: none;
  border: 1px solid var(--bt-edge);
  border-radius: 6px;
  padding: 5px 11px;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: border-color .15s, color .15s;
  flex-shrink: 0;
}

.bt-adjust-btn:hover {
  border-color: var(--bt-muted);
  color: var(--bt-white);
}

/* ── RESULTS VIEW ── */
.bt-results {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bt-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--bt-muted);
  background: none;
  border: none;
  padding: 0 0 4px;
  cursor: pointer;
  font-family: inherit;
  transition: color .15s;
}

.bt-back-btn:hover { color: var(--bt-white); }

.bt-card {
  background: var(--bt-ink3);
  border: 1px solid var(--bt-edge);
  border-radius: 12px;
  padding: 18px 20px;
}

.bt-slider-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
}

.bt-slider-label {
  font-size: 13px;
  color: var(--bt-muted);
}

.bt-slider-val {
  font-size: 22px;
  font-weight: 700;
  color: var(--bt-white);
}

.bt-range {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: var(--bt-edge);
  outline: none;
  cursor: pointer;
}

.bt-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bt-accent);
  cursor: pointer;
}

.bt-range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bt-accent);
  cursor: pointer;
  border: none;
}

.bt-replace-tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--bt-accent);
  margin-bottom: 12px;
}

.bt-metric {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 0;
  border-bottom: 1px solid var(--bt-rule);
  font-size: 13px;
}

.bt-metric:last-child { border-bottom: none; padding-bottom: 0; }

.bt-metric-label { color: var(--bt-muted); }

.bt-metric-val {
  font-weight: 600;
  color: var(--bt-white);
}

.bt-metric-val.accent { color: var(--bt-accent); }
.bt-metric-val.green  { color: #4ade80; }

.bt-cta-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background: var(--bt-accent);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  transition: opacity .15s;
}

.bt-cta-btn:hover { opacity: .88; }

/* ── STATES ── */
.bt-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--bt-muted);
  font-size: 13px;
}

.bt-empty {
  text-align: center;
  padding: 24px;
  color: var(--bt-hint);
  font-size: 13px;
}

.bt-fade {
  animation: bt-fade-up .22s ease both;
}

@keyframes bt-fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
`
