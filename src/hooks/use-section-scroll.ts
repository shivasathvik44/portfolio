import { useEffect } from "react";

const sectionIds = ["hero", "about", "toolkit", "work", "contact"];

/** Experimental wheel navigation; native touch and keyboard scrolling stay available. */
export function useSectionScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let animating = false;
    let swallowingMomentum = false;
    let lastWheel = 0;
    let accumulated = 0;

    const travelTo = (destination: number) => {
      const start = window.scrollY;
      const limit = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const target = Math.min(limit, Math.max(0, destination));
      const started = performance.now();
      animating = true;
      swallowingMomentum = true;

      const tick = (now: number) => {
        const progress = Math.min((now - started) / 2200, 1);
        const eased = progress * progress * (3 - 2 * progress);
        window.scrollTo({ top: start + (target - start) * eased, behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else { frame = 0; animating = false; }
      };
      frame = requestAnimationFrame(tick);
    };

    const cancel = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      animating = false;
      swallowingMomentum = false;
      accumulated = 0;
    };

    const onWheel = (event: WheelEvent) => {
      if (reducedMotion.matches || event.ctrlKey || event.metaKey ||
          Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY ||
          document.body.style.overflow === "hidden") return;

      // Forms and independently scrollable panels keep their normal interaction.
      let element = event.target instanceof Element ? event.target : null;
      if (element?.closest("input, textarea, select, [contenteditable='true'], [role='dialog']")) return;
      while (element && element !== document.body) {
        if (/(auto|scroll)/.test(getComputedStyle(element).overflowY) &&
            element.scrollHeight > element.clientHeight + 1) return;
        element = element.parentElement;
      }

      const now = performance.now();
      const freshGesture = now - lastWheel > 180;
      lastWheel = now;
      if (animating || (swallowingMomentum && !freshGesture)) {
        event.preventDefault();
        return;
      }
      swallowingMomentum = false;
      if (freshGesture) accumulated = 0;

      const sections = sectionIds.flatMap((id) => {
        const node = document.getElementById(id);
        if (!node) return [];
        const top = node.getBoundingClientRect().top + window.scrollY;
        return [{ id, top: Math.max(0, top - (id === "hero" || id === "work" ? 0 : 72)),
          bottom: top + node.offsetHeight }];
      });
      const position = window.scrollY;
      let current = 0;
      sections.forEach((section, index) => {
        if (position >= section.top - 3) current = index;
      });
      const section = sections[current];
      if (!section) return;
      const direction = Math.sign(event.deltaY);

      // Traverse the entire sticky project gallery before moving to Contact.
      // Tall sections also retain native scrolling until their content is visible.
      const hasMoreBelow = position + window.innerHeight < section.bottom - 3;
      const hasMoreAbove = position > section.top + 3;
      if ((direction > 0 && hasMoreBelow) || (direction < 0 && hasMoreAbove)) {
        accumulated = 0;
        return;
      }
      const next = sections[current + direction];
      if (!next) return;
      event.preventDefault();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      if (Math.sign(accumulated) !== direction) accumulated = 0;
      accumulated += delta;
      if (Math.abs(accumulated) < 18) return;
      accumulated = 0;
      // Enter Work from below at its last project, so upward browsing remains natural.
      travelTo(direction < 0 && next.id === "work"
        ? Math.max(next.top, next.bottom - window.innerHeight)
        : next.top);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", cancel);
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    window.addEventListener("resize", cancel);
    reducedMotion.addEventListener("change", cancel);
    return () => {
      cancel();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("resize", cancel);
      reducedMotion.removeEventListener("change", cancel);
    };
  }, [enabled]);
}
