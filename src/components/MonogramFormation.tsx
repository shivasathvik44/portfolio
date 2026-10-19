import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { monogramCells, monogramFontSize } from "@/lib/monogram";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const random = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

/** A viewport layer connects the hero's floating glyphs to the actual Info artwork. */
const MonogramFormation = () => {
  const overlayRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const overlay = overlayRef.current;
    const destination = document.querySelector<SVGSVGElement>("#info-monogram");
    const about = document.getElementById("about");
    const letters = destination?.querySelector<SVGGElement>("[data-monogram-letters]");
    if (!overlay || !destination || !about || !letters) return;
    const particles = Array.from(overlay.querySelectorAll("text"));
    let frame = 0;
    let previousTime = 0;
    let pointer: { x: number; y: number } | null = null;
    const offsets = monogramCells.map(() => ({ x: 0, y: 0 }));

    const render = (now: number) => {
      frame = 0;
      if (document.hidden) return;
      const aboutTop = about.getBoundingClientRect().top + window.scrollY;
      const progress = clamp(window.scrollY / Math.max(1, aboutTop - 72));
      if (progress >= 0.998) {
        overlay.style.visibility = "hidden";
        letters.style.visibility = "";
        destination.dataset.assembling = "false";
        return;
      }
      const matrix = destination.getScreenCTM();
      if (!matrix) return;
      overlay.style.visibility = "visible";
      letters.style.visibility = "hidden";
      destination.dataset.assembling = "true";
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.hypot(matrix.a, matrix.b);
      const time = now / 1000;
      const elapsed = previousTime ? Math.min(now - previousTime, 64) : 16;
      previousTime = now;
      const easing = 1 - Math.exp(-elapsed / 100);

      monogramCells.forEach((cell, index) => {
        const seed = index + 1;
        // Stable random positions fill the hero, with room for the drifting glyphs.
        const startX = 32 + random(seed) * Math.max(0, width - 64);
        const startY = 100 + random(seed + 200) * Math.max(0, height - 160);
        const floatX = Math.sin(time * 0.7 + seed) * 24;
        const floatY = Math.cos(time * 0.55 + seed * 2) * 28;
        const delay = random(seed + 400) * 0.13;
        const local = clamp((progress - delay) / (1 - delay));
        const blend = local * local * (3 - 2 * local);
        const target = new DOMPoint(cell.x, cell.y).matrixTransform(matrix);
        const arc = Math.sin(blend * Math.PI) * (random(seed + 600) - 0.5) * 110;
        const x = (startX + floatX) * (1 - blend) + target.x * blend + arc;
        const y = (startY + floatY) * (1 - blend) + target.y * blend;
        const dx = pointer ? pointer.x - x : 0;
        const dy = pointer ? pointer.y - y : 0;
        const influence = pointer ? Math.max(0, 1 - Math.hypot(dx, dy) / 180) : 0;
        const pull = influence * influence * 1.4;
        const offset = offsets[index];
        offset.x += (dx * pull - offset.x) * easing;
        offset.y += (dy * pull - offset.y) * easing;
        // Release the cursor's influence as the characters assemble into SS.
        const particle = particles[index];
        particle.setAttribute("x", String(x + offset.x * (1 - blend)));
        particle.setAttribute("y", String(y + offset.y * (1 - blend)));
        particle.setAttribute("font-size", String(19 * (1 - blend) + monogramFontSize * scale * blend));
        particle.setAttribute("opacity", String(cell.opacity));
      });
      frame = requestAnimationFrame(render);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
    };
    const release = () => { pointer = null; };
    wake();
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    window.addEventListener("scroll", release, { passive: true });
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    document.addEventListener("visibilitychange", wake);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      window.removeEventListener("scroll", release);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      document.removeEventListener("visibilitychange", wake);
      letters.style.visibility = "";
      delete destination.dataset.assembling;
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return (
    <svg
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-20 h-full w-full pointer-events-none text-primary font-mono"
      style={{ visibility: "hidden" }}
    >
      <g fill="currentColor" fontWeight="700" textAnchor="middle">
        {monogramCells.map((cell) => <text key={cell.id}>{cell.character}</text>)}
      </g>
    </svg>
  );
};

export default MonogramFormation;
