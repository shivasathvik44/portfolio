import { useState, useEffect, useCallback } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [count, setCount] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 2200; // total count duration ms
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setSplitting(true), 300);
        setTimeout(() => {
          setHidden(true);
          onComplete();
        }, 1400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (hidden) return null;

  const formatted = count.toString().padStart(3, "0");

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Left curtain */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-background flex items-center justify-end ${splitting ? "curtain-left" : ""}`}
      >
        {!splitting && (
          <span className="font-mono text-[clamp(4rem,15vw,12rem)] font-light text-foreground tracking-tighter pr-0 select-none">
            {formatted[0]}{formatted[1]}
          </span>
        )}
      </div>

      {/* Right curtain */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-background flex items-center justify-start ${splitting ? "curtain-right" : ""}`}
      >
        {!splitting && (
          <span className="font-mono text-[clamp(4rem,15vw,12rem)] font-light text-foreground tracking-tighter pl-0 select-none">
            {formatted[2]}
          </span>
        )}
      </div>

      {/* Center line accent */}
      {!splitting && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-12">
          <div className="w-16 h-px bg-primary opacity-40" />
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
