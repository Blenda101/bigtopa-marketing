# AlumniHub — OG image generation prompt

Two assets here:
- **`og-image.png`** (1200×630) — the on-brand version I built. Crisp, correct tagline text, drops straight into `<meta property="og:image">`. **Use this as the live OG image.**
- **The prompt below** — for an AI tool (Midjourney / DALL·E / Firefly) if you want a richer, more illustrative/photographic background. ⚠️ AI image tools garble exact text — generate the background WITHOUT the tagline, then overlay "Nurture your community. Grow your givers." yourself (Figma/Canva) in Cormorant Garamond cream + gold italic.

---

## Primary prompt (illustrative / brand-abstract)

```
A premium 1200x630 social share banner for "AlumniHub," a platform for alumni
community giving. Deep institutional navy background (#1A2B4C) with a soft radial
glow in the upper-left fading to near-black in the lower-right. Anchored on the
right: an elegant fundraising data visualization — a series of rising golden bars
climbing left-to-right toward a dotted "goal" line, with a thin cream trend line
and small glowing donation dots arcing upward, conveying growth and momentum.
Faint gold honeycomb / hex-tile cluster motif layered subtly behind the chart.
A very subtle, low-opacity gold graduation-cap silhouette as a background
watermark in the upper-right corner. A thin gold hairline accent rule. Warm,
restrained, trustworthy, editorial. Palette strictly navy + gold (#C99A2E,
#E3BC5C) + warm cream (#FAF6EE). Generous empty space on the LEFT HALF for a
headline to be added later. Flat vector / refined infographic style, NOT
photographic, no people, no real text, no logos. Sophisticated nonprofit /
university advancement aesthetic.
```

## Negative prompt (if your tool supports it)
```
no garbled text, no lettering, no real words, no faces, no people, no stock-photo
look, no clutter, no bright primary colors, no orange, no neon, no 3D bevels,
no drop shadows, not busy
```

## Tagline + type to overlay afterward (left half)
- Eyebrow: **COMMUNITY-DRIVEN ALUMNI GIVING** — Inter 600, letter-spaced, gold-light `#E3BC5C`
- Headline: **Nurture your community.** / **Grow your givers.** — Cormorant Garamond 600, cream `#FAF6EE`; set the second line in *gold italic* `#E3BC5C`
- Thin gold rule beneath, then sub: *Engagement, marketing & giving — in one platform.*
- Footer badge: *Powered by BigTopa*

## Notes on "all alumni markets"
Kept the graduation cap **subtle and optional** so the banner suits high-school
alumni groups and booster clubs, not just collegiate. The fundraising-growth
chart + hex motif is the real anchor and is market-neutral. If you want a version
with zero cap, just remove the watermark line from the prompt.
```
