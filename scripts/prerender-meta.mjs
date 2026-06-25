// Post-build: write a static index.html per route with that route's meta/OG
// baked into the <head>. Social crawlers (Facebook, LinkedIn, X, iMessage)
// don't run JS, so they read these static tags for share previews. Users still
// get the live SPA (the same bundle boots and React Router renders the route).
//
// Vercel serves a matching static file (e.g. dist/tutorials/index.html at
// /tutorials) before applying the SPA rewrite, so crawlers see correct tags.
//
// Keep `routes` in sync with the <Seo> props in src/pages/* and the blog posts
// in src/content.ts. Home ("/") keeps dist/index.html as-is (already correct).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const SITE = "https://keysto.ai";
const DIST = "dist";

const routes = [
  {
    path: "/tutorials",
    title: "AI Tutorials for Solopreneurs | Keys to AI",
    description:
      "Step-by-step AI tutorials for solopreneurs — Claude, HeyGen, ElevenLabs, and the workflows that save real hours. No coding required.",
    image: "/images/hero-portrait.jpg",
    type: "website",
  },
  {
    path: "/ai-tools",
    title: "The AI Tools I Actually Use | Keys to AI",
    description:
      "An honest, tested AI tool stack for solopreneurs — what each tool is best for, real pricing, and how I use it in my own workflow.",
    image: "/images/hero-portrait.jpg",
    type: "website",
  },
  {
    path: "/blog",
    title: "AI Workflow Guides & Tutorials | Keys to AI",
    description:
      "Written AI tutorials for solopreneurs. Read the guide, watch the video, and download the resources — every workflow worth your time.",
    image: "/images/hero-portrait.jpg",
    type: "website",
  },
  {
    path: "/blog/claude-desktop-setup",
    title:
      "Stop Re-Explaining Yourself to Claude: The Desktop Setup That Actually Works | Keys to AI",
    description:
      "How to configure Claude Desktop so you never have to re-explain your context again. A step-by-step setup for solopreneurs who want consistent, high-quality AI output.",
    image: "/images/tutorial-claude.jpg",
    type: "article",
  },
  {
    path: "/blog/8-ai-tools-solopreneur",
    title: "The Only 8 AI Tools You Need as a Solopreneur | Keys to AI",
    description:
      "A curated stack of AI tools that actually matter for a one-person business. No fluff, no affiliate spam — just what works.",
    image: "/images/tutorial-tools.jpg",
    type: "article",
  },
  {
    path: "/blog/heygen-ai-avatar",
    title: "Bring Your AI Avatar to Life with HeyGen | Keys to AI",
    description:
      "A step-by-step guide to creating a realistic AI avatar for your content. From photo to speaking video in under 10 minutes.",
    image: "/images/tutorial-avatar.jpg",
    type: "article",
  },
];

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const template = readFileSync(join(DIST, "index.html"), "utf8");

function buildHtml(r) {
  const url = `${SITE}${r.path}`;
  const img = `${SITE}${r.image}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  html = html.replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${r.type}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${img}$2`);
  const head = `    <link rel="canonical" href="${url}" />\n    <meta name="twitter:title" content="${esc(r.title)}" />\n    <meta name="twitter:description" content="${esc(r.description)}" />\n    <meta name="twitter:image" content="${img}" />\n  </head>`;
  html = html.replace("</head>", head);
  return html;
}

let count = 0;
for (const r of routes) {
  const outPath = join(DIST, r.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buildHtml(r), "utf8");
  count++;
}
console.log(`prerender-meta: wrote ${count} per-route HTML files`);
