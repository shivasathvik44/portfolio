import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import profilePhoto from "@/assets/profile-photo.png";

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
      {/* Two-column grid with vertical divider */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1px_2fr] gap-0 items-center">
        {/* Left column — 60% */}
        <div className="flex flex-col justify-center order-2 md:order-1 md:pr-12 lg:pr-16">
          <span className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-8 block">
            <TextScramble text="[ 01 — Info ]" delay={200} duration={800} trigger={inView} />
          </span>

          <WordReveal text={bioText} />

          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
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

        {/* Vertical amber divider — hidden on mobile */}
        <div className="hidden md:block w-px self-stretch bg-primary/30" />

        {/* Right column — 40% */}
        <div className="flex flex-col items-center justify-center order-1 md:order-3 md:pl-12 lg:pl-16 mb-10 md:mb-0">
          <motion.div
            className="relative group"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Amber glow bloom */}
            <div
              className="absolute inset-0 -inset-x-16 -inset-y-8 rounded-full opacity-30 blur-[80px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.5), transparent 70%)",
              }}
            />

            <img
              src={profilePhoto}
              alt="Profile photo"
              className="relative z-10 h-[380px] md:h-[480px] w-auto object-cover object-top
                filter blur-[5px] grayscale-[20%]
                group-hover:blur-0 group-hover:grayscale-0
                transition-all duration-1000 ease-out"
            />
          </motion.div>

          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] mt-4 animate-pulse">
            [ HOVER ]
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
