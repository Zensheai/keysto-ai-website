import { site } from "../../content";

const { startHere } = site;

export default function StartHere() {
  return (
    <section className="bg-bg-cream py-[clamp(5rem,10vh,8rem)] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="start-here-header text-center mb-16" data-reveal>
          <p className="font-mono text-xs text-accent-teal uppercase tracking-[0.1em] mb-3">
            {startHere.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-bg-dark leading-[1.05] tracking-[-0.01em]">
            {startHere.title}
          </h2>
        </div>

        {/* Steps */}
        <div className="start-here-steps relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Mobile vertical connector line */}
          <div className="connector-line md:hidden absolute left-8 top-0 bottom-0 w-px bg-border-subtle origin-top"></div>

          {/* Desktop horizontal connector line */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-border-subtle"></div>

          {startHere.steps.map((step, i) => {
            const isFirst = i === 0;
            return (
              <div
                key={step.n}
                className="start-step-card relative"
                data-reveal
              >
                {/* Number badge */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-1 z-10">
                  <div className="w-16 h-16 rounded-full bg-bg-dark flex items-center justify-center shadow-lg">
                    <span className="font-mono text-lg font-bold text-accent-amber">
                      {step.n}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="pt-20 pb-8 px-6 md:px-4 text-center">
                  <h3 className="font-body font-semibold text-xl text-bg-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed mb-6 max-w-[280px] mx-auto">
                    {step.body}
                  </p>
                  <a
                    href={step.href}
                    {...(step.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`inline-block font-body font-medium text-sm px-6 py-3 rounded-lg transition-all duration-200 active:scale-[0.98] ${
                      isFirst
                        ? "bg-accent-amber text-bg-dark hover:scale-[1.02] hover:brightness-110"
                        : "bg-bg-dark text-bg-warm hover:bg-surface-dark"
                    }`}
                  >
                    {step.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
