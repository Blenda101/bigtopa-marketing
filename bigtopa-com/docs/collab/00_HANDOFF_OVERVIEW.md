# Cowork Handoff — BigTopa Marketing Sites Evolution

**Date:** June 2026
**Repo:** `C:\Users\gsbra\Documents\Apps\bigtopa-marketing\`
**GitHub:** `Blenda101/bigtopa-marketing` (public, `main` branch)
**Deployment:** Netlify (each site deploys independently with custom domain)

---

## What This Handoff Covers

Three parallel work streams across the BigTopa marketing monorepo:

| Task | Brief | Scope |
|------|-------|-------|
| 1 | `task1_create_alumnihub.md` | Build new vertical site at `alumnihub.co` |
| 2 | `task2_evolve_bigtopa_com.md` | Restructure BigTopa.com to add Monetization + Marketing focus (new version for A/B test, not replacement) |
| 3 | `task3_evolve_gatheragain.md` | Reposition GatherAgain to enable optional ongoing community on higher tiers |

Each task brief is self-contained. Read this overview first, then the task brief for whichever stream you're working on.

---

## Critical Context You Need

### What is BigTopa?

BigTopa is a multitenant SaaS platform for **virtual collaboration spaces** — adaptive virtual spaces where organizations can engage their team, members, audience, and clients all in one unified platform.

### The Three Brand Principles

**Fit · Flow · Unified Engagement** — these are the core marketing concepts that should appear in any new BigTopa marketing content.

1. **Unified Engagement** — One platform for every engagement relationship (team, members, audience, clients). Not four separate tools.
2. **Fit** — The platform adapts to the organization. Composable entitlements, not rigid tiers. *"Your organization is unique. Your platform should be too."*
3. **Flow** — Content and revenue move naturally between Rooms → Spaces → Hub. Revenue flows up, settings flow down, participants move freely.

These three principles are already well-articulated on the existing BigTopa.com site (`bigtopa-com/how-it-works.html` is the gold standard). Reference that page for tone and copy patterns.

### The Four Space Types

| Space Type | For Whom | Example |
|-----------|---------|---------|
| Work Space | Your team | Internal collaboration, project rooms |
| Community Space | Your members | Member engagement, community discussions |
| Event Space | Your audience | Ticketed events, in-person + virtual |
| Provider Space | Your clients | One-on-one consultation, managed services |

---

## Repo Structure

```
bigtopa-marketing/                  ← MONOREPO
├── .gitignore                      ← excludes _build/
├── HANDOFF.md                      ← original monorepo handoff (read for Netlify setup)
├── shared/
│   └── assets/
│       └── icons/                  ← 8 SVG payment badges (single source of truth)
├── bigtopa-com/                    ← Main platform site (Task 2)
│   ├── index.html
│   ├── platform.html
│   ├── how-it-works.html           ← GOLD STANDARD — uses shared.css, no inline duplication
│   ├── solutions.html
│   ├── pricing.html                ← still old, not refactored
│   ├── assets/
│   │   ├── shared.css              ← SINGLE SOURCE OF TRUTH for design system
│   │   ├── BigTopa_logo_org.svg
│   │   └── logo_only.svg
│   ├── backup/                     ← old blue site, archived
│   ├── docs/collab/                ← this folder
│   └── netlify.toml
├── greekhouse-io/                  ← Greek life vertical (existing, do not modify in this work)
│   ├── index.html
│   └── netlify.toml
├── gatheragain-co/                 ← Reunions vertical (Task 3)
│   ├── index.html
│   └── netlify.toml
└── [alumnihub-co]/                 ← NEW — Task 1 creates this folder
```

---

## Design System — shared.css

The file `bigtopa-com/assets/shared.css` is the design system source of truth for BigTopa.com. Tokens, nav, footer, buttons, typography helpers, Fitz widget — all defined once.

**Critical rule:** Orange accent (`#E8621A`) is hardcoded with `!important` on key buttons and nav items because some browsers (notably AVG Browser) override `var(--accent)` with their own blue. The `!important` is intentional — do not remove.

