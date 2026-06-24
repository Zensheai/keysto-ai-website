import { useState, useEffect } from "react";
import { site } from "../content";
import Seo from "../components/Seo";
import { initReveals } from "../lib/animations";

const { aiToolsPage } = site;

export default function AITools() {
  useEffect(() => initReveals(), []);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const visibleTools =
    activeFilter === "All"
      ? aiToolsPage.tools
      : aiToolsPage.tools.filter(
          (tool) => tool.category === activeFilter
        );

  function toggleExpand(index: number) {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <div>
      <Seo
        title="The AI Tools I Actually Use | Keys to AI"
        description="An honest, tested AI tool stack for solopreneurs — what each tool is best for, real pricing, and how I use it in my own workflow."
        path="/ai-tools"
      />
      {/* Hero header — dark bg */}
      <div className="bg-bg-dark py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <p
            className="font-mono text-xs text-accent-amber uppercase tracking-[0.1em] mb-3 tools-header"
            data-reveal
          >
            {aiToolsPage.eyebrow}
          </p>
          <h1
            className="font-display text-[clamp(2.5rem,5vw,4rem)] text-bg-warm leading-[1.0] tracking-[-0.02em] mb-4 tools-header"
            data-reveal
          >
            {aiToolsPage.title}
          </h1>
          <p
            className="font-body text-lg text-text-muted max-w-[560px] tools-header"
            data-reveal
          >
            {aiToolsPage.intro}
          </p>
        </div>
      </div>

      {/* Tools list — warm bg */}
      <div className="bg-bg-warm py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Filter chips */}
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            {aiToolsPage.filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setExpandedIndex(null);
                }}
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

          {/* Tool detail cards */}
          <div className="space-y-6">
            {visibleTools.map((tool, index) => {
              const isOpen = expandedIndex === index;
              return (
                <div
                  key={tool.name}
                  className="tool-detail-card bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:border-text-muted-light transition-all duration-300"
                  data-reveal
                >
                  {/* Card header — always visible */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{tool.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="font-body font-semibold text-xl md:text-2xl text-bg-dark">
                            {tool.name}
                          </h2>
                          <span className="font-mono text-[0.625rem] text-text-secondary bg-bg-cream px-2 py-0.5 rounded">
                            {tool.badge}
                          </span>
                          <span className="font-mono text-[0.625rem] text-text-muted uppercase tracking-wider">
                            {tool.category}
                          </span>
                        </div>
                        <p className="font-body text-base text-text-secondary mt-2 max-w-[640px]">
                          {tool.blurb}
                        </p>
                      </div>
                      {/* Expand/collapse toggle */}
                      <button
                        onClick={() => toggleExpand(index)}
                        aria-label={isOpen ? "Collapse" : "Expand"}
                        className="flex-shrink-0 w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:bg-bg-warm transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                      </button>
                    </div>

                    {/* Best For + Pricing always visible */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border-subtle">
                      <div>
                        <span className="font-mono text-[0.625rem] text-text-muted uppercase tracking-wider block">
                          Best For
                        </span>
                        <span className="font-body text-sm text-bg-dark">
                          {tool.bestFor}
                        </span>
                      </div>
                      <div className="w-px h-8 bg-border-subtle hidden sm:block" />
                      <div>
                        <span className="font-mono text-[0.625rem] text-text-muted uppercase tracking-wider block">
                          Pricing
                        </span>
                        <span className="font-body text-sm text-bg-dark">
                          {tool.pricing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded detail section */}
                  <div
                    className="overflow-hidden transition-all duration-400 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "1000px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-6 md:px-8 pb-8 border-t border-border-subtle pt-6">
                      {/* Why I Use It + My Workflow */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-mono text-[0.625rem] text-accent-teal uppercase tracking-wider mb-2">
                            Why I Use It
                          </h4>
                          <p className="font-body text-sm text-text-secondary leading-relaxed">
                            {tool.whyIUseIt}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-mono text-[0.625rem] text-accent-teal uppercase tracking-wider mb-2">
                            My Workflow
                          </h4>
                          <p className="font-body text-sm text-text-secondary leading-relaxed">
                            {tool.workflow}
                          </p>
                        </div>
                      </div>

                      {/* Pros + Cons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div>
                          <h4 className="font-mono text-[0.625rem] text-accent-amber uppercase tracking-wider mb-2">
                            Pros
                          </h4>
                          <ul className="space-y-1">
                            {tool.pros.map((pro) => (
                              <li key={pro} className="flex items-start gap-2">
                                <span className="text-accent-amber mt-0.5">+</span>
                                <span className="font-body text-sm text-text-secondary">
                                  {pro}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-mono text-[0.625rem] text-text-muted uppercase tracking-wider mb-2">
                            Cons
                          </h4>
                          <ul className="space-y-1">
                            {tool.cons.map((con) => (
                              <li key={con} className="flex items-start gap-2">
                                <span className="text-text-muted mt-0.5">–</span>
                                <span className="font-body text-sm text-text-secondary">
                                  {con}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA link */}
                      <div className="mt-6 pt-6 border-t border-border-subtle">
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-body font-medium text-sm text-bg-dark hover:text-accent-teal transition-colors"
                        >
                          {tool.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
