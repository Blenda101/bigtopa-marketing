# Task 1 — Create AlumniHub.co Vertical Site

**Domain:** `alumnihub.co`
**Folder:** `bigtopa-marketing/alumnihub-co/` (NEW — does not exist yet)
**Pattern:** Follow `greekhouse-io/` and `gatheragain-co/` as structural templates

---

## Goal

Build a new vertical marketing site for **AlumniHub** — a BigTopa-powered platform for alumni associations focused primarily on **fundraising and institutional support**, with social connection as a secondary benefit.

The site should be independently branded with its own identity, copy, and use cases — only connection to BigTopa is a "Powered by BigTopa" badge in the footer.

---

## Vertical Positioning

**Market:** Alumni associations for universities, HBCUs, colleges, and high schools.

**NOT to confuse with:** Greek chapter alumni associations (those are covered by GreekHouse). AlumniHub is for institutional alumni networks — class-year-based or graduating-school-based.

**Primary user:** Volunteer fundraising organizer
- Class gift chair
- Alumni giving coordinator
- Booster club president
- Annual fund volunteer
- Reunion class agent (with giving focus)

**Beneficiary:** The educational institution (receives the funds raised)

**Core activities:**
- Class gift campaigns
- Annual fund drives
- Scholarship fundraising
- Reunion giving (note: GatherAgain handles the reunion event itself; AlumniHub handles the institutional giving)
- Booster club coordination (athletics, arts, band)
- Endowment and legacy giving

**Positioning hook (working — refine as needed):**
> *"Support the place that supported you."*
> *"Where alumni come together to give back."*

---

## What the Site Must Communicate

1. **This is a platform for organized alumni giving** — not networking, not reunions
2. **The institution is the beneficiary** — copy should reinforce institutional connection and pride
3. **Volunteer organizers are the buyer** — they need tools to coordinate campaigns, track donors, communicate with classes
4. **Three tiers, branded for this market** — see Tier Strategy below
5. **Multi-class / multi-cohort support** — different graduating classes run independent campaigns under one organization
6. **Financial transparency** — donors need to see where money goes; organizers need accountability tools
7. **Powered by BigTopa** — small footer badge, links back to bigtopa.com

---

## Tier Strategy (Branded for AlumniHub)

Recommended branded tier names (pick one set or propose alternative):

**Option A — Donor language:**
| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| Advocate | Benefactor | Legacy |

**Option B — Campaign language:**
| Tier 1 | Tier 2 | Tier 3 |
|--------|--------|--------|
| Annual | Campaign | Endowment |

**My recommendation:** Option B (Annual / Campaign / Endowment) — speaks the language of the fundraising profession directly.

**Tier composition pattern (mirror GatherAgain structure):**
- Tier 1 (Annual) — single class/campaign, basic giving, ticketing for one event, limited storage
- Tier 2 (Campaign) — multiple classes/campaigns, recurring giving, Shop (alumni merch), donor management
- Tier 3 (Endowment) — unlimited campaigns, full reporting suite, planned giving tools, broadcasting for galas

Note: do not lock entitlements in detail yet. The handoff explicitly states tier composition can evolve.

---

## Site Structure

Reference `gatheragain-co/index.html` and `greekhouse-io/index.html` for the section pattern. Both are single-page sites with these sections (adapt for AlumniHub):

1. **Hero** — Tagline + hero visual + primary CTA
2. **Problem** — What alumni associations struggle with today (spreadsheets, multiple tools, no donor visibility, fragmented class communication)
3. **What it does** — Three or four core capabilities (Run campaigns, Track donors, Engage classes, Manage events)
4. **Org types served** — University alumni, HBCU alumni, high school alumni, booster clubs
5. **Tiers / Pricing** — Three branded tiers
6. **CTA / Request Early Access** — Email capture, "Get notified when we launch"
7. **Footer** — Powered by BigTopa badge

---

## Suggested Hero Copy (refine)

