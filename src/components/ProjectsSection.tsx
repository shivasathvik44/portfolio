import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";

const projects = [
  { number: "01", title: "Visual System", category: "Web / Design", year: "2025", image: project01 },
  { number: "02", title: "Brand Identity", category: "Branding / Print", year: "2025", image: project02 },
  { number: "03", title: "Mobile Experience", category: "UI/UX / Dev", year: "2024", image: project03 },
];

const ProjectRow = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-t border-border group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Hover background */}
      <div
        className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      {/* Floating image */}
      {hovered && (
        <div
          className="fixed z-50 pointer-events-none w-[280px] h-[350px] overflow-hidden rounded-sm"
          style={{
            left: mouse.x + (rowRef.current?.getBoundingClientRect().left ?? 0) + 20,
            top: mouse.y + (rowRef.current?.getBoundingClientRect().top ?? 0) - 175,
          }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <div className="relative flex items-center justify-between py-8 md:py-12 px-2">
        {/* Number */}
        <span className="font-heading text-4xl md:text-6xl font-extrabold text-foreground/[0.06] group-hover:text-primary/10 transition-colors duration-300 w-20 md:w-28 shrink-0">
          {project.number}
        </span>

        {/* Title */}
        <h3 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 flex-1 ml-4 md:ml-8">
          {project.title}
        </h3>

        {/* Meta */}
        <div className="hidden md:flex items-center gap-8 shrink-0">
          <span className="font-mono text-[11px] text-muted-foreground tracking-wider uppercase">
            {project.category}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {project.year}
          </span>
          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">
            →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="work" className="px-6 md:px-12 lg:px-24 py-32">
      <span className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-16 block">
        [ 02 — Work ]
      </span>

      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.number} project={project} index={i} />
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ProjectsSection;
