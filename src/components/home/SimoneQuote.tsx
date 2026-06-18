import { site } from "../../content";

const { simone } = site;

export default function SimoneQuote() {
  return (
    <section className="bg-bg-cream py-[clamp(5rem,10vh,8rem)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Portrait / intro video (poster = portrait, click to play) */}
          <div className="section-entrance">
            <video
              className="w-full aspect-[4/5] object-cover rounded-2xl shadow-inner bg-bg-dark"
              src={simone.video}
              poster={simone.image}
              controls
              playsInline
              preload="metadata"
              aria-label="Simone Keys — why I started Keys to AI"
            />
          </div>

          {/* Quote column */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs text-accent-amber uppercase tracking-[0.1em] mb-4 section-entrance">
              {simone.eyebrow}
            </p>
            <blockquote className="font-display text-[clamp(1.5rem,3vw,2.25rem)] text-bg-dark leading-[1.15] mb-6 section-entrance">
              "{simone.quote}"
            </blockquote>
            <div className="section-entrance">
              <p className="font-body font-medium text-base text-bg-dark">
                {simone.name}
              </p>
              <p className="font-body text-sm text-text-secondary">
                {simone.role}
              </p>
            </div>
            <a
              href={simone.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body font-medium text-sm text-accent-teal mt-6 hover:underline underline-offset-4 section-entrance"
            >
              {simone.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
