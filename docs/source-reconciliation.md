# Source reconciliation — September 16, 2026

## Why this branch exists

GitHub `main` (`75ce6dab95fb845108eea05b70c0aa01f0733e52`) contains a Vite/React rebuild. The live Vercel deployment instead contains the Next.js `keys-to-ai-control-center` application. The live homepage, `/audit`, and Control Center are the intended baseline for future work.

Production identifies commit `71089baf10ee5cd75119c12bbe9caafd3047cdcc` and tree `708846daf0c7b2f202e77cf1e40f99ed3a175591`. GitHub's API and direct Git fetch cannot currently retrieve that commit. The original local website checkout was recovered, with HEAD exactly matching the production commit, clean tracked `src`/`public` files, and Vercel metadata identifying project `keysto-ai-website` (`prj_93WjyLIdSh8FAHCdGWhwzwuOXOPD`).

Only the 73 committed website files were exported with `git archive`. No `.env.local`, Vercel credentials, installed packages, private records, untracked plugins, installers, or unrelated local Git history were imported. All 73 extracted files were checked against the archive before reconciliation metadata was added. A credential-pattern scan of source/docs/migrations returned no matches. This is a targeted check, not a guarantee that every possible secret format has been detected.

The production deployment source viewer shows extra folders/installers outside the committed tree. They were excluded from recovery because they are not part of the committed application. Exact byte-for-byte recovery of the entire uploaded deployment archive is not claimed. The recovered application source is exact to the identified commit, with corroborating deployed-source and served-asset evidence.

## Corroboration

- Deployed Vercel source agrees with recovered package configuration, global middleware, Supabase session middleware, signup handler, and Control Center auth guard inspected during the audit.
- `public/audit-tool.html` matches the live asset after CRLF/LF normalization.
- The clean build produced the same core client chunk filenames/hashes observed in production: `255-37e0f0325134c4d7.js` and `4bd1b696-c023c6e3521b1417.js`.
- No source, component, CSS, public asset, migration, dependency version, or lockfile was edited during reconciliation.

## Intentional changes beyond the recovered tree

1. This record and the root README document ownership, provenance, and limitations.
2. `.env.example` adds the missing blank `MAILERLITE_API_KEY` name, already consumed by recovered server code.
3. `.gitignore` ignores other `.env.*` files while explicitly allowing the empty example.
4. `vercel.json` suppresses automatic deployments for this exact review branch. It does not switch the production project or override framework/build/output settings.

The Vite files removed from the branch working tree remain fully preserved in its parent commit and in unchanged GitHub `main`. The branch is a normal descendant of that history; no force-push or replacement of `main` is required.

## Validation

- `npm ci --ignore-scripts`: passed using recovered lockfile.
- `NEXT_TELEMETRY_DISABLED=1 npm run build`: passed; compilation, TypeScript checks, static page generation, and server route tracing completed.
- Local server bound only to `127.0.0.1:4325`, using an invalid example Supabase URL and a clearly non-secret placeholder key; no production credentials were loaded.
- Local `/`, `/audit`, and `/audit-tool.html`: HTTP 200.
- Local signed-out `/control-center`: redirected to `/login?next=/control-center` and displayed sign-in.
- Local API GET probes with intentionally invalid service configuration returned HTTP 500, not business records. This is not a successful authorization/integration test; authenticated API behavior and row-level security remain unverified.
- No signup was submitted, no private workspace record was opened or modified, no migrations were applied, and no live deployment was requested.

## Before any merge/release

Confirm the Vercel production framework/build settings match this Next application and retain the current deployment as a recovery point. Review this replacement diff against the preserved Vite work. Merging into `main` may deploy automatically; that requires an explicit release decision. Do not merge merely to finish source recovery.

After that decision, address the previously reported functional and design issues as separate changes. In particular, preserve protected-route guards while isolating public pages from Supabase outages. This branch establishes source provenance; it does not certify the existing application's security or correct its known defects.

References: [Vercel production source](https://vercel.com/zensheai-innovatewithaihub/keysto-ai-website/BZ4GFbAqeFGTSjQUYzV4EGqe7tBA/source), [branch deployment suppression](https://vercel.com/docs/project-configuration/git-configuration), [preserved GitHub baseline](https://github.com/Zensheai/keysto-ai-website/tree/75ce6dab95fb845108eea05b70c0aa01f0733e52).
