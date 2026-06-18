# Deploying the Keys to AI website

This is the editable rebuild of keysto.ai — a Vite + React static site, re-skinned to the
Keys to AI v2 brand palette. It builds to a static `dist/` folder and deploys anywhere that
serves static files. These steps are for Vercel.

> **⚠️ Do not deploy without Marsha's explicit approval.** Publishing the live site is a
> gated action per `CLAUDE.md` ("Never publish, post, or release any content without
> Marsha's explicit approval"). Build and review locally first; deploy only on her "go".

## Before you deploy — resolve these open items

1. **MailerLite email signup** (newsletter / worksheet forms).
   The forms work but show a friendly "being connected" message until credentials are set.
   To enable live signup, set these env vars in the Vercel project (Settings → Environment
   Variables), then redeploy:
   - `VITE_MAILERLITE_GROUP_ID` — the MailerLite group/subscriber list ID
   - `VITE_MAILERLITE_TOKEN` — a MailerLite API token
   See `.env.example`. (Note: a token shipped in a static frontend is publicly visible. For
   production, prefer a serverless proxy / Vercel Function instead of exposing the token.)
2. **Real social URLs.** `src/content.ts → site.social` currently has placeholder
   `https://x.com` and `https://instagram.com`. Replace with the real Keys to AI handles.
3. **Vercel account + keysto.ai DNS.** Confirm which Vercel account/team owns the project and
   that you control keysto.ai's DNS for the domain cutover.

## Local commands

```bash
npm install        # first time only
npm run dev        # local dev server (http://localhost:4322)
npm run build      # production build → dist/
npm run preview    # serve the production build locally (http://localhost:4323)
```

## Deploy to Vercel (after approval)

**Option A — Vercel dashboard (no Git required)**
1. Push this `website/` folder to a Git repo Vercel can read, OR use the CLI (Option B).
2. In Vercel: New Project → import the repo/folder → Framework preset "Vite".
3. Build settings are picked up from `vercel.json` (build `npm run build`, output `dist`).
4. Add the MailerLite env vars (above). Deploy.

**Option B — Vercel CLI**
```bash
npm i -g vercel
cd website
vercel            # first run links/creates the project (follow prompts)
vercel --prod     # deploy to production
```

## Point keysto.ai at the new deploy

1. In the Vercel project → Settings → Domains → add `keysto.ai` (and `www.keysto.ai`).
2. Vercel shows the DNS records to set (an A record / CNAME). Update them at your domain
   registrar / DNS provider.
3. Wait for DNS propagation + SSL issuance, then verify https://keysto.ai loads the new site.

## Editing the site later

- **Colors:** `src/styles/theme.css` — change a brand value once, the whole site updates.
- **Copy & links:** `src/content.ts` — all visitor-facing text and URLs live here.
- **Blog articles:** the 3 `#/blog/<slug>` detail pages are a planned fast-follow (the blog
  listing links to them). Build them as a `BlogPost` route reading from `site.blog.posts`.
