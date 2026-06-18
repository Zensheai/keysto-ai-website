import { useState } from "react";
import { site } from "../../content";
import { subscribe } from "../../lib/subscribe";

const { newsletter } = site;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    const result = await subscribe(email);
    setIsSuccess(result.ok);
    setMessage(result.message);
    setIsLoading(false);
    if (result.ok) setEmail("");
  }

  return (
    <section id="newsletter" className="bg-bg-warm py-[clamp(5rem,10vh,8rem)]">
      <div className="max-w-[800px] mx-auto px-6">
        <div
          className="relative bg-gradient-to-br from-accent-teal to-[#0d9488] rounded-3xl p-[clamp(2.5rem,5vw,4rem)] overflow-hidden"
          data-reveal
        >
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <p className="font-mono text-xs text-white/70 uppercase tracking-[0.1em] mb-3">
              {newsletter.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-white leading-tight mb-4">
              {newsletter.title}
            </h2>
            <p className="font-body text-base text-white/85 max-w-[480px] mx-auto mb-8">
              <span className="font-body font-medium text-white">
                Simone's weekly pick:
              </span>{" "}
              {newsletter.desc.replace("Simone's weekly pick: ", "")}
            </p>

            {/* Form */}
            <form
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder={newsletter.placeholder}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 bg-white/15 border border-white/25 rounded-lg px-4 py-3.5 text-white placeholder:text-white/50 font-body text-sm focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-bg-dark text-bg-warm font-body font-medium text-sm px-6 py-3.5 rounded-lg hover:bg-surface-dark transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
              >
                {isLoading ? "Sending…" : newsletter.button}
              </button>
            </form>

            {/* Inline feedback message */}
            {message && (
              <p
                className={`font-body text-sm mt-4 ${
                  isSuccess ? "text-white" : "text-white/70"
                }`}
              >
                {message}
              </p>
            )}

            {!message && (
              <p className="font-mono text-xs text-white/50 mt-4">
                {newsletter.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
