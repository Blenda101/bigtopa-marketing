# BigTopa — OG image generation prompt

Target: **`og-image.png` at 1200×630** (referenced by every page's `<meta property="og:image">`).
A crisp on-brand version is already built from `og-image.source.html` (real DM Serif Display
headline, exact ink/orange, big-top mark, rendered to a clean 1200×630 PNG). Use that unless
an AI option beats it.

Generate at **2:1** (closest ratio in the picker to OG's 1.905:1), then downscale/trim
to 1200×630 — keep the mark away from the far edges so the ~5% trim is safe.

⚠️ **This is a feed THUMBNAIL.** Keep text big and minimal — it renders small in social
links. Big headline, one short supporting line, nothing tiny. AI tools garble real text, so
prefer generating the background WITHOUT the headline and overlaying it yourself.

---

## Primary prompt (illustrative / brand-abstract)

```
A premium, modern dark-tech social-share banner (2:1, will be trimmed to 1200x630) for
"BigTopa," an all-in-one engagement platform. Deep near-black navy-ink background (#080C14)
with a soft dual-tone glow upper-right — warm orange (#E8621A) blending into electric violet
(#7B5CF0) — fading to near-black. Anchored on the RIGHT: a bold, minimal orange "big-top tent"
emblem (two swooping peaks meeting at a center pole topped with a small flag — abstract, iconic,
geometric), sitting inside faint concentric orange/violet rings. Sophisticated, confident,
premium SaaS aesthetic. Generous empty space on the LEFT HALF for a serif headline to be added
later. Flat vector / refined editorial style, NOT photographic, no people, no real text, no
logos, no literal circus imagery beyond the clean abstract tent mark.
```

## Negative prompt (if your tool supports it)
```
no garbled text, no lettering, no real words, no faces, no people, no stock-photo look,
no clutter, no bright primary colors besides the brand orange, no neon, no 3D bevels,
no heavy drop shadows, not busy, no literal circus/clown imagery, no confetti
```

## Tagline + type to overlay afterward (left half) — keep it LARGE
- Wordmark: **BigTopa** — DM Serif Display, "Big" cream `#FAFBFF` + "Topa" orange `#E8621A`, with the tent mark
- Eyebrow: **THE ENGAGEMENT PLATFORM** — DM Sans 500, letter-spaced, orange `#FF7A35`
- Headline: **One platform.** / **Every engagement.** — DM Serif Display, cream `#FAFBFF`; "engagement." in *orange italic* `#FF7A35`
- Thin orange rule beneath, then sub: *Chat, events, community & giving — one platform.*

## Notes
BigTopa is the parent/umbrella brand over GreekHouse, AlumniHub, and GatherAgain — keep it the
most abstract and premium of the four (dark-first, orange+violet), not market-specific. The
"big-top tent" mark is the namesake; keep it clean and geometric, never cartoonish.
