# GreekHouse — OG image generation prompt

Target: **`og.jpg` at 1200×630** (referenced by `<meta property="og:image">`).
Generate at **2:1** (closest ratio in the picker to OG's 1.905:1), then downscale/trim
to 1200×630 — keep the important motif away from the far right/left edges so the ~5%
width trim is safe.

⚠️ AI image tools garble real text. **Generate the background WITHOUT the headline**,
then overlay "Your chapter's digital home." yourself (Figma/Canva) in Fraunces —
cream + gold italic (type spec at the bottom).

> Prefer a guaranteed-correct version? I can build a `og-image.source.html` (real
> Fraunces text, exact colors, rendered to a crisp 1200×630 PNG — same approach that
> produced AlumniHub's live OG image, no AI garble). Just ask.

---

## Primary prompt (illustrative / brand-abstract)

```
A premium wide landscape social-share banner (2:1, will be trimmed to 1200x630) for
"GreekHouse," an all-in-one platform for Greek-letter organizations. Warm, collegiate,
heraldic mood. Deep burgundy background (#6B1E2E) with a soft radial glow in the
upper-left fading to a warm near-black ink (#1C1410) in the lower-right. Anchored on
the RIGHT: an elegant classical motif — a stylized Greek temple facade (a triangular
pediment over slender fluted columns) rendered in warm gold (#B8923A and #D4AF6A),
with a faint laurel wreath and subtle Greek-letter forms behind it, evoking tradition,
chapter houses, and Greek life. A low-opacity gold crest/shield silhouette as a
background watermark upper-right. A thin gold hairline accent rule. Warm cream (#FDFAF6)
highlights. Sophisticated, institutional, proud — a modern fraternity/sorority crest
reimagined as a flat editorial graphic. Generous empty space on the LEFT HALF for a
headline to be added later. Flat vector / refined heraldic infographic style, NOT
photographic, no people, no real text, no logos.
```

## Negative prompt (if your tool supports it)
```
no garbled text, no lettering, no real words, no faces, no people, no stock-photo look,
no clutter, no bright primary colors, no neon, no 3D bevels, no heavy drop shadows,
not busy, no cartoonish frat clip-art, no beer or party imagery
```

## Tagline + type to overlay afterward (left half)
- Eyebrow: **BUILT FOR GREEK LIFE** — Outfit 600, letter-spaced, gold `#D4AF6A`
- Headline: **Your chapter's** / **digital home.** — Fraunces 700, cream `#FDFAF6`; set the second line in *gold italic* `#D4AF6A`
- Thin gold rule beneath, then sub: *Chapter management, events & community — in one place.*
- Footer badge: *Powered by BigTopa*

## Keep it market-neutral
GreekHouse serves three org types (undergraduate chapters, alumni associations, graduate
chapters). The temple / crest / laurel is heraldic and suits all three — avoid specific
Greek letters that would imply one particular organization.
