import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware theming: transparent + light text over the dark hero/headers at
  // the top of every page; solid Champagne bar with dark text once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Foreground color flips with scroll state.
  const fg = scrolled ? "var(--c-deep-navy)" : "var(--c-champagne)";
  const bar: React.CSSProperties = { display: "block", width: 18, height: 2, borderRadius: 2, background: fg, transition: "transform .2s ease, opacity .2s ease, background .3s ease" };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--c-champagne)" : "transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(13,27,42,0.10)" : "none",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link className="flex items-center gap-3" to="/" onClick={() => setOpen(false)}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-semibold text-sm transition-colors duration-300"
            style={{
              background: scrolled ? "var(--c-deep-navy)" : "var(--c-champagne)",
              color: scrolled ? "var(--c-champagne)" : "var(--c-deep-navy)",
            }}
          >
            {site.brand.initial}
          </div>
          <div className="flex flex-col">
            <span className="font-body font-medium text-sm leading-tight transition-colors duration-300" style={{ color: fg }}>
              {site.brand.name}
            </span>
            <span className="font-mono text-[0.7rem] leading-tight transition-colors duration-300" style={{ color: fg, opacity: 0.75 }}>
              {site.brand.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {site.nav.map((link) => {
            const isAnchor = link.href.startsWith("/#");
            const sharedClass = "font-body font-medium text-sm underline-offset-4 hover:underline-offset-[0.4em] transition-all duration-200";
            const sharedStyle = { color: fg, textDecoration: "underline transparent" };
            return isAnchor ? (
              <a key={link.label} href={link.href} className={sharedClass} style={sharedStyle}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className={sharedClass} style={sharedStyle}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right group: Watch CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={site.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-medium text-sm px-5 py-2.5 rounded-lg transition-colors duration-300"
            style={
              scrolled
                ? { background: "var(--c-deep-navy)", color: "var(--c-champagne)" }
                : { background: "transparent", color: "var(--c-champagne)", boxShadow: "inset 0 0 0 1px var(--c-champagne)" }
            }
          >
            Watch
          </a>

          {/* Hamburger — only on mobile. Adapts with scroll state so it stays
              visible over both the dark hero and the light sections. */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-lg flex flex-col items-center justify-center transition-colors duration-300"
            style={
              scrolled
                ? { width: 40, height: 40, gap: 5, background: "var(--c-deep-navy)" }
                : { width: 40, height: 40, gap: 5, background: "transparent", boxShadow: "inset 0 0 0 1px var(--c-champagne)" }
            }
          >
            <span style={{ ...bar, transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ ...bar, opacity: open ? 0 : 1 }} />
            <span style={{ ...bar, transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel — always solid Champagne for readability */}
      {open && (
        <div
          className="md:hidden bg-bg-warm"
          style={{ borderTop: "1px solid var(--c-navy-600)", boxShadow: "0 10px 28px rgba(13,27,42,0.18)" }}
        >
          <div className="max-w-[1200px] mx-auto px-6 py-2 flex flex-col">
            {site.nav.map((link) => {
              const isAnchor = link.href.startsWith("/#");
              const sharedClass = "font-body font-medium text-sm text-bg-dark";
              const sharedStyle = { padding: "0.85rem 0", borderBottom: "1px solid rgba(13,27,42,0.08)" };
              return isAnchor ? (
                <a key={link.label} href={link.href} onClick={() => setOpen(false)} className={sharedClass} style={sharedStyle}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.href} onClick={() => setOpen(false)} className={sharedClass} style={sharedStyle}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
