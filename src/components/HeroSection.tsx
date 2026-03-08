import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import DotGrid from "@/components/DotGrid";

const words = ["STUDENT", "& MAKER"];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden relative">
      {/* Dot grid background */}
      <div className="absolute inset-0 z-0">
        <DotGrid />
      </div>

      <motion.div className="max-w-full relative z-10" style={{ y, opacity }}>
        <div className="-mx-1 md:-mx-6">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <h1
                className="font-heading text-[clamp(3rem,15vw,15rem)] md:text-[clamp(4rem,18vw,15rem)] font-extrabold leading-[0.85] tracking-tighter text-foreground animate-hero-word opacity-0"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <TextScramble
                  text={word}
                  delay={300 + i * 200}
                  duration={1000}
                  trigger={loaded}
                />
              </h1>
            </div>
          ))}
        </div>

        <p
          className="font-mono text-[10px] md:text-xs text-muted-foreground mt-6 md:mt-8 tracking-wider animate-hero-word opacity-0"
          style={{ animationDelay: "400ms" }}
        >
          — based somewhere, building things.
        </p>
      </motion.div>

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
