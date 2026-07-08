import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { site } from "../content";
import Seo from "../components/Seo";
import { initReveals } from "../lib/animations";

// Individual blog-article page. Reads :slug, finds the matching post in
// content.ts, and renders its body blocks. Typography/colors use the original's
// custom classes (font-display / text-bg-dark / text-text-muted ...) which live
// in the reused CSS; structural layout uses inline styles so it renders
// regardless of which Tailwind utilities the original build happened to include.
const wrap: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "0 1.5rem" };

export default function BlogPost() {
  const { slug } = useParams();
  const post = site.blog.posts.find((p) => p.slug === slug);

  useEffect(() => initReveals(), [slug]);

  if (!post) {
    return (
      <main className="pt-16">
        <div style={{ ...wrap, padding: "6rem 1.5rem", textAlign: "center" }}>
          <h1 className="font-display text-2xl md:text-3xl text-bg-dark" style={{ marginBottom: "1rem" }}>
            Post not found
          </h1>
          <a href="/blog" className="font-mono" style={{ color: "var(--c-terracotta)" }}>
            ← Back to blog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <Seo
        title={`${post.title} | Keys to AI`}
        description={post.summary}
        path={post.href}
        image={post.image}
        type="article"
      />
      {/* Dark header */}
      <header className="bg-bg-dark">
        <div style={{ ...wrap, paddingTop: "4rem", paddingBottom: "3.5rem" }}>
          <a
            href="/blog"
            className="font-mono"
            style={{ color: "var(--c-terracotta)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            ← Back to blog
          </a>
          <div
            className="font-mono text-text-muted"
            style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", margin: "1.5rem 0 0.75rem" }}
          >
            {post.category} · {post.readTime}
          </div>
          <div
            className="font-body text-text-muted"
            style={{ fontSize: 14, margin: "0 0 0.75rem" }}
          >
            By <a href="/about" style={{ color: "var(--c-terracotta)", textDecoration: "none" }}>{post.author}</a>
            {" · Published "}
            <time dateTime={post.date}>{post.date}</time>
            {" · Updated "}
            <time dateTime={post.dateModified}>{post.dateModified}</time>
          </div>
          <h1 className="font-display text-bg-warm" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1rem" }}>
            {post.title}
          </h1>
          <p className="font-body text-text-muted" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
            {post.summary}
          </p>
        </div>
      </header>

      {/* Body */}
      <article className="bg-bg-warm">
        <div style={{ ...wrap, paddingTop: "3rem", paddingBottom: "4rem" }}>
          {/* Hero image */}
          <img
            src={post.image}
            alt={post.title}
            data-reveal
            style={{ width: "100%", borderRadius: 12, marginBottom: "2.5rem", display: "block" }}
          />

          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="font-display text-bg-dark" style={{ fontSize: "clamp(1.4rem,3vw,1.875rem)", lineHeight: 1.25, marginTop: "2.5rem", marginBottom: "1rem" }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "p") {
              return (
                <p key={i} className="font-body text-text-muted" style={{ fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  {block.text}
                </p>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} style={{ listStyle: "disc", paddingLeft: "1.4rem", margin: "0 0 1.5rem" }}>
                  {block.items.map((it, j) => (
                    <li key={j} className="font-body text-text-muted" style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "0.4rem" }}>
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "callout") {
              return (
                <div key={i} style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: 10, background: "var(--c-champagne)", borderLeft: "4px solid var(--c-emerald)" }}>
                  <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-emerald)", marginBottom: "0.5rem" }}>
                    {block.label}
                  </div>
                  <p className="font-body" style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--c-deep-navy)", margin: 0 }}>
                    {block.text}
                  </p>
                </div>
              );
            }
            return null;
          })}

          {/* Article FAQ — mirrored as FAQPage JSON-LD at build time */}
          {post.faq && post.faq.length > 0 && (
            <section style={{ marginTop: "3rem" }}>
              <h2 className="font-display text-bg-dark" style={{ fontSize: "clamp(1.4rem,3vw,1.875rem)", lineHeight: 1.25, marginBottom: "1.25rem" }}>
                Frequently asked questions
              </h2>
              {post.faq.map((f, i) => (
                <details key={i} open style={{ borderBottom: "1px solid rgba(13,27,42,0.10)", padding: "0.9rem 0" }}>
                  <summary className="font-body" style={{ fontWeight: 600, fontSize: "1.0625rem", color: "var(--c-deep-navy)", cursor: "pointer" }}>
                    {f.q}
                  </summary>
                  <p className="font-body text-text-muted" style={{ fontSize: "1rem", lineHeight: 1.7, margin: "0.6rem 0 0" }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </section>
          )}

          {/* End-of-post CTA */}
          {post.postCta && (
            <div data-reveal style={{ marginTop: "3rem", padding: "2rem", borderRadius: 14, background: "var(--c-deep-navy)", textAlign: "center" }}>
              <p className="font-body text-bg-warm" style={{ fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                {post.postCta.text}
              </p>
              <a
                href={post.postCta.href}
                className="font-body"
                style={{ display: "inline-block", fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: 8, background: "var(--c-terracotta)", color: "var(--c-champagne)", textDecoration: "none" }}
              >
                {post.postCta.label}
              </a>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
