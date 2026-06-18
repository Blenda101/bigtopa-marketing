# Task 2 — Evolve BigTopa.com — Add Monetization + Marketing Focus

**Folder:** `bigtopa-marketing/bigtopa-com/`
**Approach:** NEW version of index for A/B testing — NOT replacing original

---

## Goal

The current `bigtopa-com/index.html` positions BigTopa primarily around **Engagement** ("Every way your organization engages"). The platform actually offers three product pillars:

1. **Engagement** — Spaces, Streams, Meetups (current focus)
2. **Monetization** — Ticketing, dues, donations, shop, print-on-demand (Core Module)
3. **Marketing** — Email, landing pages, registration forms, social, affiliates (Core Module)

The new version should give Monetization and Marketing equal weight in the IA, hero, and section order. This is a **restructure, not a rewrite** — keep the core principles (Fit, Flow, Unified Engagement) intact but expand the story to make BigTopa's full product surface visible.

**Critical:** Build this as a new file (e.g. `index-v2.html` or `index-engagement-monetization.html`) so we can A/B test against the original. Do not delete or overwrite the current `index.html`.

---

## Context — Why This Matters

Looking at the reference screenshot showing GatherAgain's pricing tiers, the platform's value beyond engagement is significant:

- **Tier 1 (Reunion Starter):** Event Space, Ticketing, Photo Album extension
- **Tier 2 (Reunion Standard):** Community Space, Shop, Print on Demand, Digital products
- **Tier 3 (Reunion Pro):** Unlimited everything, Social Feed

Monetization unlocks at every tier. Marketing tools (registration, forms, social scheduling) are also broadly available. The current BigTopa.com hides these capabilities behind the engagement story — buyers researching "donation platform" or "membership management" or "creator monetization" don't find their need addressed.

---

## What Must Change in the New Version

### Hero
The current hero subhead says:
> *Your team collaborates. Your members connect. Your audience attends. Your clients are consulted.*

This is engagement-only. The new hero should expand the value to span all three pillars. Options:

**Option A — Three-pillar declaration:**
> *Engagement that brings them in. Monetization that funds your mission. Marketing that grows it. One platform — built to adapt.*

**Option B — Activity-led:**
> *Run events. Build community. Collect dues. Sell merch. Send campaigns. All in one platform, configured for how your organization actually works.*

**Option C — Outcome-led:**
> *More than engagement. BigTopa unifies how you reach people, how you monetize them, and how you grow — without bolted-on tools or migration projects.*

### New section: Three Pillars

Add a section after the hero that introduces all three product pillars side-by-side:

| Engagement | Monetization | Marketing |
|------------|--------------|-----------|
| Spaces, Streams, Meetups | Tickets, dues, donations, shop | Email, landing pages, forms, social |
| The how people interact | The how revenue flows | The how you grow |

Each pillar should link deeper into the platform or how-it-works page.

### Section reordering

Current section order:
1. Hero
2. Problem (fragmented tools)
3. Spaces (engagement-focused)
4. Fit
5. Flow
6. Verticals
7. Solutions
8. CTA

New section order:
1. Hero (three-pillar messaging)
2. **Three Pillars introduction** (new — Engagement, Monetization, Marketing)
3. Problem (expanded to include "monetization tools that don't talk to engagement tools" and "marketing tools that don't see your members")
4. **Unified Engagement** (spaces — keep but reframe)
5. **Unified Monetization** (new section — Ticketing, dues, donations, shop, POD all in one)
6. **Unified Marketing** (new section — Email, landing pages, forms, social scheduling all in one)
7. Fit (entitlement composition)
8. Flow (information + revenue flow)
9. Solutions (three paths)
10. Verticals
11. CTA

### Existing screenshot of pricing (refer to in handoff folder)

The GatherAgain pricing screenshot referenced in this work shows how monetization is composed at each tier. Use this as evidence of what BigTopa's monetization capabilities include — even though the new version doesn't show pricing, it should reference what's available:

- **Monetization Core:** Ticketing, Dues, Donations, Shop, Print on Demand (Printify), Digital products
- **Marketing Core:** Email campaigns, Landing pages, Registration & RSVP forms, Social scheduling, Affiliate referrals

---

## What Must NOT Change

- **Keep `assets/shared.css` as the design system** — no new CSS files
- **Keep the orange accent color `#E8621A`** — do not introduce a new accent
- **Keep Fit, Flow, Unified Engagement language** — these are core to the brand
- **Keep the four space types** — Work, Community, Event, Provider
- **Keep Fitz** — the AI plan assistant should remain in the new version
- **Keep all CTAs pointing to `pricing.html?view=custom` for plan builder** and `pricing.html` for standard tiers
- **Do not delete `index.html`** — the new version must be a separate file for A/B testing

---

## Filename Convention

Suggested: `index-v2.html` — clear that it's the alternative version. Netlify can serve both. The A/B test routing happens externally (Netlify split testing or DNS).

Alternatively, place the new version in a subfolder: `bigtopa-com/v2/index.html`.

Confirm filename approach with stakeholder before committing.

---

## Acceptance Criteria

- [ ] New file created (filename TBD per above)
- [ ] Original `index.html` unmodified
- [ ] New file uses `assets/shared.css` — no duplicated tokens or styles
- [ ] Hero communicates all three pillars (Engagement, Monetization, Marketing)
- [ ] Three Pillars section added after hero
- [ ] New Monetization section added
- [ ] New Marketing section added
- [ ] Fit, Flow, Unified Engagement language preserved
- [ ] Mobile responsive (1024px and 600px breakpoints tested)
- [ ] All anchor links and CTAs work
- [ ] Fitz widget present and functional
- [ ] No introduction of new CSS files or design tokens

---

## Reference Files

1. **`bigtopa-com/index.html`** — Current version, read to understand what's being evolved
2. **`bigtopa-com/how-it-works.html`** — Gold standard for tone, voice, and shared.css usage
3. **`bigtopa-com/solutions.html`** — Tone reference + Solutions section pattern
4. **`bigtopa-com/assets/shared.css`** — Design system source of truth
5. **`bigtopa-com/docs/collab/00_HANDOFF_OVERVIEW.md`** — Brand voice rules
6. **GatherAgain pricing screenshot** (referenced in this work) — Evidence of Monetization composition by tier

---

## Open Questions to Surface

1. Filename — `index-v2.html` vs `v2/index.html` subfolder
2. Final hero copy direction — Option A, B, or C from above
3. Whether to commission new hero imagery for Monetization and Marketing sections (currently placeholder)
4. Should the existing Spaces section be retained as "Unified Engagement" or restructured into the new section flow
