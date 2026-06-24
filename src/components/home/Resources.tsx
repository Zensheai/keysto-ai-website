import { useState } from "react";
import { site } from "../../content";
import { subscribe } from "../../lib/subscribe";

const { resources } = site;

type ResourceItem = {
  icon: string;
  tag: string;
  title: string;
  desc: string;
  cta: string;
  file: string;
  group: string;
};

function ResourceCard({ item }: { item: ResourceItem }) {
  const [stage, setStage] = useState<"idle" | "form" | "done">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Please enter your first name.");
      return;
    }
    setLoading(true);
    const result = await subscribe(email, item.group || undefined, name.trim());
    setLoading(false);
    if (result.ok) {
      setStage("done");
      // Soft gate: deliver instantly by opening the resource in a new tab.
      window.open(item.file, "_blank", "noopener");
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="resource-card" data-reveal>
      <div className="resource-card__content">
        <span className="text-accent-amber text-xl mb-3 block">{item.icon}</span>
        <p className="font-mono text-[0.625rem] text-text-muted uppercase tracking-wider mb-2">
          {item.tag}
        </p>
        <h3 className="font-body font-semibold text-lg text-bg-warm mb-2">{item.title}</h3>
        <p className="font-body text-sm text-text-muted line-clamp-2 leading-relaxed mb-4">
          {item.desc}
        </p>

        {stage === "idle" && (
          <button
            onClick={() => setStage("form")}
            className="font-body font-medium text-sm text-accent-amber hover:underline underline-offset-4 cursor-pointer bg-transparent border-none p-0"
          >
            {item.cta}
          </button>
        )}

        {stage === "form" && (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <input
              type="text"
              required
              value={name}
              placeholder="First name"
              aria-label={`First name to personalize ${item.title}`}
              autoComplete="given-name"
              onChange={(e) => setName(e.target.value)}
              className="font-body text-sm"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1.5px solid rgba(240,230,200,0.25)",
                background: "rgba(240,230,200,0.06)",
                color: "#F0E6C8",
                outline: "none",
              }}
            />
            <input
              type="email"
              required
              value={email}
              placeholder="you@yourbusiness.com"
              aria-label={`Email to receive ${item.title}`}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              className="font-body text-sm"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1.5px solid rgba(240,230,200,0.25)",
                background: "rgba(240,230,200,0.06)",
                color: "#F0E6C8",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="submit"
                disabled={loading}
                className="font-body font-medium text-sm"
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: loading ? "default" : "pointer",
                  background: "#C4603A",
                  color: "#fff",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Sending…" : "Email it to me"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStage("idle");
                  setError(null);
                  setName("");
                }}
                className="font-body text-sm"
                style={{
                  padding: "10px 12px",
                  borderRadius: "10px",
                  border: "1.5px solid rgba(240,230,200,0.25)",
                  background: "transparent",
                  color: "rgba(240,230,200,0.7)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
            {error && (
              <p className="font-body" style={{ color: "#E8A87C", fontSize: "0.8rem" }}>
                {error}
              </p>
            )}
          </form>
        )}

        {stage === "done" && (
          <div className="font-body text-sm" style={{ color: "#F0E6C8" }}>
            <span style={{ fontWeight: 700 }}>You're on the list! ✓</span>
            <span style={{ display: "block", color: "rgba(240,230,200,0.75)", marginTop: "2px" }}>
              Your resource just opened in a new tab.{" "}
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#E8A87C", textDecoration: "underline" }}
              >
                Open it again
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

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
            <ResourceCard key={i} item={item as ResourceItem} />
          ))}
        </div>
      </div>
    </section>
  );
}
