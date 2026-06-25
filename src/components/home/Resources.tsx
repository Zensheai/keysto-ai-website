import { useState } from "react";
import { site } from "../../content";
import { subscribe } from "../../lib/subscribe";

const { resources } = site;

type ResourceItem = {
  icon: string;
  iconKey: string;
  tag: string;
  title: string;
  desc: string;
  cta: string;
  file: string;
  group: string;
};

// Custom geometric line icons (one per resource), terracotta to match the
// section accent. Replaces the OS-rendered emoji for a consistent brand look.
const ICON_PATHS: Record<string, React.ReactNode> = {
  calendar: (
    <>
      <path d="M8 3v3" /><path d="M16 3v3" />
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17" /><path d="M9.3 9.5v11" /><path d="M14.7 9.5v11" /><path d="M3.5 14h17" />
    </>
  ),
  clipboard: (
    <>
      <rect x="9" y="2.5" width="6" height="3.5" rx="1.2" />
      <path d="M9 4H6.5A1.5 1.5 0 0 0 5 5.5v14A1.5 1.5 0 0 0 6.5 21h11A1.5 1.5 0 0 0 19 19.5v-14A1.5 1.5 0 0 0 17.5 4H15" />
      <path d="M8.5 12.7l2.2 2.2 4.4-4.7" />
    </>
  ),
  command: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M8 9.5l3 2.5-3 2.5" /><path d="M13 14.5h4" />
    </>
  ),
  play: (
    <>
      <path d="M5 6.5v9l7-4.5z" />
      <circle cx="18" cy="7" r="1.7" /><circle cx="18" cy="16" r="1.7" />
      <path d="M12.8 10.4l3.8-2.6" /><path d="M12.8 11.8l3.8 3.1" />
    </>
  ),
  calculator: (
    <>
      <rect x="5.5" y="3" width="13" height="18" rx="2.2" />
      <rect x="8" y="5.5" width="8" height="3.5" rx="1" />
      <circle cx="9" cy="13" r="1" /><circle cx="12" cy="13" r="1" /><circle cx="15" cy="13" r="1" />
      <circle cx="9" cy="17" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="15" cy="17" r="1" />
    </>
  ),
};

function ResourceIcon({ iconKey }: { iconKey: string }) {
  return (
    <span
      className="resource-icon"
      style={{
        display: "inline-flex",
        width: 40,
        height: 40,
        borderRadius: 11,
        background: "rgba(196,96,58,0.12)",
        color: "#C4603A",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICON_PATHS[iconKey]}
      </svg>
    </span>
  );
}

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
    <div
      className="resource-card"
      data-reveal
      style={item.tag === "UPDATED THIS WEEK" ? { boxShadow: "inset 0 0 0 1px rgba(196,96,58,0.5)" } : undefined}
    >
      <div className="resource-card__content">
        <ResourceIcon iconKey={item.iconKey} />
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
            {item.cta.replace(/\s*→\s*$/, "")} <span className="resource-arrow">→</span>
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
      <style>{`.resource-icon{transition:transform .2s ease}.resource-card:hover .resource-icon{transform:translateY(-3px)}.resource-arrow{display:inline-block;transition:transform .2s ease}.resource-card:hover .resource-arrow{transform:translateX(4px)}.resource-card:hover:before,.resource-card:hover:after{opacity:0}`}</style>
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
