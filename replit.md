# Honor First Life

A mobile-first veteran-focused final-expense / life insurance lead generation website with a compliant multi-step lead form, analytics tracking, legal pages, and an admin dashboard for lead management.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/web run dev` — run the web frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- `SESSION_SECRET` — signs the admin session cookie (already set)
- `ADMIN_PASSWORD` — admin dashboard password. Defaults to `honorfirst-admin` in dev if unset; MUST be set to a strong value in production.
- Optional notification/CRM env (stubbed until set): `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`/`NOTIFY_EMAIL`, `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`/`TWILIO_FROM`/`NOTIFY_PHONE`. CRM webhook URL is stored in the `settings` table (key `crm_webhook_url`).

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web: React + Vite, wouter routing, shadcn/ui, React Query
- API: Express 5, pino logging
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Where things live

- API contract: `lib/api-spec/openapi.yaml` (re-run codegen after edits)
- Generated hooks/schemas: `@workspace/api-client-react`, `@workspace/api-zod`
- DB schema (source of truth): `lib/db/src/schema/` (`leads.ts`, `leadEvents.ts`, `settings.ts`)
- API routes: `artifacts/api-server/src/routes/` (`leads.ts`, `admin.ts`, `health.ts`)
- API libs: `artifacts/api-server/src/lib/` (`session.ts`, `leadScore.ts`, `notify.ts`, `rateLimit.ts`)
- Admin auth middleware: `artifacts/api-server/src/middlewares/requireAdmin.ts`
- Frontend pages: `artifacts/web/src/pages/` (landing, thank-you, legal, admin/*)
- Lead form: `artifacts/web/src/components/LeadForm.tsx`

## Architecture decisions

- Admin auth uses a signed (HMAC over SESSION_SECRET) httpOnly session cookie, not a full session store. 12h expiry.
- Lead scoring is a hidden internal priority score (0-100) computed server-side for dashboard sorting only — leads are never rejected based on health, age, veteran status, or other sensitive factors.
- CSV export (`GET /api/admin/export`) is a plain Express route returning text/csv (not in the OpenAPI spec since it isn't JSON).
- Notifications (email/SMS) and CRM webhook delivery are implemented as a stub layer that logs structured low-PII messages until provider credentials are configured.
- In-memory IP rate limiting on `/api/leads` and `/api/admin/login` (single-instance).
- Honeypot `company` field silently discards bot submissions; duplicate detection flags same phone/email within 24h via a lead event.

## Product

- Public: compliant landing page (no VA/government/military affiliation, no banned claims), 4-step lead form (no SSN/banking/medical/VA-claim fields), consent capture with timestamp, UTM/click-id capture, thank-you page, legal pages (/privacy-policy, /terms, /not-affiliated-with-va), SEO + JSON-LD.
- Admin: /admin login, /admin/leads dashboard (stats, filters, search, CSV export), /admin/leads/:id detail (status/notes/quality/outcome, click-to-call/text, events timeline, delete).

## User preferences

- No emojis anywhere in the product or code.
- Strict compliance: never imply affiliation with the VA, government, or military; never collect SSN, banking, medical, VA-claim, or Medicare numbers.

## Gotchas

- After editing `lib/api-spec/openapi.yaml`, run codegen AND restart the api-server workflow (it bundles api-zod at build time).
- After editing a `lib/*` package, run `pnpm run typecheck:libs` (or full typecheck) so declarations are rebuilt before leaf packages typecheck.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
