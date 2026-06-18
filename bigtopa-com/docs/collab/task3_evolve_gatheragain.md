# Task 3 — Evolve GatherAgain.co — Enable Optional Ongoing Community

**Folder:** `bigtopa-marketing/gatheragain-co/`
**Approach:** Reposition the existing site to communicate that **higher tiers offer ongoing community** between events — without losing the core "reunion memory" value prop

---

## Goal

GatherAgain currently positions reunions as **episodic** — plan, execute, go dormant, wake up, rinse and repeat. The "reunion memory" feature is the core differentiator: previous attendee lists, budget history, venue notes, and photo galleries preserved between events.

This positioning is correct for the **base tier** (Reunion Starter). But higher tiers (Reunion Standard and Reunion Pro) unlock **Community Space** — enabling ongoing engagement between reunions for organizations that want it.

The site should reposition to:
1. **Keep the dormant-cycle reunion memory** as the entry-tier value (for casual/episodic reunion organizers)
2. **Introduce optional ongoing community** as a higher-tier capability (for large/annual/active reunion groups)
3. **Make the choice clear** — buyers who want only event memory can stay on Starter; buyers who want sustained engagement upgrade

---

## Context — What's Already Working

From the GatherAgain pricing tier screenshot referenced in this handoff:

**Reunion Starter (Tier 1):**
- 1 Event Space, up to 100 attendees
- Streams, Rooms, Messages, Shelf, Participants, Dashboard
- Photo Album, Events extensions
- 10 meetup hours/month
- Ticketing
- 5 GB storage

**Reunion Standard (Tier 2):**
- + Community Space (unlimited members)
- + Unlimited Community Spaces
- + Blog, FAQ extensions
- + Meetings, 50 meetup hours/month
- + Up to 500 Participant Quota
- + Shop (POD + Digital)
- 25 GB storage

**Reunion Pro (Tier 3):**
- + Unlimited Event Spaces, unlimited attendees
- + Social Feed extension
- + Unlimited meetup hours
- 100 GB storage

**Key observation:** Community Space first appears in Tier 2 (Reunion Standard). The site copy currently doesn't surface this — it positions the entire product as event-only.

---

## What Must Change

### Hero — Add the dual-mode framing

The current hero implicitly assumes episodic reunions. Update to communicate both modes:

**Option A — Choice-forward:**
> *Plan the reunion. Build the community. Or both.*
> *GatherAgain handles your once-a-year reunion — and your ongoing group between events, if you want it.*

**Option B — Lifecycle-forward:**
> *Every reunion has a lifecycle. Plan it. Execute it. Stay connected — if you want to. Or just go dormant until next time.*

**Option C — Segment-aware:**
> *Family reunions. Class reunions. Military reunions. Plan the next event — and keep the group alive between them.*

### New section: Two ways to use GatherAgain

Add a section that explicitly shows the two modes:

**Mode 1 — Reunion memory (episodic)**
- Plan a reunion, execute it, go dormant, wake up next time
- Preserved: attendee lists, budgets, photos, venue notes
- Perfect for: family reunions, class reunions that happen every 5–10 years

**Mode 2 — Ongoing community (active)**
- Reunion + community space that stays alive between events
- Member directory, discussions, photo sharing, announcements
- Perfect for: large active alumni groups, annual reunion organizations, military units with strong identity

Make it clear: **Mode 2 is unlocked on higher tiers — you can start with Mode 1 and grow into Mode 2.**

### Update the lifecycle messaging

Current positioning: *"Plan → Execute → Go dormant → Wake up → Rinse & repeat forever."*

Updated: *"Plan → Execute → Stay connected (or go dormant) → Welcome the next reunion → Repeat — your way."*

Subtle but important. The lifecycle stays accurate for Mode 1, but Mode 2 users don't go dormant — they stay engaged.

### Pricing section — Surface Community Space

When showing the three tiers, explicitly highlight where Community Space unlocks:

- **Reunion Starter:** Event-only — perfect for episodic reunions with memory preserved between events
- **Reunion Standard:** Adds Community Space — keep your group connected between reunions
- **Reunion Pro:** Unlimited everything — for large active reunion organizations

### Use case differentiation

Currently the site treats family reunions, class reunions, and military reunions as the same use case with the same lifecycle. Update to acknowledge:

| Use Case | Typical Mode | Why |
|----------|-------------|-----|
| Family reunions (small) | Mode 1 — episodic | Annual or biennial event, limited between-event interaction |
| Class reunions | Mode 1 or Mode 2 | Most are episodic; large reunions with active class agents want Mode 2 |
| Military reunions | Often Mode 2 | Strong identity, ongoing brotherhood, year-round engagement |
| Active alumni groups | Mode 2 | Ongoing fundraising, communication, events — the upgrade path |

---

## What Must NOT Change

- **Keep "reunion memory" as the core value prop** — it remains the differentiator vs. Eventbrite or Mailchimp
- **Keep "no more handling thousands of dollars without transparency"** — financial transparency is critical for reunion organizers
- **Keep family, class, and military reunions as the three core segments**
- **Do not reposition GatherAgain as a community platform** — it's a **reunion platform with optional community**
- **Keep the existing tier names** — Reunion Starter, Reunion Standard, Reunion Pro
- **Do not modify `greekhouse-io/`** as part of this work

---

## Important Distinction

GatherAgain ≠ AlumniHub.

GatherAgain handles the **event** — the reunion itself, ticketing, attendee management, budget.
AlumniHub handles the **institutional giving** — class gifts, scholarship funds, annual campaigns.

There's overlap (an alumni reunion class agent could use both). The new GatherAgain copy should not stray into fundraising-platform territory. Keep it focused on the reunion event with optional ongoing community.

---

## Acceptance Criteria

- [ ] Hero updated to communicate dual-mode (episodic OR ongoing)
- [ ] New "Two ways to use GatherAgain" section added
- [ ] Lifecycle messaging updated
- [ ] Pricing section explicitly notes Community Space unlocking on Tier 2+
- [ ] Use case differentiation table or section added
- [ ] "Reunion memory" remains the core differentiator
- [ ] Financial transparency messaging preserved
- [ ] Mobile responsive
- [ ] No broken links or CTAs

---

## Reference Files

1. **`bigtopa-marketing/gatheragain-co/index.html`** — Current version
2. **GatherAgain pricing screenshot** (referenced in handoff) — Source of tier composition
3. **`bigtopa-marketing/bigtopa-com/how-it-works.html`** — Reference for the Community Space description
4. **`bigtopa-marketing/HANDOFF.md`** — Original monorepo setup notes
5. **`bigtopa-marketing/bigtopa-com/docs/collab/00_HANDOFF_OVERVIEW.md`** — Brand voice rules

---

## Open Questions to Surface

1. Final hero copy direction — Option A, B, or C from above
2. Should the use case differentiation be a separate section or integrated into the hero/pricing
3. Whether to add a "How active is your group?" interactive quiz that recommends Starter vs Standard vs Pro
4. Pricing page integration — should the site link out to BigTopa.com/pricing or have its own pricing page

---

## Critical Constraint

This task is the highest risk for brand drift because it changes positioning. **Stay conservative.** GatherAgain's identity is strong — the goal is to **expand** what the site says GatherAgain can do, not to redefine what GatherAgain is. If a copy change feels like it's making GatherAgain into a community platform first, pull back.

The line is: **"reunion platform with optional ongoing community"** — never reversed to "community platform with reunions."
