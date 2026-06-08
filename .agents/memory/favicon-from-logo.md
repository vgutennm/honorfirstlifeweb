---
name: Favicon regeneration from brand logo
description: How the site favicon is derived from the full logo lockup, including the emblem crop.
---

# Favicon regeneration

The browser favicon is the **shield/eagle emblem only**, cropped out of the full
`artifacts/web/public/honor-first-logo.png` lockup (1536x1024, which also contains
the "HONOR FIRST LIFE" wordmark + tagline). The wordmark is unreadable at favicon
size, so it must be excluded.

**Emblem crop** (ImageMagick v7, use `magick` not `convert`):
`magick honor-first-logo.png -crop 700x590+415+15 +repage out.png` then `-trim +repage`.
This isolates the shield without catching the text band below it.

**Generated set** (all in `artifacts/web/public/`, referenced from `artifacts/web/index.html`):
`favicon.ico` (16/32/48), `favicon-16x16.png`, `favicon-32x32.png`,
`apple-touch-icon.png` (180x180, white background via `-alpha remove`), `favicon.svg`.
Favicon PNG/ICO keep a transparent background; only apple-touch gets a white bg.

**Why:** finding the crop offset took trial and error (the first crop caught the
wordmark). Recording the exact crop avoids re-deriving it.

**How to apply:** after regenerating, run the web build
(`PORT=3000 BASE_PATH=/ pnpm --filter @workspace/web run build`) so the committed
`artifacts/web/dist/public/` — which the cPanel `.cpanel.yml` deploys — picks up the
new icons.
