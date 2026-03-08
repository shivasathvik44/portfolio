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
      <span className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-16 block">
        <TextScramble text="[ 01 — Info ]" delay={200} duration={800} trigger={inView} />
      </span>

      <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-start">
        {/* Bio text - left side */}
        <div className="flex flex-col justify-center order-2 md:order-1">
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

        {/* Profile photo - right side */}
        <div className="flex flex-col items-center order-1 md:order-2">
          <motion.div
            className="relative group"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Amber glow bloom behind figure */}
            <div
              className="absolute inset-0 -inset-x-16 -inset-y-8 rounded-full opacity-30 blur-[80px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.5), transparent 70%)",
              }}
            />

            <img
              src={profilePhoto}
              alt="Profile photo"
              className="relative z-10 h-[320px] md:h-[420px] w-auto object-cover object-top
                filter blur-[5px] grayscale-[20%]
                group-hover:blur-0 group-hover:grayscale-0
                transition-all duration-1000 ease-out"
            />
          </motion.div>

          {/* Hover label */}
          <span className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] mt-4 animate-pulse">
            [ HOVER ]
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
