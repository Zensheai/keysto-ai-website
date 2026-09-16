# Keys to AI — recovered live application

This branch restores the Next.js application currently deployed at https://keysto.ai. It preserves the public homepage, audit, authentication, and private Control Center source without redesigning or fixing their behavior.

This is a **review-only reconciliation branch**. Do not merge or deploy until the reconciliation is approved. `vercel.json` disables automatic Vercel deployments for `codex/reconcile-live-baseline`; merging into `main` may trigger production deployment.

## Provenance and preserved versions

- GitHub baseline: `75ce6dab95fb845108eea05b70c0aa01f0733e52` (Vite rebuild). It remains the parent history of this branch and is unchanged on `main`.
- Recovered production source: `71089baf10ee5cd75119c12bbe9caafd3047cdcc`.
- Production Git tree: `708846daf0c7b2f202e77cf1e40f99ed3a175591`.
- Vercel production deployment: `BZ4GFbAqeFGTSjQUYzV4EGqe7tBA`, created September 2, 2026.

See [the reconciliation record](docs/source-reconciliation.md) for recovery, checks, differences, and limits. The old Vite website and its resource files can be recovered from the baseline commit; they are not silently combined with the live application.

## Local build

Use the committed lockfile:

```sh
npm ci
npm run build
npm start
```

The recovery build passed with Next.js 15.5.25. `npm run lint` is inherited from production and invokes `next lint`; do not treat it as an independently verified lint suite. The successful production build includes TypeScript validation.

For local runtime work, copy `.env.example` to `.env.local` and configure only the services needed for your test. Never commit environment values. Supabase URL plus a publishable/anon key support authentication. `MAILERLITE_API_KEY` is server-only and used by `/api/subscribe`; `TREND_INGEST_SECRET` is the optional automation secret. Existing deployment values were not copied during recovery.

## Scope

Known audit, newsletter, accessibility, middleware-resilience, and content issues remain intentionally unchanged. Database migrations are historical source files, not instructions to apply them to an existing production database. No database migrations or private-record tests were run during reconciliation.
