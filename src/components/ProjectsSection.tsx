import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";

const projects = [
  { number: "01", title: "Visual System", category: "Web / Design", year: "2025", image: project01 },
  { number: "02", title: "Brand Identity", category: "Branding / Print", year: "2025", image: project02 },
  { number: "03", title: "Mobile Experience", category: "UI/UX / Dev", year: "2024", image: project03 },
];

const ProjectCard = ({
  project,
}: {
  project: (typeof projects)[0];
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor-view
      className="relative group cursor-pointer shrink-0 w-[85vw] md:w-[45vw] h-[70vh] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-all duration-600" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        <span className="font-mono text-[10px] text-primary/50 tracking-[0.2em] uppercase mb-2">
          {project.number} — {project.category}
        </span>
        <h3 className="font-heading text-3xl md:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-600">
          {project.title}
        </h3>
        <span className="font-mono text-[11px] text-muted-foreground mt-2">{project.year}</span>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Horizontal scroll: translate vertical scroll into horizontal movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  if (isMobile) {
    return (
      <section id="work" className="px-6 py-32">
        <span className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-16 block">
          [ 02 — Work ]
        </span>
        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={sectionRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex items-start pt-24 px-12 mb-8">
          <span className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase">
            [ 02 — Work ]
          </span>
        </div>
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-8 px-12 h-[calc(100vh-120px)] items-center"
          style={{ x }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
