import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import DotGrid from "@/components/DotGrid";

const words = ["SHIVA", "SATHVIK"];

// Each letter follows its own path, driven only by scroll position.
const BreakawayLetter = ({ letter, index, row, progress, loaded }: {
  letter: string;
  index: number;
  row: number;
  progress: MotionValue<number>;
  loaded: boolean;
}) => {
  const reducedMotion = useReducedMotion();
  const seed = index * 7 + row * 11;
  const start = 0.003 + (seed % 5) * 0.003;
  const end = 0.36 + (seed % 4) * 0.015;
  const breakPoint = 0.09 + (seed % 4) * 0.008;
  const x = useTransform(progress, [start, breakPoint, end], ["0em", `${((seed % 7) - 3) * 0.13}em`, `${((seed % 7) - 3) * 0.2}em`]);
  const y = useTransform(progress, [start, breakPoint, end], ["0vh", `${-6 - (seed % 5) * 3}vh`, `${-32 - (seed % 5) * 7}vh`]);
  const rotate = useTransform(progress, [start, breakPoint, end], [0, ((seed % 9) - 4) * 4, ((seed % 9) - 4) * 6]);
  const opacity = useTransform(progress, [start, 0.16, end], [1, 1, 0]);

  return (
    <motion.span
      className="inline-block"
      style={reducedMotion ? undefined : { x, y, rotate, opacity }}
    >
      {reducedMotion ? letter : (
        <TextScramble text={letter} delay={300 + row * 200 + index * 30} duration={1000} trigger={loaded} />
      )}
    </motion.span>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const reducedMotion = useReducedMotion();
  const captionOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden relative">
      {/* Dot grid background */}
      <div className="absolute inset-0 z-0">
        <DotGrid />
      </div>

      <div className="max-w-full relative z-10">
        <h1
          aria-label="Shiva Sathvik"
          className="-mx-1 md:-mx-6 font-heading text-[clamp(2.5rem,13vw,13rem)] font-extrabold leading-[0.85] tracking-tighter text-foreground"
        >
          {words.map((word, row) => (
            <span key={word} aria-hidden="true" className="block whitespace-nowrap">
              {[...word].map((letter, index) => (
                <BreakawayLetter
                  key={`${row}-${index}`}
                  letter={letter}
                  index={index}
                  row={row}
                  progress={scrollYProgress}
                  loaded={loaded}
                />
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="font-mono text-[10px] md:text-xs text-muted-foreground mt-6 md:mt-8 tracking-wider"
          style={reducedMotion ? undefined : { opacity: captionOpacity }}
        >
          Computer Science undergraduate · Class of 2027
          <br />
          <span className="inline-block mt-3">Software engineering, security & systems — Hyderabad, India.</span>
        </motion.p>
      </div>

      <div
        className="absolute bottom-8 md:bottom-12 left-6 md:left-12 flex items-center gap-3 animate-hero-word opacity-0 z-10"
        style={{ animationDelay: "600ms" }}
      >
        <div className="w-px h-10 md:h-12 bg-primary/40" />
        <span className="font-mono text-[9px] md:text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
