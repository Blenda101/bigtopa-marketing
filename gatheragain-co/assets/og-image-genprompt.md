# GatherAgain — OG image generation prompt

Target: **`og-image.png` at 1200×630** (referenced by `<meta property="og:image">`).
A crisp on-brand version is already built from `og-image.source.html` (real Lora
headline, exact forest/amber, rendered to a clean 1200×630 PNG). Use that unless an
AI option beats it.

Generate at **2:1** (closest ratio in the picker to OG's 1.905:1), then downscale/trim
to 1200×630 — keep the important motif away from the far edges so the ~5% trim is safe.

⚠️ **This is a feed THUMBNAIL.** Keep text big and minimal — it's shown small in social
links. Big headline, one short supporting line, nothing tiny. AI tools also garble real
text, so prefer generating the background WITHOUT the headline and overlaying it yourself.

---

## Primary prompt (illustrative / brand-abstract)

```
A warm, inviting wide landscape social-share banner (2:1, will be trimmed to 1200x630)
for "GatherAgain," a platform for planning reunions and keeping groups connected. Cozy,
nostalgic, human mood. Deep forest-green background (#1A3128) with a soft warm amber glow
upper-left fading to a deeper forest near-black lower-right. Anchored on the RIGHT: an
elegant flat-vector "gathering" emblem — a warm amber central node connected by thin lines
to a ring of cream circles (people coming together / a reunion network), enclosed in a
thin gold-amber seal ring, with a subtle circular "again/recurrence" loop arc. Warm cream
(#F7F2EC) and amber (#C4713A, #D98A55) accents. Earthy, celebratory, welcoming — like a
modern family/class reunion mark. Generous empty space on the LEFT HALF for a large
headline to be added later. Flat vector / refined editorial style, NOT photographic,
no people faces, no real text, no logos.
```

## Negative prompt (if your tool supports it)
```
no garbled text, no lettering, no real words, no faces, no people, no stock-photo look,
no clutter, no bright primary colors, no neon, no 3D bevels, no heavy drop shadows,
not busy, no cartoonish clip-art, no cold corporate blue
```

## Tagline + type to overlay afterward (left half) — keep it LARGE
- Eyebrow: **REUNION PLANNING MADE EASY** — Plus Jakarta Sans 600, letter-spaced, amber `#D98A55`
- Headline: **One stop from** / **planning to fun.** — Lora 700, cream `#F7F2EC`; set "fun." in *amber italic* `#D98A55`
- Thin amber rule beneath, then sub: *Hibernate or stay connected — your call.*
- Footer badge: *Powered by BigTopa*

## Notes
Works for all reunion types (family, class, military, corporate) — keep the emblem to the
abstract gathering-network / recurrence idea rather than any one group. The forest+amber
palette and the "hibernate or stay connected" optionality are the brand's signatures.
