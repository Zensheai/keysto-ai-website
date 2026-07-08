// Post-build prerender: renders every route to FULL static HTML (body content
// included) so search engines and AI crawlers — GPTBot, ClaudeBot,
// PerplexityBot, CCBot — can read the site without executing JavaScript.
//
// Runs after `vite build` (client) + `vite build --ssr` (server bundle).
// Single source of truth: routes, meta, and JSON-LD all derive from
// src/content.ts via the server bundle — nothing is hand-synced anymore.
//
// Outputs into dist/:
//   - <route>/index.html   full pre-rendered page + per-route meta + JSON-LD
//   - 404.html             real 404 page (Vercel serves it with HTTP 404)
//   - sitemap.xml          generated from the route list
//   - rss.xml              generated from blog posts

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://keysto.ai";
const DIST = "dist";
const BUILD_DATE = new Date().toISOString().slice(0, 10);

const { render, site } = await import(
  pathToFileURL(resolve("dist-server/entry-server.js")).href
);

// ── Route table (meta comes from content.ts where it exists) ────────────────
const posts = site.blog.posts;

const routes = [
  {
    path: "/",
    title: "Keys to AI | AI Workflows Made Simple",
    description:
      "Practical AI workflows for solopreneurs. Simple enough to repeat, useful enough to save real hours — tutorials, tools, and free resources.",
    image: "/images/hero-portrait.jpg",
    type: "website",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/tutorials",
    title: "AI Tutorials for Solopreneurs | Keys to AI",
    description:
      "Step-by-step AI tutorials for solopreneurs — Claude, HeyGen, ElevenLabs, and the workflows that save real hours. No coding required.",
    image: "/images/tutorial-claude.jpg",
    type: "website",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/ai-tools",
    title: "The AI Tools I Actually Use | Keys to AI",
    description:
      "An honest, tested AI tool stack for solopreneurs — what each tool is best for, real pricing, and how I use it in my own workflow.",
    image: "/images/tutorial-tools.jpg",
    type: "website",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/blog",
    title: "AI Workflow Guides & Tutorials | Keys to AI",
    description:
      "Written AI tutorials for solopreneurs. Read the guide, watch the video, and download the resources — every workflow worth your time.",
    image: "/images/tutorial-avatar.jpg",
    type: "website",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/about",
    title: site.aboutPage.metaTitle,
    description: site.aboutPage.metaDescription,
    image: site.aboutPage.image,
    type: "website",
    changefreq: "monthly",
    priority: "0.6",
  },
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} | Keys to AI`,
    description: p.summary,
    image: p.image,
    type: "article",
    changefreq: "monthly",
    priority: "0.7",
    lastmod: p.dateModified || p.date,
    post: p,
  })),
];

// ── JSON-LD builders ─────────────────────────────────────────────────────────
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ldScript = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

const ORG_ID = `${SITE}/#organization`;
const SITEWIDE_LD = ldScript({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Keys to AI",
      url: SITE,
      logo: `${SITE}/favicon.png`,
      description:
        "Keys to AI teaches solopreneurs and small businesses practical, no-code AI workflows using tools like Claude, HeyGen, ElevenLabs, Make.com, and Notion.",
      sameAs: [site.social.youtube, site.social.x, site.social.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: "Keys to AI",
      url: SITE,
      publisher: { "@id": ORG_ID },
    },
  ],
});

const faqLd = (items) =>
  ldScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });

function articleLd(post) {
  const url = `${SITE}/blog/${post.slug}`;
  const img = `${SITE}${post.image}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: img,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: { "@type": "Organization", name: "Keys to AI", url: `${SITE}/about` },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
  };
  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: post.title,
    description: post.summary,
    thumbnailUrl: img,
    uploadDate: post.date,
    contentUrl: `https://www.youtube.com/watch?v=${post.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${post.videoId}`,
  };
  let out = ldScript(article) + ldScript(video);
  if (post.faq?.length) out += faqLd(post.faq);
  return out;
}

const aboutLd = ldScript({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE}/about`,
  name: "About Keys to AI",
  mainEntity: { "@id": ORG_ID },
});

function routeLd(r) {
  if (r.path === "/") return faqLd(site.faq.items);
  if (r.path === "/about") return aboutLd;
  if (r.post) return articleLd(r.post);
  return "";
}

// ── HTML assembly ────────────────────────────────────────────────────────────
const template = readFileSync(join(DIST, "index.html"), "utf8");

function buildHtml(r, renderedBody) {
  const url = `${SITE}${r.path === "/" ? "/" : r.path}`;
  const img = `${SITE}${r.image}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(r.title)}$2`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(r.description)}$2`);
  html = html.replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${r.type}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${img}$2`);
  const extraHead = [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="twitter:title" content="${esc(r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    SITEWIDE_LD,
    routeLd(r),
  ]
    .filter(Boolean)
    .map((l) => `    ${l}`)
    .join("\n");
  html = html.replace("</head>", `${extraHead}\n  </head>`);
  // Inject the pre-rendered app markup so crawlers get real content without JS.
  html = html.replace('<div id="root"></div>', `<div id="root">${renderedBody}</div>`);
  return html;
}

let count = 0;
for (const r of routes) {
  const html = buildHtml(r, render(r.path));
  const outPath =
    r.path === "/" ? join(DIST, "index.html") : join(DIST, r.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, "utf8");
  count++;
}

// ── 404 page (Vercel serves dist/404.html with a real 404 status) ───────────
const notFoundHtml = buildHtml(
  {
    path: "/404",
    title: "Page Not Found | Keys to AI",
    description:
      "That page doesn't exist. Head back to the Keys to AI tutorials, AI tools library, or blog.",
    image: "/images/hero-portrait.jpg",
    type: "website",
  },
  render("/definitely-not-a-real-page")
).replace(/<link rel="canonical"[^>]*>\n?/, "");
writeFileSync(join(DIST, "404.html"), notFoundHtml, "utf8");

// ── sitemap.xml ──────────────────────────────────────────────────────────────
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${r.lastmod || BUILD_DATE}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf8");

// ── rss.xml ──────────────────────────────────────────────────────────────────
const rssItems = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date + "T09:00:00Z").toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`
  )
  .join("\n");
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Keys to AI — AI Workflows Made Simple</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical, no-code AI workflows for solopreneurs. New tutorials weekly.</description>
    <language>en-us</language>
${rssItems}
  </channel>
</rss>
`;
writeFileSync(join(DIST, "rss.xml"), rss, "utf8");

// Server bundle is build-time only — don't ship it.
rmSync("dist-server", { recursive: true, force: true });

console.log(`prerender: ${count} routes fully pre-rendered + 404.html + sitemap.xml + rss.xml`);
