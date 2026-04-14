# Claude Code Agent — Stylesheet Refactor Task

**Status:** Ready to execute
**Repo:** `C:\Users\gsbra\Documents\Apps\bigtopa-marketing\bigtopa-com\`
**Priority:** High — fixes AVG Browser blue color bug, establishes single source of truth

---

## Mission

Refactor `index.html`, `platform.html`, and `pricing.html` to use the shared stylesheet at `assets/shared.css`. Remove all duplicated CSS from their inline `<style>` blocks and replace inline `style=""` attributes with named CSS classes where possible.

Do **not** modify:
- `assets/shared.css` — source of truth, do not touch
- `how-it-works.html` — already refactored, use as reference
- `solutions.html` — already uses shared.css, do not touch

---

## Why This Matters

Every page currently embeds its entire design system in a `<style>` block (~300-400 lines). This causes:
1. **Blue buttons in AVG Browser** — browser overrides `var(--accent)` but cannot override `#E8621A !important` which is defined in shared.css
2. **Inconsistency** — changes must be made in 4 places
3. **Inline style sprawl** — the Solutions cards and hero sections use `style=""` on every element

---

## Step 1 — Add shared.css link to each file

Add this line in `<head>` **after** the Google Fonts link and **before** the Phosphor Icons script:

```html
<link rel="stylesheet" href="assets/shared.css">
```

---

## Step 2 — What shared.css already covers (delete from each page)

The following are defined in `shared.css` — remove any duplicates from the page `<style>` block:

- **All `:root` tokens** — `--ink`, `--ink2`, `--ink3`, `--edge`, `--rule`, `--rule2`, `--white`, `--muted`, `--hint`, `--accent`, `--accent2`, `--accentd`, `--teal`, `--violet`, `--lime`, `--green`, `--cream`, `--cream2`, `--creamed`, `--text-dark`, `--muted-dark`
- **Reset** — `*`, `a`, `html`, `body`
- **Typography helpers** — `.serif`, `.serif-i`
- **Nav** — `nav`, `.nav-i`, `.nav-logo`, `.nav-logo span`, `.nav-links`, `.nav-link`, `.nav-r`, `.nav-ghost`, `.nav-btn`, `.mob-toggle`, `.mob-drawer`, `.mob-nav-link`, `.mob-nav-cta`, `body.nav-open`
- **Layout** — `.section`, `.section-alt`, `.section-alt .section`, `.divider`, `.page-wrap`
- **Section labels** — `.sec-tag`, `.sec-rule`, `.eyebrow`, `.eyebrow-dot`
- **Headings** — `h1`, `h1 em`, `h2`, `h2 em`, `h3`, `.sec-lead`, `.sec-p`
- **Buttons** — `.btn-primary`, `.btn-acc`, `.btn-ghost`, `.btn-out`, `.btn-outline`, `.cta-row`
- **Footer** — `footer`, `.footer-i`, `.footer-logo`, `.footer-logo span`, `.footer-links`, `.footer-copy`
- **Cards** — `.card`, `.card:hover`, `.card-accent:hover`
- **Animations** — `.reveal`, `.reveal.in`, `.sr`, `.sr.in`, `.sr-d1`, `.sr-d2`
- **Fitz widget** — `.fitz-trigger`, `.fitz-panel`, `.fitz-header`, `.fitz-avatar`, `.fitz-name`, `.fitz-status`, `.fitz-close`, `.fitz-body`, `.fm`, `.fm.fitz`, `.fm.user`, `.fs-sugs`, `.fs-sug`, `.fitz-footer`, `.fs-inp-row`, `.fs-inp`, `.fitz-send`, `.fitz-powered`
- **Responsive nav/footer breakpoints** — `@media (max-width: 1024px)` and `@media (max-width: 600px)` for nav, section padding, footer

Keep **only** styles unique to that page's components.

---

## Step 3 — Replace inline style="" with named classes

For every element using `style=""`, extract the styles into named classes in the page's `<style>` block.

**Naming convention:**
- `idx-` prefix for index.html (e.g. `.idx-solution-card`, `.idx-hero-stat`)
- `plat-` prefix for platform.html (e.g. `.plat-space-detail`, `.plat-market-card`)
- `prc-` prefix for pricing.html (e.g. `.prc-plan-card`, `.prc-builder-panel`)

**Priority targets:**
- Section card grids built with inline styles on every element
- Icon wrappers (`style="width:44px;height:44px;border-radius:10px;"`)
- Color badge chips (`style="font-size:9px;padding:2px 6px;"`)
- The Solutions section 3-card grid in index.html

---

## Step 4 — Verify after each file

Open in browser and confirm:
- ✅ **Orange** nav button, headings `<em>`, eyebrow pill, CTA buttons, Fitz trigger
- ✅ No blue anywhere — if still blue, add `background: #E8621A !important` to that class
- ✅ Nav logo shows "BigTopa" with orange span
- ✅ Footer renders correctly
- ✅ All page-specific components intact

---

## Reference: Correct `<head>` structure

```html
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BigTopa — [Page Title]</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/shared.css">
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js"></script>
<style>
/* Page-specific styles ONLY — nothing that lives in shared.css */
</style>
</head>
```

---

## Target reduction ratio

Use `how-it-works.html` as the gold standard — already correctly refactored.

| File | Before | Target |
|------|--------|--------|
| `index.html` | ~400 lines CSS | ~200 lines |
| `platform.html` | ~350 lines CSS | ~150 lines |
| `pricing.html` | ~300 lines CSS | ~150 lines |

---

## Critical Rules

1. Do **not** modify `assets/shared.css`
2. Do **not** modify `how-it-works.html` or `solutions.html`
3. Keep all JavaScript unchanged
4. All href and image paths stay the same
5. Orange accent is `#E8621A` — hardcoded with `!important` in shared.css
6. Test after **each file**, not all three at once

---

## Git commit when done

```bash
cd C:\Users\gsbra\Documents\Apps\bigtopa-marketing
git add bigtopa-com/
git commit -m "refactor: extract shared.css, remove duplicated styles, replace inline styles with classes"
git push
```
