import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";

const projects = [
  { number: "01", title: "Visual System", category: "Web / Design", year: "2025", image: project01 },
  { number: "02", title: "Brand Identity", category: "Branding / Print", year: "2025", image: project02 },
  { number: "03", title: "Mobile Experience", category: "UI/UX / Dev", year: "2024", image: project03 },
];

/* Desktop card — hover-driven image scale */
const DesktopCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      data-cursor-view
      className="relative group cursor-pointer shrink-0 w-[45vw] h-[70vh] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
          <TextScramble text={`${project.number} — ${project.category}`} delay={300 + index * 150} duration={700} trigger={inView} />
        </span>
        <h3 className="font-heading text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-600">
          <TextScramble text={project.title} delay={450 + index * 150} duration={800} trigger={inView} />
        </h3>
        <span className="font-mono text-[11px] text-muted-foreground mt-2">
          <TextScramble text={project.year} delay={600 + index * 150} duration={500} trigger={inView} />
        </span>
      </div>
    </motion.div>
  );
};

/* Mobile card — static image always visible */
const MobileCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
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
          <TextScramble text={`${project.number} — ${project.category}`} delay={200 + index * 150} duration={700} trigger={inView} />
        </span>
        <h3 className="font-heading text-2xl font-bold text-foreground">
          <TextScramble text={project.title} delay={350 + index * 150} duration={800} trigger={inView} />
        </h3>
        <span className="font-mono text-[10px] text-muted-foreground mt-1 block">
          <TextScramble text={project.year} delay={500 + index * 150} duration={500} trigger={inView} />
        </span>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const labelInView = useInView(labelRef, { once: true, margin: "-80px" });

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
        <motion.span
          ref={labelRef}
          className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-10 block"
          initial={{ opacity: 0, y: 20 }}
          animate={labelInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <TextScramble text="[ 02 — Work ]" delay={200} duration={800} trigger={labelInView} />
        </motion.span>
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <MobileCard key={project.number} project={project} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={sectionRef} className="relative" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex items-start pt-24 px-12 mb-8">
          <motion.span
            ref={labelRef}
            className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={labelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextScramble text="[ 02 — Work ]" delay={200} duration={800} trigger={labelInView} />
          </motion.span>
        </div>
        <motion.div
          className="flex gap-8 px-12 h-[calc(100vh-120px)] items-center"
          style={{ x }}
        >
          {projects.map((project, i) => (
            <DesktopCard key={project.number} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
