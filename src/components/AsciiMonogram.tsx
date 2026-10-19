import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { monogramCells as cells, monogramFontSize } from "@/lib/monogram";

const AsciiMonogram = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reducedMotion) return;

    const letters = Array.from(svg.querySelectorAll<SVGTextElement>(".ascii-monogram-character"));
    const offsets = cells.map(() => ({ x: 0, y: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let previousTime = 0;
    const radius = 90;

    const animate = (now: number) => {
      const elapsed = previousTime ? Math.min(now - previousTime, 64) : 16;
      previousTime = now;
      const easing = 1 - Math.exp(-elapsed / 85);
      let moving = false;

      cells.forEach((cell, index) => {
        // Measure from each character's resting center so the field stays stable.
        const dx = pointer ? pointer.x - cell.x : 0;
        const dy = pointer ? pointer.y - (cell.y - 6) : 0;
        const distance = Math.hypot(dx, dy);
        const influence = pointer ? Math.max(0, 1 - distance / radius) : 0;
        const pull = influence * influence * 0.85;
        const targetX = dx * pull;
        const targetY = dy * pull;
        const offset = offsets[index];
        offset.x += (targetX - offset.x) * easing;
        offset.y += (targetY - offset.y) * easing;

        if (Math.abs(targetX - offset.x) + Math.abs(targetY - offset.y) > 0.02) {
          moving = true;
        } else {
          offset.x = targetX;
          offset.y = targetY;
        }
        letters[index].setAttribute("transform", `translate(${offset.x}, ${offset.y})`);
      });

      frame = moving ? requestAnimationFrame(animate) : 0;
      if (!moving) previousTime = 0;
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || svg.dataset.assembling === "true") return;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      // Convert viewport coordinates into the SVG's responsive viewBox space.
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      pointer = { x: point.x, y: point.y };
      start();
    };
    const release = () => {
      pointer = null;
      start();
    };

    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", release);
    svg.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    window.addEventListener("scroll", release, true);
    window.addEventListener("resize", release);
    return () => {
      cancelAnimationFrame(frame);
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", release);
      svg.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      window.removeEventListener("scroll", release, true);
      window.removeEventListener("resize", release);
      letters.forEach((letter) => letter.removeAttribute("transform"));
    };
  }, [reducedMotion]);

  return (
  <figure className="ascii-monogram relative w-full max-w-[560px] mx-auto select-none">
    <svg
      ref={svgRef}
      id="info-monogram"
      viewBox="12 20 456 290"
      role="img"
      aria-labelledby="monogram-title"
      className="block w-full overflow-visible text-primary"
    >
      <title id="monogram-title">Fictional person — experimental ASCII portrait</title>
      <path
        d="M16 42V20H38 M442 20H464V42 M16 288V310H38 M442 310H464V288"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <g data-monogram-letters aria-hidden="true" fill="currentColor" className="font-mono" fontSize={monogramFontSize} fontWeight="700" textAnchor="middle">
        {cells.map((cell) => (
          <text
            key={cell.id}
            x={cell.x}
            y={cell.y}
            opacity={cell.opacity}
            className="ascii-monogram-character"

          >
            {cell.character}
          </text>
        ))}
      </g>
      <path d="M36 288H444" stroke="currentColor" strokeOpacity="0.12" />
    </svg>
    <figcaption className="flex justify-between px-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
      <span>ASCII / Portrait study</span>
      <span className="text-primary/60">Code / Security / Systems</span>
    </figcaption>
  </figure>
  );
};

export default AsciiMonogram;
