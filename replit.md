# Honor First Life

A mobile-first veteran-focused final-expense / life insurance lead generation website. The landing page embeds an external CRM lead form (via iframe); the site itself is a compliant marketing front-end with legal pages and SEO. Lead capture, storage, and management are handled entirely by the external CRM — there is no longer an in-app form, lead database, or admin dashboard.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (health endpoint only)
- `pnpm --filter @workspace/web run dev` — run the web frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `DATABASE_URL` — Postgres connection string (the db client still initializes it; no app tables are currently defined)
- `SESSION_SECRET`, `ADMIN_PASSWORD` — legacy secrets, no longer used by the app.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web: React + Vite, wouter routing, shadcn/ui, React Query
- API: Express 5, pino logging
- DB: PostgreSQL + Drizzle ORM (no app tables defined)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- API contract: `lib/api-spec/openapi.yaml` (health endpoint only; re-run codegen after edits)
- Generated hooks/schemas: `@workspace/api-client-react`, `@workspace/api-zod`
- DB schema (source of truth): `lib/db/src/schema/` (currently empty)
- API routes: `artifacts/api-server/src/routes/` (`health.ts`)
- Frontend pages: `artifacts/web/src/pages/` (landing, legal pages, not-found)
- Landing page CRM embed: `artifacts/web/src/pages/landing.tsx` (`#form-section` iframe)
- Client-side analytics: `artifacts/web/src/lib/analytics.ts` + `artifacts/web/src/hooks/use-track.ts` (GA4/GTM dataLayer only)

## Architecture decisions

- Lead capture is delegated to an external CRM, embedded as an iframe on the landing page. The site no longer stores leads or exposes an admin dashboard.
- Click-to-call / click-to-text / view events are tracked client-side via the GA4/GTM dataLayer only (no backend event persistence).
- The API server retains only a health check; the database has no application tables.

## Product

- Public: compliant landing page (no VA/government/military affiliation, no banned claims), embedded CRM lead form, phone/SMS click-to-contact, legal pages (/privacy-policy, /terms, /not-affiliated-with-va), SEO + JSON-LD.

## User preferences

- No emojis anywhere in the product or code.
- Strict compliance: never imply affiliation with the VA, government, or military; never collect SSN, banking, medical, VA-claim, or Medicare numbers.

## Gotchas

- After editing `lib/api-spec/openapi.yaml`, run codegen AND restart the api-server workflow (it bundles api-zod at build time).
- After editing a `lib/*` package, run `pnpm run typecheck:libs` (or full typecheck) so declarations are rebuilt before leaf packages typecheck.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
