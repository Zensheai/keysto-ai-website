import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../../content";

gsap.registerPlugin(ScrollTrigger);

const { system } = site;

// The original alternates row direction: 01=flex-row, 02=flex-row-reverse, 03=flex-row
const rowDirections = ["md:flex-row", "md:flex-row-reverse", "md:flex-row"];
// 01 and 03 use accent-amber number badge; 02 uses accent-teal
const badgeColors = ["bg-accent-amber", "bg-accent-teal", "bg-accent-amber"];

export default function TheSystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Header fades up from 40px below on entrance
      gsap.from(".workflow-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });

      // 2. Gradient timeline line draws top→bottom, tied to scroll
      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // 4. Dots spring/pop into place with a slight overshoot
      gsap.utils.toArray<HTMLElement>(".phase-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0, xPercent: -50 },
          {
            scale: 1,
            opacity: 1,
            xPercent: -50,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: { trigger: dot, start: "top 85%" },
          }
        );
      });
    }, el);

    // 3. Cards slide in from alternating sides (up from below on mobile)
    const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".phase-card"));
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -80 : 80,
          scale: 0.92,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        });
      });
    });
    mm.add("(max-width: 767px)", () => {
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          scale: 0.92,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="workflow"
      className="bg-bg-dark py-[clamp(5rem,10vh,8rem)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="workflow-header text-center mb-16 md:mb-20">
          <p className="font-mono text-xs text-accent-amber uppercase tracking-[0.1em] mb-3">
            {system.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-bg-warm leading-[1.05] tracking-[-0.01em]">
            {system.title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track line */}
          <div className="timeline-track absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <div className="w-full h-full bg-border-dark"></div>
            <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-accent-amber via-accent-teal to-accent-amber origin-top"></div>
          </div>

          {/* Phase cards */}
          <div className="space-y-12 md:space-y-20">
            {system.steps.map((step, i) => (
              <div
                key={step.n}
                className={`phase-card relative flex items-start gap-6 md:gap-12 ${rowDirections[i]}`}
              >
                {/* Timeline dot */}
                <div className="phase-dot absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-dark border-2 border-accent-amber z-10 top-8 md:top-10 shadow-[0_0_12px_rgba(245,158,11,0.4)]"></div>

                {/* Spacer (desktop only, opposite side) */}
                <div className="hidden md:block md:w-1/2"></div>

                {/* Card */}
                <div className="pl-14 md:pl-0 md:w-1/2">
                  <div className="group bg-surface-dark border border-border-dark rounded-2xl p-6 md:p-8 hover:border-text-muted transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className={`${badgeColors[i]} w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold text-bg-dark`}
                      >
                        {step.n}
                      </span>
                      <h3 className="font-body font-semibold text-2xl md:text-3xl text-bg-warm">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-body text-base md:text-lg text-text-muted leading-relaxed max-w-[400px]">
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="phases-summary mt-16 md:mt-20 text-center">
          <p className="font-display text-xl md:text-2xl text-bg-warm max-w-[500px] mx-auto leading-snug">
            {system.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
