import { useEffect } from "react";
import { site } from "../content";
import Seo from "../components/Seo";
import { initReveals } from "../lib/animations";

const { aboutPage } = site;
const wrap: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "0 1.5rem" };

// About page — the E-E-A-T / trust page. Explains what Keys to AI is, who it's
// for, and is fully transparent that Simone Keys is an AI-generated host built
// with the same tools the channel teaches.
export default function About() {
  useEffect(() => initReveals(), []);
  return (
    <main className="pt-16">
      <Seo
        title={aboutPage.metaTitle}
        description={aboutPage.metaDescription}
        path="/about"
        image={aboutPage.image}
      />

      {/* Dark header */}
      <header className="bg-bg-dark">
        <div style={{ ...wrap, paddingTop: "4rem", paddingBottom: "3.5rem" }}>
          <p className="font-mono" style={{ color: "var(--c-terracotta)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            {aboutPage.eyebrow}
          </p>
          <h1 className="font-display text-bg-warm" style={{ fontSize: "clamp(1.75rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1rem" }}>
            {aboutPage.title}
          </h1>
          <p className="font-body text-text-muted" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
            {aboutPage.intro}
          </p>
        </div>
      </header>

      {/* Body */}
      <article className="bg-bg-warm">
        <div style={{ ...wrap, paddingTop: "3rem", paddingBottom: "4rem" }}>
          <img
            src={aboutPage.image}
            alt="Simone Keys, host of Keys to AI"
            data-reveal
            style={{ width: "100%", borderRadius: 12, marginBottom: "2.5rem", display: "block" }}
          />
          {aboutPage.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-bg-dark" style={{ fontSize: "clamp(1.4rem,3vw,1.875rem)", lineHeight: 1.25, marginTop: "2.5rem", marginBottom: "1rem" }}>
                {s.h2}
              </h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="font-body text-text-muted" style={{ fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* Transparency callout */}
          <div style={{ margin: "2rem 0", padding: "1.25rem 1.5rem", borderRadius: 10, background: "var(--c-champagne)", borderLeft: "4px solid var(--c-emerald)" }}>
            <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-emerald)", marginBottom: "0.5rem" }}>
              {aboutPage.callout.label}
            </div>
            <p className="font-body" style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--c-deep-navy)", margin: 0 }}>
              {aboutPage.callout.text}
            </p>
          </div>

          {/* CTA */}
          <div data-reveal style={{ marginTop: "3rem", padding: "2rem", borderRadius: 14, background: "var(--c-deep-navy)", textAlign: "center" }}>
            <p className="font-body text-bg-warm" style={{ fontSize: "1.0625rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {aboutPage.cta.text}
            </p>
            <a
              href={aboutPage.cta.href}
              className="font-body"
              style={{ display: "inline-block", fontWeight: 600, padding: "0.75rem 1.5rem", borderRadius: 8, background: "var(--c-terracotta)", color: "var(--c-champagne)", textDecoration: "none" }}
            >
              {aboutPage.cta.label}
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
