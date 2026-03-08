import { useState, useEffect, useRef } from "react";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

const TextScramble = ({ text, className = "", delay = 0, duration = 1200, trigger = true }: TextScrambleProps) => {
  const [displayed, setDisplayed] = useState(text);
  const [started, setStarted] = useState(false);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayed(text.replace(/[^ ]/g, " "));
      return;
    }

    const timeout = setTimeout(() => {
      setStarted(true);
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const result = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const charProgress = i / text.length;
            if (progress > charProgress + 0.3) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setDisplayed(result);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayed(text);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, delay, duration, trigger]);

  return <span className={className}>{displayed}</span>;
};

export default TextScramble;
