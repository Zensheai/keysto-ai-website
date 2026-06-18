import { site } from "../../content";

const { resources } = site;

export default function Resources() {
  return (
    <section
      id="resources"
      className="bg-bg-dark py-[clamp(5rem,10vh,8rem)] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-6" data-reveal>
          <p className="font-mono text-xs text-accent-amber uppercase tracking-[0.1em] mb-3">
            {resources.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-bg-warm leading-[1.05] tracking-[-0.01em]">
            {resources.title}
          </h2>
        </div>

        {/* Intro */}
        <p className="font-body text-base text-text-muted max-w-[560px] mb-10" data-reveal>
          <span className="text-bg-warm">Curated companion materials.</span>{" "}
          {resources.intro.replace("Curated companion materials. ", "")}
        </p>

        {/* Resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.items.map((item, i) => (
            <div key={i} className="resource-card" data-reveal>
              <div className="resource-card__content">
                <span className="text-accent-amber text-xl mb-3 block">
                  {item.icon}
                </span>
                <p className="font-mono text-[0.625rem] text-text-muted uppercase tracking-wider mb-2">
                  {item.tag}
                </p>
                <h3 className="font-body font-semibold text-lg text-bg-warm mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-text-muted line-clamp-2 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <button className="font-body font-medium text-sm text-accent-amber hover:underline underline-offset-4 cursor-pointer bg-transparent border-none p-0">
                  {item.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
