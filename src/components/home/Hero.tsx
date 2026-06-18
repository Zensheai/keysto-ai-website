import { site } from "../../content";

const { hero } = site;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-bg-dark flex items-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl xl:max-w-[700px]">
          <p className="font-mono text-xs text-text-muted uppercase tracking-[0.1em] mb-6">
            {hero.eyebrow}
          </p>
          <h1 className="hero-headline mb-8" style={{ textShadow: "0 2px 22px rgba(13,27,42,0.6)" }}>
            {hero.title.map((line, i) => (
              <div key={i} className="line">
                {line}
              </div>
            ))}
          </h1>
          <p className="font-body text-lg text-text-muted max-w-[480px] mb-10 leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-amber text-bg-dark font-body font-medium px-7 py-3.5 rounded-lg hover:scale-[1.02] hover:brightness-110 transition-all duration-200 active:scale-[0.98]"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="border border-border-dark text-bg-warm font-body font-medium px-7 py-3.5 rounded-lg hover:border-text-muted transition-all duration-200 active:scale-[0.98]"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Hero image — Simone, blended into the far right (desktop only).
          The cutout is transparent; the left-edge mask + navy gradient fade it
          seamlessly into the Deep Navy background. */}
      <div
        className="hidden lg:block"
        style={{ position: "absolute", right: 0, bottom: 0, height: "100%", width: "min(56vw, 720px)", zIndex: 0 }}
      >
        <img
          alt="Simone Keys at her desk"
          loading="eager"
          src={hero.image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "56% 14%",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 12%, black 26%)",
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 12%, black 26%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(13,27,42,0.85) 0%, rgba(13,27,42,0.22) 20%, transparent 40%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="font-mono text-[0.7rem] text-[#57534e] uppercase tracking-wider">
          {hero.scrollCue}
        </span>
        <div className="w-px h-8 bg-[#57534e] animate-scroll-pulse"></div>
      </div>
    </section>
  );
}
