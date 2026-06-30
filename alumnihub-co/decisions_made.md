# AlumniHub.co — Decisions Made

Living record of decisions taken while building the site, per the handoff rule to document anything not fully specified in `task1_create_alumnihub.md`. Updated after the discovery/discussion rounds with Gabriel (June 2026), which significantly reshaped the original brief.

---

## Site model (as refined in discussion)

AlumniHub is a multi-page vertical. **Giving stays the headline** (per Gabriel), but a chapter does three things, and the platform is federated.

**A chapter is a hub that unifies three pillars:** Engagement · Marketing · Monetization. For alumni, **Fit** turns on the subset that suits the market — with **Donations as the highlighted monetization method** — and leaves the rest (e.g. hourly billing, usage metering) off.

**Engagement pillar scope (for the Stage-2 `engagement.html`):** four clusters —
1. **Community & conversations** — Stream feed (announcements, posts, discussions, reactions). This *is* the "conversations and content" layer; it travels via Chapter Hub Flow's **Content** domain. Important nuance (Gabriel): **conversations *flow*** (they surface across connected chapters automatically) and are **not** "shared"; **content can flow *and* be deliberately *shared*** (brand kits, templates cascaded down). Copy must use "flow" for conversations, never "share."
2. **Meetups (live)** — Fit subset for alumni is **Webinar, Broadcast, and Meeting only** (Meet, Meet Now, Go Live, Co-browsing **off**).
3. **Events, conferences & reunions** — registration here; ticketing/sponsorship pulled from Monetization.
4. **Members & chapters** — directory across classes/regions, profiles, roles, committee/working-group spaces.
Plus three confirmed extras: **photo galleries/albums**, **document library / chapter archive**, and **notifications & digests** (weekly chapter digest, engagement-oriented).

**Chapters federate via two named features:**
- **Chapter Hub Flow** — movement of four domains (Financial · Content · Events · People); happens *within* a chapter always, and *between* chapters once connected.
- **Chapter Hub Connect** — premium feature that links chapters into a family so flow can cross between them. Opt-in per domain, consented on both sides, connections known. Privacy/security standards stated.
- Hierarchy: **National → Regional → Local**, max 3 levels. Platform-internal names are "Hub Flow / Hub Connect"; the vertical says "Chapter Hub Flow / Connect"; "tenant" stays internal.
- **University relationship is a configurable edge:** dotted line (independent 501(c)(3) raising *for* the school) or solid line (integrated under Advancement).

**Tier mapping for flow:**

| Capability | Role / Level | Tier |
|---|---|---|
| Chapter Hub Flow — within a chapter | Any chapter | All tiers (incl. Annual) |
| Chapter Hub Connect — link up to a parent | Child / Level 1 | Campaign + |
| Chapter Hub Flow — be the parent hub | Parent / Level 2–3 (regional, national) | Endowment only |

---

## Page architecture (doerfy-style: teaser on home, deep page per topic — better SEO)

Home teases each concept with a "Learn more →"; each key topic gets its own page with shared nav/footer + its own hero + CTA. Two nav axes:
- **Platform ▾** → Monetization · Engagement · Marketing · Chapter Hub Flow
- **Who it's for ▾** → University Alumni Associations · Alumni Class Networks · High School Alumni · Booster Clubs

**Build is staged.** Stage 1 (this batch) locks the pattern with four pages:
- `index.html` — restructured home (hero → 3-pillar hub → org types → Chapter Hub Flow/Connect teaser → transparency → payments → tiers → early access → CTA)
- `chapter-hub-flow.html` — federation deep page (Flow vs Connect, family diagram, 4 opt-in domains, privacy/security, dotted/solid university line, tier table)
- `monetization.html` — lead pillar; donations highlighted; Fit panel showing what's on/off for alumni
- `university-alumni-associations.html` — richest org page; regional chapter directory (echoes the NHAA example), conferences/events, chapter family + Connect, independent-501(c)(3) framing

**Stage 2 (built):** `engagement.html`, `marketing.html`, `alumni-class-networks.html`, `high-school-alumni.html`, `booster-clubs.html`. All nine pages now live; all internal links resolve; navy
## Giving dashboard — interactive (Public/Admin)
- Single page `giving-dashboard.html` + `assets/dash.css` + `assets/dash.js` (split from one file to dodge ~25KB single-write truncation ceiling).
- Two views via toggle: **Public** (shareable infographic — progress, momentum, hex map, recognition societies, top classes/chapters, latest gifts, matching challenge) and **Admin** (adds Fund Ledger & Health with LYBUNT/SYBUNT/pledged/recurring, full Donor table with PII, Export CSV).
- Filters: scope (National / Northeast Region / Boston Chapter), metric (Dollars / Participation / Donors) re-tint the hex map; period selector; all driven by in-file DATA object (fake/demo data).
- Hex map = NPR-style pointy-top cartogram, offset rows (odd rows +0.5 col), gold sequential fill scale. 50 states + DC.
- Giving societies: Advocate $1k / Patron $5k / Benefactor $10k / Leadership Circle $25k / Legacy Society $100k.
- Bug fixed: duplicate `donors` key (count vs table array) — array clobbered the count so the Donors KPI stringified the donor list. Table key renamed to `donorList`.
ntity, and the "small/volunteer-run" copy was an assumption; the card now spans both official associations with boards/501(c)(3) and individual class networks (reunion/giving). Generic "foundation" wording also cleared from the Endowment tier tagline and the early-access form.
4. **Associations are independent organizations** — copy reflects separate 501(c)(3) reality; dotted/solid university line throughout.
5. **Visual identity** — navy `#1A2B4C` + gold `#C99A2E`/`#D4A535` + cream; Cormorant Garamond (display) + Inter (body). Distinct from BigTopa orange, GatherAgain, GreekHouse. No `shared.css` dependency.
6. **Naming locked** — Chapter Hub Flow / Chapter Hub Connect (Hub Flow / Hub Connect = platform-level).
7. **Shared local stylesheet** — `assets/site.css` holds the vertical's design system (tokens, nav+dropdown, footer, helpers). Each page links it + a small page-specific `<style>` block — mirrors bigtopa-com's shared.css pattern, scoped to this vertical, with no bigtopa-com dependency. (Multi-page site made inlining everything 8× impractical.)
8. **Fit demonstration** — Monetization page shows an explicit on/off panel (donations highlighted; hourly billing & usage metering off for this market).

