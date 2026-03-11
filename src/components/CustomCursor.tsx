import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const frameRef = useRef<number | null>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState<"white" | "black">("white");
  const [cursorLabel, setCursorLabel] = useState("View");

  const getBackgroundLuminance = (element: HTMLElement | null) => {
    let current: HTMLElement | null = element;

    while (current && current !== document.documentElement) {
      const color = getComputedStyle(current).backgroundColor;
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

      if (match) {
        const red = Number(match[1]);
        const green = Number(match[2]);
        const blue = Number(match[3]);
        const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

        if (color.startsWith("rgb(")) return luminance;

        const alphaMatch = color.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/i);
        const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
        if (alpha > 0.1) return luminance;
      }

      current = current.parentElement;
    }

    return 0;
  };

  useEffect(() => {
    const isCursorTarget = (element: HTMLElement | null) =>
      !!element?.closest("a, button, [data-cursor-view], [data-cursor-label]");

    const move = (e: MouseEvent) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        const luminance = getBackgroundLuminance(target);
        setCursorColor(luminance > 0.5 ? "black" : "white");
      });

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest<HTMLElement>("a, button, [data-cursor-view], [data-cursor-label]");

      if (cursorTarget) {
        setHovering(true);
        setCursorLabel(cursorTarget.getAttribute("data-cursor-label") || "View");
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;

      if (isCursorTarget(related)) return;

      if (isCursorTarget(target)) {
        setHovering(false);
        setCursorLabel("View");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY, visible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full border border-foreground/60 flex items-center justify-center"
        animate={{
          width: hovering ? 72 : 10,
          height: hovering ? 72 : 10,
          backgroundColor: cursorColor === "white"
            ? hovering
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,1)"
            : hovering
              ? "rgba(0,0,0,0.15)"
              : "rgba(0,0,0,1)",
          borderColor: cursorColor === "white" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="font-mono text-[9px] tracking-[0.2em] uppercase"
          style={{ color: cursorColor === "white" ? "#ffffff" : "#000000" }}
          animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
          transition={{ duration: 0.25 }}
        >
          {cursorLabel}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
