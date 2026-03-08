import { useEffect, useRef } from "react";

const COLS = 28;
const ROWS = 16;
const DOT_SIZE = 1.5;
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 25;
const RETURN_SPEED = 0.04;

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dotsRef = useRef<Dot[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Rebuild dots
      const spacingX = rect.width / (COLS + 1);
      const spacingY = rect.height / (ROWS + 1);
      const dots: Dot[] = [];
      for (let r = 1; r <= ROWS; r++) {
        for (let c = 1; c <= COLS; c++) {
          dots.push({
            ox: c * spacingX,
            oy: r * spacingY,
            x: c * spacingX,
            y: r * spacingY,
            vx: 0,
            vy: 0,
          });
        }
      }
      dotsRef.current = dots;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          dot.vx += (dx / dist) * force * 0.02;
          dot.vy += (dy / dist) * force * 0.02;
        }

        // Spring back
        dot.vx += (dot.ox - dot.x) * RETURN_SPEED;
        dot.vy += (dot.oy - dot.y) * RETURN_SPEED;

        // Damping
        dot.vx *= 0.85;
        dot.vy *= 0.85;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw
        const distFromOrigin = Math.sqrt(
          (dot.x - dot.ox) ** 2 + (dot.y - dot.oy) ** 2
        );
        const alpha = Math.min(0.12 + distFromOrigin * 0.008, 0.35);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 110, ${alpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.6 }}
    />
  );
};

export default DotGrid;