---

## Done since Stage 2

9. **Privacy & Terms** — `privacy.html` + `terms.html` built in the AlumniHub style and wired into every footer. **Template only** — both carry a visible "review with legal counsel" banner and `[bracketed]` placeholders (entity name, jurisdiction, contact, effective date, Stripe). Set `noindex`.
10. **Clean URLs** — `netlify.toml` now 301s `/:page.html` → `/:page` (force). Internal links keep `.html` so local `file://` preview works; live site serves canonical clean URLs. **Verify on first deploy** (Netlify pretty-URL serving).
11. **Marketing Fit subset** — locked: Email, SMS, Landing Pages, Form Builder, Social, Affiliate→peer-to-peer, Banners, Coupons on; Chat Bot off.
13. **Org-type refocus (Gabriel)** — class-by-class moved OUT of the high-school card and INTO Alumni Class Networks, which now spans **collegiate *and* high-school classes** (fundraising for their school + reunions). The high-school card became **"High School Alumni Organizations"** (chosen over "Associations" — more inclusive of both formal 501(c)(3) associations *and* less formal supporter groups). It covers the high-school *organization*, whether a formal association or a **collective of motivated supporters with a vision**. Page is `high-school-alumni-organizations.html`; the earlier `high-school-alumni.html` and interim `high-school-alumni-associations.html` are noindex redirect stubs, with 301s for all old slugs. The two "shapes" are Official association / Collective of supporters, with a cross-link to Alumni Class Networks for class-by-class.

12. **"University Alumni Associations" → "Collegiate Alumni Associations"** (Gabriel) — broader than "University," covers colleges + universities, pairs with the High School card by education level. Page renamed `university-alumni-associations.html` → `collegiate-alumni-associations.html`; old slug kept as a noindex redirect stub (sandbox can't delete it) plus server-side 301s in `netlify.toml`. On the host, the stub file can simply be deleted if preferred.

14. **Hero repositioned to the operator (Gabriel)** — the old H1 "Support the place that supported you" spoke to the *donor*, but the buyer is the person running the giving function. New hero: **"Nurture your community of givers."** with an operator subhead (engage alumni, nurture donors, run campaigns & events). The donor-facing line was *relocated* (not lost) to the closing CTA. Title tag updated to match. Giving-first preserved.

15. **Comparison page — approach-based, not named (Gabriel)** — added `why-alumnihub.html` ("Why us" in nav, "Why AlumniHub" in footer, teaser on home before pricing). Contrasts *approaches* (generic community platform · generic giving platform · point-tool stack · legacy advancement suite · AlumniHub) with a capability matrix — deliberately no named competitors pre-launch (substantiation/legal risk). Post-launch, add "AlumniHub vs [X]" pages on sourced data for comparison-intent SEO.

## Still open (need human sign-off)

1. **Pricing figures** — none shown anywhere. Need real price points before public launch.
2. **Legal review** — privacy/terms templates must be reviewed by counsel and all `[brackets]` filled before launch.
3. **Form backend** — early-access form is front-end only (confirmation state); needs wiring to a real endpoint.
4. **Deploy verification** — confirm clean-URL redirect behaves on Netlify; link the site in Netlify (base dir `alumnihub-co`).
5. **Git commit** — work is saved to the folder but not committed (sandbox can't write `.git`); commit/push from the host.

## Social / SEO metadata (OG + Twitter)
- Built brand OG image `assets/og-image.png` (1200×630) + source `assets/og-image.source.html` + AI gen prompt `assets/og-image-genprompt.md`.
- Wired full metadata into all 13 real pages: canonical (clean URLs), theme-color #1A2B4C, Open Graph (type/site_name/url/title/du/image+dims+alt), Twitter summary_large_image. og:title/description reuse each page's <title>/<meta description>.
- Fixed index.html: existing OG tags pointed to nonexistent assets/og.jpg → now assets/og-image.png, added image dims/alt + canonical + twitter:image:alt.
- noindex pages (privacy, terms, giving-dashboard) get OG/Twitter for nice share cards but no canonical.
- Redirect stubs (high-school-alumni, high-school-alumni-associations, university-alumni-associations) intentionally skipped.
- All pages share the one brand banner (standard practice); per-page OG variants not generated.
