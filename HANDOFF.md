# Bigtopa Marketing Monorepo — Handoff

## What this is
Marketing monorepo for BigTopa brand sites. Currently holds two sites:
- **GreekHouse.io** — Greek life platform
- **GatherAgain.co** — Reunion planning

5 more sites planned (7 total). Monorepo exists for operational sanity — one repo, one git history, one VSCode window.

## What was built this session

### Repo structure (local + GitHub)
```
bigtopa-marketing/
├── .gitignore                        ← excludes _build/
├── shared/
│   └── assets/
│       ├── icons/                    ← 8 SVG payment badges (single source of truth)
│       └── badges/.gitkeep          ← placeholder for future app badges
├── greekhouse-io/
│   ├── index.html                    ← img src="../shared/assets/icons/..."
│   └── netlify.toml                  ← build step merges site + shared icons into _build/
└── gatheragain-co/
    ├── index.html                    ← img src="../shared/assets/icons/..."
    └── netlify.toml                  ← same build step
```

### netlify.toml (same in both site dirs)
```toml
[build]
  command = "mkdir -p _build/shared/assets && cp -r . _build/ && cp -r ../shared/assets/icons _build/shared/assets/icons"
  publish = "_build"
```
**Why:** `../shared/assets/icons/` paths in HTML work locally (browser resolves up the file tree). For Netlify, the build step copies shared icons into `_build/shared/assets/icons/` so Netlify can serve them at the correct URL.

### GitHub
- Repo: `Blenda101/bigtopa-marketing` (public, `main` branch)
- Pushed and live

### MCP / tooling
- Netlify MCP (`@netlify/mcp`) configured in `~/.claude.json` under `NETLIFY_PERSONAL_ACCESS_TOKEN`
- GitHub CLI authenticated as `gabebraun` (who owns the `Blenda101` org)

## What's NOT done yet

### 1. Netlify — migrate both sites to new repo
Each site needs to be re-linked in Netlify:

| Site | Old repo | New repo | Base directory |
|------|----------|----------|---------------|
| greekhouse.io | Blenda101/greekhouse-io | Blenda101/bigtopa-marketing | `greekhouse-io` |
| gatheragain.co | Blenda101/gatheragain-com | Blenda101/bigtopa-marketing | `gatheragain-co` |

Build command and publish directory come from `netlify.toml` — leave those blank in Netlify dashboard.

### 2. Verify live sites after deploy
Both sites should render correctly, including the payment method icons.

### 3. Archive old repos
Once migration confirmed, archive (not delete) on GitHub:
- `Blenda101/greekhouse-io`
- `Blenda101/gatheragain-com`

---

## Next session prompt

Paste this into Claude Code in the `bigtopa-marketing` VSCode window:

---

> I'm continuing a monorepo migration. Context is in HANDOFF.md at the repo root — please read it first.
>
> The local repo and GitHub (`Blenda101/bigtopa-marketing`) are done. What's left is Netlify:
> - Re-link greekhouse.io from `Blenda101/greekhouse-io` → `Blenda101/bigtopa-marketing`, base dir = `greekhouse-io`
> - Re-link gatheragain.co from `Blenda101/gatheragain-com` → `Blenda101/bigtopa-marketing`, base dir = `gatheragain-co`
> - Trigger deploys and confirm both sites are live and rendering correctly
> - Then archive the two old repos on GitHub
>
> **Tools available to you:**
> - **Netlify MCP** (`@netlify/mcp`) — configured in `~/.claude.json`. Use the `mcp__netlify__*` tools to read and update site settings, trigger deploys, check deploy status.
> - **GitHub CLI** (`gh`) — authenticated as `gabebraun`, who owns the `Blenda101` org. Use it to archive the old repos once migration is confirmed.
>
> Please proceed.
