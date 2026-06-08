---
name: cPanel static deploy
description: How this site is published to cPanel hosting (separate from Replit deploy).
---

# cPanel static deploy

The public site is a fully static Vite SPA (no runtime API calls — lead capture is
an external CRM iframe, analytics are client-side only). It can therefore be hosted
on plain Apache/cPanel static hosting.

**Mechanism:** cPanel Git Version Control clones the GitHub repo, then runs the
root `.cpanel.yml` which copies the **pre-built** `artifacts/web/dist/public/`
contents into the domain document root (`public_html`).

**Key decisions / why:**
- Pre-built (committed `dist`) instead of build-on-server, because shared cPanel
  hosting can't reliably run a pnpm monorepo build. So `dist` is force-un-ignored
  in root `.gitignore` for `artifacts/web/dist/**`.
- Build for cPanel uses `BASE_PATH=/` (root domain), producing root-relative asset
  paths (`/assets/...`). The Replit preview build uses a different BASE_PATH.
- `artifacts/web/public/.htaccess` provides the SPA fallback rewrite (every path →
  `index.html`) so deep links like `/terms` work on direct load.

**How to apply — publishing a change to cPanel:**
1. `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/web run build`
2. User commits + pushes from Replit Git pane.
3. In cPanel: Git Version Control → Manage → Pull or Deploy → Update from Remote →
   Deploy HEAD Commit. (No auto-deploy on push exists for cPanel.)

This is independent of the Replit deployment (`honor-first-life.replit.app`), which
republishes separately.
