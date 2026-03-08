import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["STUDENT", "& MAKER"];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax — heading moves at 0.4x scroll speed
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden relative">
      <motion.div className="max-w-full" style={{ y, opacity }}>
        <div className="-mx-1 md:-mx-6">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <h1
                className="font-heading text-[clamp(3rem,15vw,15rem)] md:text-[clamp(4rem,18vw,15rem)] font-extrabold leading-[0.85] tracking-tighter text-foreground animate-hero-word opacity-0"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {word}
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
        className="absolute bottom-8 md:bottom-12 left-6 md:left-12 flex items-center gap-3 animate-hero-word opacity-0"
        style={{ animationDelay: "600ms" }}
      >
        <div className="w-px h-10 md:h-12 bg-primary/40" />
        <span className="font-mono text-[9px] md:text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
