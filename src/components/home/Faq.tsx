import { useState } from "react";
import { site } from "../../content";

const { faq } = site;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-bg-cream py-[clamp(5rem,10vh,8rem)] overflow-hidden">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Header */}
        <div className="faq-header text-center mb-14" data-reveal>
          <p className="font-mono text-xs text-accent-teal uppercase tracking-[0.1em] mb-3">
            {faq.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-bg-dark leading-[1.05] tracking-[-0.01em]">
            {faq.title}
          </h2>
        </div>

        {/* Accordion items */}
        <div className="space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item bg-surface border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-accent-teal/30 shadow-[0_4px_20px_rgba(20,184,166,0.06)]"
                    : "border-border-subtle hover:border-text-muted-light"
                }`}
                data-reveal
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-body font-medium text-base text-bg-dark">
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-accent-teal border-accent-teal text-white rotate-180"
                        : "border-border-subtle text-text-secondary"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5">
                    <p className="font-body text-sm text-text-secondary leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
