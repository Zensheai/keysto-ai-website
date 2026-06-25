import { site } from "../../content";

const { toolsLibrary } = site;

export default function ToolsLibrary() {
  return (
    <section id="tools" className="bg-bg-warm py-[clamp(5rem,10vh,8rem)]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6" data-reveal>
          <div>
            <p className="font-mono text-xs text-accent-teal uppercase tracking-[0.1em] mb-3">
              {toolsLibrary.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-bg-dark leading-[1.05] tracking-[-0.01em]">
              {toolsLibrary.title}
            </h2>
          </div>
          <a
            href={toolsLibrary.cta.href}
            className="font-body font-medium text-sm text-bg-dark hover:text-accent-teal transition-colors duration-200 mt-4 md:mt-0"
          >
            {toolsLibrary.cta.label}
          </a>
        </div>

        {/* Intro */}
        <p className="font-body text-base text-text-secondary max-w-[640px] mb-10" data-reveal>
          <span className="font-body font-medium text-bg-dark">Inside Simone's creator operating system.</span>{" "}
          {toolsLibrary.intro.replace("Inside Simone's creator operating system. ", "")}
        </p>

        {/* Tool cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolsLibrary.tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-surface border border-border-subtle rounded-2xl p-5 hover:border-accent-teal hover:shadow-glow-teal hover:-translate-y-0.5 transition-all duration-250" data-reveal
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{tool.icon}</span>
                <h3 className="font-body font-semibold text-base text-bg-dark flex-1">
                  {tool.homeName}
                </h3>
                <span className="font-mono text-[0.625rem] text-text-secondary bg-bg-cream px-2 py-0.5 rounded">
                  {tool.badge}
                </span>
              </div>
              <p className="font-mono text-[0.625rem] text-text-muted uppercase tracking-wider mb-2">
                {tool.category}
              </p>
              <p className="font-body text-sm text-text-secondary line-clamp-2 leading-relaxed mb-3">
                {tool.blurb}
              </p>
              <p className="font-mono text-[0.6875rem] text-text-muted">
                {tool.homeOneLiner}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
