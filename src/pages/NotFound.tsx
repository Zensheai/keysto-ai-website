import { useEffect } from "react";
import Seo from "../components/Seo";
import { initReveals } from "../lib/animations";

// Real 404 page. Served two ways: (1) client-side for unknown routes via the
// catch-all <Route path="*">, and (2) statically as dist/404.html, which
// Vercel returns with a real HTTP 404 status once the SPA catch-all rewrite
// is removed from vercel.json — so crawlers stop indexing junk URLs.
export default function NotFound() {
  useEffect(() => initReveals(), []);
  return (
    <main className="pt-16">
      <Seo
        title="Page Not Found | Keys to AI"
        description="That page doesn't exist. Head back to the Keys to AI tutorials, AI tools library, or blog."
        path="/404"
      />
      <div className="bg-bg-dark" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "6rem 1.5rem", textAlign: "center" }}>
          <p className="font-mono" style={{ color: "var(--c-terracotta)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
            404 — PAGE NOT FOUND
          </p>
          <h1 className="font-display text-bg-warm" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Well, this page doesn't exist.
          </h1>
          <p className="font-body text-text-muted" style={{ fontSize: "1.0625rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Real talk: either the link is old or the URL has a typo. Here's where to go instead.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/" className="font-body" style={{ fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: 8, background: "var(--c-terracotta)", color: "var(--c-champagne)", textDecoration: "none" }}>
              Back to Home
            </a>
            <a href="/tutorials" className="font-body" style={{ fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: 8, border: "1px solid var(--c-champagne)", color: "var(--c-champagne)", textDecoration: "none" }}>
              Browse Tutorials
            </a>
            <a href="/blog" className="font-body" style={{ fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: 8, border: "1px solid var(--c-champagne)", color: "var(--c-champagne)", textDecoration: "none" }}>
              Read the Blog
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
