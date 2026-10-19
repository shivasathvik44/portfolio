import AsciiMonogram from "@/components/AsciiMonogram";
import SectionNumber from "@/components/SectionNumber";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextScramble from "@/components/TextScramble";

const bioText =
  "I'm Shiva Sathvik, a Computer Science undergraduate based in Hyderabad, India, graduating in 2027. I build software with Python and TypeScript, with a focus on security tools and the systems underneath. I'm exploring Linux internals, networking, and eBPF to understand how systems work, where they fail, and how to make them safer and simpler.";

const stats = [
  { label: "Location", value: "Hyderabad, India" },
  { label: "Education", value: "CS · Class of 2027" },
  { label: "Focus", value: "Security & Systems" },
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
        <div className="relative isolate select-none min-w-0">
          <SectionNumber number="001" className="absolute -z-10 top-0 left-0" />
          <AsciiMonogram />
        </div>

        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <WordReveal text={bioText} />
            <div className="mt-6 flex flex-wrap gap-6 font-mono text-xs">
              <a
                href="https://github.com/shivasathvik44"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shiva Sathvik on GitHub (opens in a new tab)"
                className="text-primary underline underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                GitHub ↗
              </a>
              <a
                href="mailto:posanishiva6@gmail.com"
                className="text-primary underline underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Email me ↗
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
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