**Hero H1 options:**
> *Support the place that supported you.*
> *Where alumni come back to give back.*
> *Your school. Your class. Your legacy.*

**Hero sub options:**
> *AlumniHub is the platform for organized alumni giving. Run class gift campaigns, manage donor relationships, and rally your fellow alumni to support the institution that made you.*
> *From class agents to booster clubs to alumni foundations — AlumniHub gives your fundraising team the tools to organize, communicate, and deliver impact.*

**Primary CTA:** *Request Early Access*
**Secondary CTA:** *See how it works*

---

## Design Direction

Each vertical site is independently branded — AlumniHub should not look identical to bigtopa-com, gatheragain-co, or greekhouse-io.

**Suggested palette direction:**
- Dignified, institutional feel (think university brand systems)
- Deep navy + warm gold accent — alternative to BigTopa's orange
- Consider: `#1A2B4C` (navy) + `#D4A535` (gold) + cream/off-white surface
- Serif headings (institutional) — `Cormorant Garamond` or `Crimson Pro` instead of DM Serif Display
- Sans for body — `Inter` or `DM Sans` both work

**Do not:** copy BigTopa.com's orange theme exactly. AlumniHub needs its own visual identity.

**Do:** use the BigTopa-powered footer badge from `bigtopa-com/assets/` if you can find it, or create a consistent badge.

---

## Domain Verticals Within AlumniHub

The site should make clear AlumniHub serves multiple alumni org types (similar to how GreekHouse serves undergraduate chapters, alumni associations, and graduate chapters):

| Org Type | Description | Primary Hook |
|----------|-------------|--------------|
| University Alumni Associations | Multi-class, large-scale alumni giving | Coordinate campaigns across decades of classes |
| HBCU Alumni Networks | Strong class identity + institutional pride | Honor the legacy. Build the future. |
| High School Alumni Foundations | Smaller, tight-knit, often booster-driven | Where every class gives back |
| Booster Clubs | Athletics, arts, band — focused fundraising | Power the programs you love |

---

## Acceptance Criteria

- [ ] New folder created: `bigtopa-marketing/alumnihub-co/`
- [ ] `index.html` built as a single-page site
- [ ] `netlify.toml` created matching the pattern in `gatheragain-co/netlify.toml`
- [ ] Site has its own distinct visual identity (NOT BigTopa orange)
- [ ] All 7 sections present (Hero through Footer)
- [ ] Three branded tiers shown
- [ ] At least 3 alumni org types featured
- [ ] "Powered by BigTopa" footer badge linking to bigtopa.com
- [ ] Email capture form for early access
- [ ] Mobile responsive (test at 600px, 1024px breakpoints)
- [ ] Site assets in `alumnihub-co/assets/` — no dependencies on bigtopa-com assets
- [ ] Payment method icons used from `shared/assets/icons/` if relevant (per monorepo HANDOFF.md)

---

## Reference Files to Read Before Starting

1. **`bigtopa-marketing/HANDOFF.md`** — Monorepo structure, Netlify deployment pattern
2. **`bigtopa-marketing/gatheragain-co/index.html`** — Vertical site pattern reference
3. **`bigtopa-marketing/greekhouse-io/index.html`** — Vertical site pattern reference
4. **`bigtopa-marketing/bigtopa-com/how-it-works.html`** — Tone and voice reference for BigTopa principles
5. **`bigtopa-marketing/bigtopa-com/docs/collab/00_HANDOFF_OVERVIEW.md`** — Brand voice, voice rules, tier strategy

---

## Open Questions to Surface (Not Decide Alone)

1. Final tier names — Annual/Campaign/Endowment vs Advocate/Benefactor/Legacy
2. Whether to position separately for university vs high school alumni, or unified
3. Should AlumniHub integrate with GatherAgain for reunion-giving overlap? (likely yes in future, not v1)
4. Booster club inclusion — is that AlumniHub's mandate or a separate vertical (BoostHouse)?

Document any decision you have to make autonomously in a `decisions_made.md` file inside `alumnihub-co/`.
