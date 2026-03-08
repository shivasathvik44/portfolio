import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticWrapProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

const MagneticWrap = ({ children, className = "", strength = 0.3 }: MagneticWrapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 15, stiffness: 200 });
  const y = useSpring(0, { damping: 15, stiffness: 200 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrap;
