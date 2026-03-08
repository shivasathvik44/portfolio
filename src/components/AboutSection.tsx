import { useRef } from "react";
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
      <motion.span
        className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-16 block"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <TextScramble text="[ 01 — Info ]" delay={200} duration={800} trigger={inView} />
      </motion.span>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 items-start">
        <motion.div
          className="relative select-none hidden md:block"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-heading text-[clamp(8rem,20vw,18rem)] font-extrabold leading-none text-foreground/[0.03] tracking-tighter">
            001
          </span>
        </motion.div>

        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <WordReveal text={bioText} />
          </motion.div>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-[10px] text-primary/60 tracking-[0.2em] uppercase block mb-2">
                  <TextScramble text={stat.label} delay={600 + i * 150} duration={600} trigger={inView} />
                </span>
                <span className="font-mono text-xs text-foreground">
                  <TextScramble text={stat.value} delay={750 + i * 150} duration={600} trigger={inView} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
