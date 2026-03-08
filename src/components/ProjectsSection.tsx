const projects = [
  {
    number: "01",
    title: "Brand Identity System",
    category: "Design / Branding",
    year: "2025",
  },
  {
    number: "02",
    title: "Interactive Web Experience",
    category: "Development / WebGL",
    year: "2025",
  },
  {
    number: "03",
    title: "Mobile App Concept",
    category: "UI/UX / Prototype",
    year: "2024",
  },
  {
    number: "04",
    title: "Editorial Photography",
    category: "Photography / Art Direction",
    year: "2024",
  },
];

const ProjectsSection = () => {
  return (
    <section id="work" className="px-6 md:px-12 lg:px-24 py-32">
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Selected Work</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="space-y-0">
        {projects.map((project) => (
          <div
            key={project.number}
            className="group border-t border-border py-8 md:py-10 flex items-center justify-between cursor-pointer hover:pl-4 transition-all duration-500"
          >
            <div className="flex items-center gap-6 md:gap-12">
              <span className="font-mono text-xs text-muted-foreground">{project.number}</span>
              <h3 className="font-heading text-xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <span className="font-mono text-xs text-muted-foreground">{project.category}</span>
              <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ProjectsSection;
