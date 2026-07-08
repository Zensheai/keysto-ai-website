// Build-time server entry: renders each route to static HTML (used by
// scripts/prerender.mjs after `vite build --ssr`). Also re-exports the site
// content so the prerender script has a single source of truth for meta,
// JSON-LD, the sitemap, and the RSS feed — no more hand-synced copies.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";

export { site } from "./content";

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  );
}
