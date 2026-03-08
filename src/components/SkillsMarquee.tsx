import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  "HTML", "CSS", "JavaScript", "React", "Figma", "Python", "Git", "Node.js", "UI Design",
];

const MarqueeContent = () => (
  <>
    {skills.map((skill, i) => (
      <span key={i} className="flex items-center gap-6 shrink-0">
        <span className="font-heading text-lg md:text-2xl font-semibold text-foreground/80 uppercase tracking-wide whitespace-nowrap">
          {skill}
        </span>
        <span className="text-primary/40 text-xs">◆</span>
      </span>
    ))}
  </>
);

const SkillsMarquee = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      className="py-12 border-t border-b border-border overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </motion.section>
  );
};

export default SkillsMarquee;
