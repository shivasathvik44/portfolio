import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import TextScramble from "@/components/TextScramble";

const bioText =
  "I'm a student obsessed with building things on the web. I explore design, code, and everything in between.";

const stats = [
  { label: "Location", value: "Your City" },
  { label: "Status", value: "Open to work" },
  { label: "Focus", value: "Web & Design" },
];

const WordReveal = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className="font-mono text-sm md:text-base text-foreground leading-relaxed">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="px-6 md:px-12 lg:px-24 py-32" ref={sectionRef}>
      <span className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-16 block">
        <TextScramble text="[ 01 — Info ]" delay={200} duration={800} trigger={inView} />
      </span>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 items-start">
        <div className="relative select-none hidden md:block">
          <span className="font-heading text-[clamp(8rem,20vw,18rem)] font-extrabold leading-none text-foreground/[0.03] tracking-tighter">
            001
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <WordReveal text={bioText} />

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="font-mono text-[10px] text-primary/60 tracking-[0.2em] uppercase block mb-2">
                  {stat.label}
                </span>
                <span className="font-mono text-xs text-foreground">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
