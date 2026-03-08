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
  return (
    <section className="py-12 border-t border-b border-border overflow-hidden group">
      <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
};

export default SkillsMarquee;
