---
name: CRM quote-form iframe embed cropping
description: Why the landing-page CRM iframe is cropped with negative margins per breakpoint, and the limits of that approach
---

The landing page (`artifacts/web/src/pages/landing.tsx`, `#form-section`) embeds an external CRM quote form via iframe. That CRM is a SEPARATE Replit app — it is NOT in this workspace and cannot be edited from here.

The embed renders a rounded card floating on a slate body (`rgb(249,248,246)`) with padding, and the body is `min-h-screen` so the card vertically centers at some widths. To make it look edge-to-edge we crop the iframe from outside: a wrapper `div` with `overflow-hidden rounded-xl`, and the iframe gets negative `-mt` (crop top past slate padding + card corner radius ~24px so navy fills the top corners) and `-ml`/oversized width (crop slate side padding), plus a fixed per-breakpoint `h-[...]` chosen to end right at the card bottom (kills the slate gap below the Continue button).

**Why per-breakpoint heights/crops:** card height varies with iframe inner width (narrower column = taller card). Each breakpoint height must fit the TALLEST case in its range or the Continue button gets clipped; wider screens in the range then show a little slate. Measured anchors (step 1): mobile ~402 continueBottom ~669; tablet ~820 continueBottom ~597; lg narrow col @1024 continueBottom ~617 (tallest desktop case); @1280 continueBottom ~585.

**Hard limit / do not chase perfection:** because the card self-centers and resizes, no static crop is pixel-perfect at every width — odd in-between window sizes can still show a thin slate sliver or faint corner. The only true fix is the CRM posting its content height via `postMessage` (iframe auto-resize), which requires editing the CRM app. If the user wants it perfect everywhere, offer to do it there.

**Gotchas:** do NOT set `scrolling="no"` — it clips the taller step 2. Verify changes visually with screenshots at 402/820/1024/1280 (the testing/runTest agent often omits raw numeric values from its summary unless you demand a single explicit `LABEL: {json}` output line, and even then keep it to ~2 widths per run).
