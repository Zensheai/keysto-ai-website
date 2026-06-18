import { useState } from "react";
import { site } from "../../content";

const { featured } = site;

export default function FeaturedTutorial() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-bg-warm py-[clamp(5rem,10vh,8rem)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="featured-video-content">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="font-mono text-xs text-accent-amber uppercase tracking-[0.1em] mb-3">
                {featured.eyebrow}
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-bg-dark leading-[1.05] tracking-[-0.01em]">
                {featured.title}
              </h2>
            </div>
            <p className="font-body text-sm text-text-secondary mt-3 md:mt-0 max-w-[300px]">
              {featured.blurb}
            </p>
          </div>

          {/* Video area */}
          <div
            className="relative rounded-2xl overflow-hidden bg-bg-dark group cursor-pointer shadow-card"
            onClick={() => setPlaying(true)}
          >
            {playing ? (
              <div className="relative aspect-video">
                <iframe
                  className="w-full h-full"
                  src={featured.embed}
                  title={featured.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video">
                <img
                  alt={`${featured.title} - Tutorial Thumbnail`}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                  src={`/images/tutorial-claude.jpg`}
                />
                <div className="absolute inset-0 bg-bg-dark/30 group-hover:bg-bg-dark/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent-amber flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-bg-dark ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between mt-6">
            <span className="font-mono text-xs text-accent-teal uppercase tracking-wider bg-accent-teal/10 px-3 py-1 rounded-full">
              {featured.badge}
            </span>
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium text-sm text-bg-dark hover:text-accent-teal transition-colors duration-200"
            >
              {featured.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