For new pages on BigTopa.com or AlumniHub, follow the pattern in `how-it-works.html`:
- `<link rel="stylesheet" href="assets/shared.css">` in `<head>`
- Small inline `<style>` block for page-specific component styles only
- No duplicating nav, footer, button styles
- No inline `style=""` attributes except for one-off color overrides

---

## Tier Strategy (Reference)

GatherAgain pricing already uses a 3-tier structure with branded names:
- Reunion Starter
- Reunion Standard
- Reunion Pro

This pattern carries forward across all four products. Tier composition includes:
- **Spaces** (which space types and limits)
- **Meetups** (meeting hours, depth: Meet → Meetings → Webinars → Broadcast)
- **Extensions** (Photo Album, Events, Blog, FAQ, Social Feed, etc.)
- **Monetization** (Ticketing, Shop, POD, Digital)
- **Other** (storage)

Tier 2 typically introduces Community Space (relevant to Task 3) and Shop. Tier 3 unlocks unlimited everything.

**Generic tier names (BigTopa.com):** Starter / Foundation / Growth — or a circus/astronomy theme if a more branded direction is desired. See `tier_brainstorm.md` for full ideation.

**Branded market tiers:**
- BigTopa: TBD (consider Starter / Foundation / Growth)
- GatherAgain: Reunion Starter / Reunion Standard / Reunion Pro (already in place)
- GreekHouse: TBD (consider Chapter / House / Legacy or Pledge / Brother / Elder)
- AlumniHub: TBD (consider Advocate / Benefactor / Legacy or Annual / Campaign / Endowment)

---

## Domain Verticals — Current and Planned

| Product | Domain | Status |
|---------|--------|--------|
| BigTopa | bigtopa.com | Live (this restructure work) |
| GreekHouse | greekhouse.io | Live |
| GatherAgain | gatheragain.co | Live |
| AlumniHub | alumnihub.co | NEW — Task 1 |
| FaithGather | TBD | Future |
| AssocHub | TBD | Future |
| CreatorSpace | TBD | Future |

---

## Brand Voice & Tone

- **Confident but warm** — declarative, not salesy
- **Reader-centered** — "Your team. Your members. Your audience." not "We help you..."
- **Active voice** with intentional passive flourishes for rhythm
- **Three-word taglines work well** — "One platform. Built to adapt."
- **Em dashes for breath** — used liberally between thoughts
- **Italics in headings** for emphasis — wrap key phrases in `<em>` for orange accent

Tone reference: read the hero section of `bigtopa-com/how-it-works.html` and the Solutions section of `bigtopa-com/solutions.html` for the established voice.

---

## What You Should NOT Do

1. **Do not modify `assets/shared.css`** — it's stable and tested across all BigTopa.com pages
2. **Do not modify `how-it-works.html` or `solutions.html`** — these are reference templates, treat as read-only unless updating them is in the task brief
3. **Do not modify `greekhouse-io/`** unless explicitly in the task brief
4. **Do not change the existing BigTopa.com `index.html`** — Task 2 creates a NEW version for A/B testing, original stays in place
5. **Do not introduce new design tokens or fonts** — `DM Serif Display` (italic) for display, `DM Sans` for body, `#E8621A` for accent

---

## Working Pattern

Each task brief is structured the same way:
1. **Goal** — what you're delivering
2. **Context** — what to read before starting
3. **Specification** — what to build
4. **Acceptance criteria** — how to know you're done
5. **Reference materials** — files to reference in the repo

Read the task brief carefully. Reference materials in the brief point you at the specific files that contain the design language, copy patterns, and component examples you need.

---

## Questions or Blockers

If anything in a task brief is unclear or you hit a decision that isn't covered, document the question and your proposed answer at the bottom of the relevant task brief. Don't guess on brand-defining choices (tier names, hero copy, etc.) — surface them.

---

*This handoff replaces dependence on prior chat context. Everything Cowork needs to deliver these three tasks is in this folder and the referenced repo files.*
