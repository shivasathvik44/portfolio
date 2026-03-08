import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";

const projects = [
  { number: "01", title: "Visual System", category: "Web / Design", year: "2025", image: project01 },
  { number: "02", title: "Brand Identity", category: "Branding / Print", year: "2025", image: project02 },
  { number: "03", title: "Mobile Experience", category: "UI/UX / Dev", year: "2024", image: project03 },
];

/* Desktop card — hover-driven image scale */
const DesktopCard = ({ project }: { project: (typeof projects)[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor-view
      className="relative group cursor-pointer shrink-0 w-[45vw] h-[70vh] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-all duration-600" />
      <div className="absolute inset-0 flex flex-col justify-end p-12">
        <span className="font-mono text-[10px] text-primary/50 tracking-[0.2em] uppercase mb-2">
          {project.number} — {project.category}
        </span>
        <h3 className="font-heading text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-600">
          {project.title}
        </h3>
        <span className="font-mono text-[11px] text-muted-foreground mt-2">{project.year}</span>
      </div>
    </div>
  );
};

/* Mobile card — static image always visible */
const MobileCard = ({ project }: { project: (typeof projects)[0] }) => (
  <div className="relative overflow-hidden">
    <div className="aspect-[4/3] w-full overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/50" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <span className="font-mono text-[9px] text-primary/50 tracking-[0.2em] uppercase mb-1 block">
        {project.number} — {project.category}
      </span>
      <h3 className="font-heading text-2xl font-bold text-foreground">
        {project.title}
      </h3>
      <span className="font-mono text-[10px] text-muted-foreground mt-1 block">{project.year}</span>
    </div>
  </div>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  if (isMobile) {
    return (
      <section id="work" className="px-5 py-20">
        <span className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-10 block">
          [ 02 — Work ]
        </span>
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <MobileCard key={project.number} project={project} />
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
          className="flex gap-8 px-12 h-[calc(100vh-120px)] items-center"
          style={{ x }}
        >
          {projects.map((project) => (
            <DesktopCard key={project.number} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
