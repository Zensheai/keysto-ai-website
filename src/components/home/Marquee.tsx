import { site } from "../../content";

// One "run" repeated wide enough to exceed any viewport, then rendered twice in
// the track so the -50% CSS animation loops seamlessly (see theme.css).
const run = [...site.marquee, ...site.marquee, ...site.marquee, ...site.marquee];

function Item({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <span
        className="font-mono"
        style={{
          fontSize: 13,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--c-navy-500)",
        }}
      >
        {label}
      </span>
      <span aria-hidden="true" style={{ color: "var(--c-terracotta)", margin: "0 30px", fontSize: 9 }}>
        ◆
      </span>
    </span>
  );
}

export default function Marquee() {
  return (
    <div
      className="kta-marquee"
      aria-label="What Keys to AI is about"
      style={{
        background: "var(--c-champagne)",
        borderTop: "1px solid rgba(13,27,42,0.08)",
        borderBottom: "1px solid rgba(13,27,42,0.08)",
        overflow: "hidden",
        padding: "14px 0",
      }}
    >
      <div className="kta-marquee-track">
        {[...run, ...run].map((label, i) => (
          <Item key={i} label={label} />
        ))}
      </div>
    </div>
  );
}
