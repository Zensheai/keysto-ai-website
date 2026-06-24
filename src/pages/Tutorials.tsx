import { useState, useEffect } from "react";
import { site } from "../content";
import Seo from "../components/Seo";
import { initReveals } from "../lib/animations";

const { tutorialsPage } = site;

// Map badge label to thumbnail image
function badgeToImage(badge: string): string {
  const b = badge.toUpperCase();
  if (b === "CLAUDE") return "/images/tutorial-claude.jpg";
  if (b === "AI TOOLS") return "/images/tutorial-tools.jpg";
  if (b === "AVATAR") return "/images/tutorial-avatar.jpg";
  return "/images/tutorial-claude.jpg";
}

export default function Tutorials() {
  useEffect(() => initReveals(), []);
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleItems =
    activeFilter === "All"
      ? tutorialsPage.items
      : tutorialsPage.items.filter(
          (item) => item.badge.toUpperCase() === activeFilter.toUpperCase()
        );

  return (
    <div>
      <Seo
        title="AI Tutorials for Solopreneurs | Keys to AI"
        description="Step-by-step AI tutorials for solopreneurs — Claude, HeyGen, ElevenLabs, and the workflows that save real hours. No coding required."
        path="/tutorials"
      />
      {/* Hero header — dark bg */}
      <div className="bg-bg-dark py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p
            className="font-mono text-xs text-accent-amber uppercase tracking-[0.1em] mb-3 tutorials-header"
            data-reveal
          >
            {tutorialsPage.eyebrow}
          </p>
          <h1
            className="font-display text-[clamp(2.5rem,5vw,4rem)] text-bg-warm leading-[1.0] tracking-[-0.02em] mb-4 tutorials-header"
            data-reveal
          >
            {tutorialsPage.title}
          </h1>
          <p
            className="font-body text-lg text-text-muted max-w-[480px] tutorials-header"
            data-reveal
          >
            {tutorialsPage.intro}
          </p>
        </div>
      </div>

      {/* Featured section — cream bg */}
      <div className="bg-bg-cream py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="font-mono text-xs text-accent-teal uppercase tracking-[0.1em] mb-6">
            {tutorialsPage.featuredLabel}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorialsPage.featured.map((item) => (
              <div key={item.title} className="tutorial-card" data-reveal>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-bg-dark cursor-pointer group">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      src={badgeToImage(item.badge)}
                    />
                    <div className="absolute inset-0 bg-bg-dark/30 group-hover:bg-bg-dark/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent-amber flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6 text-bg-dark ml-0.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[0.6875rem] text-accent-teal uppercase">
                      {item.badge}
                    </span>
                    <h3 className="font-body font-semibold text-lg text-bg-dark mt-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-text-secondary mt-1">
                      {item.blurb}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All tutorials grid — warm bg */}
      <div className="bg-bg-warm py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Filter chips */}
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            {tutorialsPage.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? "font-body font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 bg-bg-dark text-bg-warm"
                    : "font-body font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200 bg-surface text-bg-dark border border-border-subtle hover:border-text-muted"
                }
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item) => (
              <a
                key={item.href + item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tutorial-card group bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-card transition-all duration-300"
                data-reveal
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={badgeToImage(item.badge)}
                  />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[0.6875rem] text-accent-teal uppercase">
                    {item.badge}
                  </span>
                  <h3 className="font-body font-semibold text-base text-bg-dark mt-2 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary mt-2 line-clamp-2">
                    {item.blurb}
                  </p>
                  <span className="inline-block font-body font-medium text-sm text-bg-dark mt-4 group-hover:text-accent-teal transition-colors">
                    {item.cta}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
