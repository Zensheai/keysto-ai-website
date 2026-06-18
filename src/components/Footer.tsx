import { Link } from "react-router-dom";
import { site } from "../content";

export default function Footer() {
  const f = site.footer;

  return (
    <footer className="bg-bg-dark py-12 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top row: brand + social icons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-bg-warm rounded-lg flex items-center justify-center font-display font-semibold text-sm text-bg-dark">
              {site.brand.initial}
            </div>
            <div>
              <span className="font-body font-medium text-sm text-bg-warm block leading-tight">
                {f.brand}
              </span>
              <span className="font-body text-sm text-text-secondary">
                {f.tagline}
              </span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* YouTube */}
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-bg-warm transition-colors duration-200"
              aria-label="YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* X */}
            <a
              href={site.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-bg-warm transition-colors duration-200"
              aria-label="X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-bg-warm transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer nav links with dot separators */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted mb-8">
          {f.links.map((link, i) => {
            const isExternal = link.href.startsWith("http");
            const isAnchor = link.href.startsWith("/#");
            const sharedClass = "font-body text-sm text-text-muted hover:text-bg-warm transition-colors duration-200";
            let linkEl: React.ReactNode;
            if (isExternal) {
              linkEl = <a href={link.href} target="_blank" rel="noopener noreferrer" className={sharedClass}>{link.label}</a>;
            } else if (isAnchor) {
              linkEl = <a href={link.href} className={sharedClass}>{link.label}</a>;
            } else {
              linkEl = <Link to={link.href} className={sharedClass}>{link.label}</Link>;
            }
            return (
              <span key={link.label} className="flex items-center gap-2">
                {linkEl}
                {i < f.links.length - 1 && (
                  <span className="text-border-dark">·</span>
                )}
              </span>
            );
          })}
        </div>

        {/* Bottom: blurb + copyright */}
        <div className="border-t border-border-dark pt-6">
          <p
            className="font-body text-sm mb-1"
            style={{ color: "var(--c-navy-500)" }}
          >
            {f.blurb}
          </p>
          <p
            className="font-body text-sm"
            style={{ color: "var(--c-navy-500)" }}
          >
            {f.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
