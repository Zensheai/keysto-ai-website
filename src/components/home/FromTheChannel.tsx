import { site } from "../../content";

const { channel } = site;

export default function FromTheChannel() {
  return (
    <section
      id="tutorials"
      className="bg-bg-warm py-[clamp(5rem,10vh,8rem)]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12 section-entrance">
          <p className="font-mono text-xs text-accent-teal uppercase tracking-[0.1em] mb-3">
            {channel.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-bg-dark leading-[1.05] tracking-[-0.01em]">
            {channel.title}
          </h2>
        </div>

        {/* Tutorial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channel.tutorials.map((tutorial) => (
            <a
              key={tutorial.title}
              href={tutorial.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-card hover:border-text-muted-light transition-all duration-300 section-entrance"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  alt={tutorial.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  src={tutorial.image}
                />
              </div>
              <div className="p-5">
                <span className="font-mono text-[0.6875rem] text-accent-teal uppercase tracking-wider">
                  {tutorial.badge}
                </span>
                <h3 className="font-body font-medium text-lg text-bg-dark mt-2 line-clamp-2 leading-snug">
                  {tutorial.title}
                </h3>
                <p className="font-body text-sm text-text-secondary mt-2 line-clamp-2 leading-relaxed">
                  {tutorial.blurb}
                </p>
                <span className="inline-block font-body font-medium text-sm text-bg-dark mt-4 group-hover:text-accent-teal transition-colors duration-200">
                  {tutorial.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
