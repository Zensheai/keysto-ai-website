import gsap from "gsap";

// Reveal-on-scroll for two mechanisms used across the site:
//   1. `[data-reveal]`      — animated via GSAP (opacity/translate set in JS).
//   2. `.section-entrance`  — the original's class; CSS animates it once the
//                             `.visible` class is added (`.section-entrance.visible`).
// Both reveal once. Elements already in or above the viewport on mount are shown
// immediately (no animation) so nothing above the fold is ever stuck hidden.
export function initReveals(): () => void {
  const observers: IntersectionObserver[] = [];
  const vh = window.innerHeight || document.documentElement.clientHeight;

  // ── 1. [data-reveal] (GSAP) ──
  const gsapEls = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const toAnimate: HTMLElement[] = [];
  gsapEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      gsap.set(el, { opacity: 1, y: 0 }); // already visible — show now
    } else if (rect.bottom <= 0) {
      gsap.set(el, { opacity: 1, y: 0 }); // scrolled past — show now
    } else {
      gsap.set(el, { opacity: 0, y: 24 }); // below the fold — animate in
      toAnimate.push(el);
    }
  });
  if (toAnimate.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0 }
    );
    toAnimate.forEach((el) => obs.observe(el));
    observers.push(obs);
  }

  // ── 2. .section-entrance (CSS class toggle) ──
  const cssEls = Array.from(document.querySelectorAll<HTMLElement>(".section-entrance"));
  const toReveal: HTMLElement[] = [];
  cssEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh) {
      el.classList.add("visible"); // in or above viewport — reveal now
    } else {
      toReveal.push(el); // below the fold — reveal on scroll-in
    }
  });
  if (toReveal.length) {
    const obs2 = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs2.unobserve(entry.target);
          }
        }
      },
      { threshold: 0 }
    );
    toReveal.forEach((el) => obs2.observe(el));
    observers.push(obs2);
  }

  return () => observers.forEach((o) => o.disconnect());
}
