// Post-build: write a static index.html per route with that route's meta/OG
// AND its JSON-LD structured data baked into the <head>. Social + AI crawlers
// (Facebook, LinkedIn, X, Perplexity, ChatGPT, Google AI) read these static
// tags directly — no JS execution needed. Users still get the live SPA.
//
// Sitewide Organization + WebSite schema lives in index.html (so every page,
// including these copies, carries it). This script adds page-specific schema:
//   - Home:        FAQPage  (from the homepage FAQ section)
//   - Blog posts:  Article + VideoObject
//
// Keep `routes`, `FAQ_ITEMS`, and `BLOG_SCHEMA` in sync with src/content.ts.

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

// Homepage FAQ — keep in sync with src/content.ts → site.faq.items
const FAQ_ITEMS = [
  { q: "Who are these workflows for?", a: "These workflows are built for solopreneurs, creators, and one-person business owners who want to use AI to save hours every week. You don't need to be technical — every tutorial is designed to be followed step by step." },
  { q: "Do I need to know how to code?", a: "Not at all. The tools I teach — Claude, Notion, Canva, Zapier, Airtable — are all no-code. If you can follow a recipe, you can follow these workflows." },
  { q: "Are the resources really free?", a: "Yes, 100%. The worksheets, prompt packs, and checklists are all free downloads. I create them as companions to my YouTube tutorials so you can turn what you watch into what you actually do." },
  { q: "What makes Keys to AI different from other AI tutorials?", a: "I only teach systems I actually use in my own business. If a workflow can't survive a busy week, it doesn't make the cut. Simple enough to repeat, useful enough to save real hours." },
  { q: "How often do you publish new tutorials?", a: "I publish new tutorials weekly on YouTube, and the newsletter goes out every Monday with the single AI workflow worth your time that week." },
  { q: "Can I suggest a topic or tool?", a: "Absolutely. The best tutorials come from real questions. Reply to any newsletter email or drop a comment on YouTube — I read every single one." },
];

// Blog Article/Video schema — keep in sync with src/content.ts → site.blog.posts
const BLOG_SCHEMA = {
  "/blog/claude-desktop-setup": { headline: "Stop Re-Explaining Yourself to Claude: The Desktop Setup That Actually Works", image: "/images/tutorial-claude.jpg", datePublished: "2025-06-01", videoId: "6tZTOkPWZ7o" },
  "/blog/8-ai-tools-solopreneur": { headline: "The Only 8 AI Tools You Need as a Solopreneur", image: "/images/tutorial-tools.jpg", datePublished: "2025-05-25", videoId: "VquszjmTFrU" },
  "/blog/heygen-ai-avatar": { headline: "Bring Your AI Avatar to Life with HeyGen", image: "/images/tutorial-avatar.jpg", datePublished: "2025-05-18", videoId: "R0EmUT4EX2g" },
};

const ORG = { "@type": "Organization", name: "Keys to AI", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` } };

const esc = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const ldScript = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

function blogLd(path, r) {
  const b = BLOG_SCHEMA[path];
  if (!b) return "";
  const url = `${SITE}${path}`;
  const img = `${SITE}${b.image}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: b.headline,
    description: r.description,
    image: img,
    datePublished: b.datePublished,
    dateModified: b.datePublished,
    author: { "@type": "Organization", name: "Keys to AI", url: SITE },
    publisher: ORG,
    mainEntityOfPage: url,
  };
  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: b.headline,
    description: r.description,
    thumbnailUrl: img,
    uploadDate: b.datePublished,
    contentUrl: `https://www.youtube.com/watch?v=${b.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${b.videoId}`,
  };
  return ldScript(article) + ldScript(video);
}

const faqLd = () =>
  ldScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

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
  const ld = blogLd(r.path, r);
  const head = `    <link rel="canonical" href="${url}" />\n    <meta name="twitter:title" content="${esc(r.title)}" />\n    <meta name="twitter:description" content="${esc(r.description)}" />\n    <meta name="twitter:image" content="${img}" />\n${ld ? `    ${ld}\n` : ""}  </head>`;
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

// Home: inject FAQPage into dist/index.html (left untouched by the loop above)
const homePath = join(DIST, "index.html");
const home = readFileSync(homePath, "utf8").replace("</head>", `    ${faqLd()}\n  </head>`);
writeFileSync(homePath, home, "utf8");

console.log(`prerender-meta: wrote ${count} per-route HTML files + FAQPage on home`);
