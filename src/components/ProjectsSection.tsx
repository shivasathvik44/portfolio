import SectionNumber from "@/components/SectionNumber";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import TextScramble from "@/components/TextScramble";
import project01 from "@/assets/project-01.jpg";
import project02 from "@/assets/project-02.jpg";
import project03 from "@/assets/project-03.jpg";

const projects = [
  {
    number: "01",
    title: "SentinelForge",
    category: "Security / Systems",
    description: "A Linux-native security operations platform connecting host telemetry, threat detection, and incident investigation.",
    stack: "Python · Linux · eBPF · SQLite",
    href: "https://github.com/shivasathvik44/SOC-PROJECT",
    image: project01,
  },
  {
    number: "02",
    title: "CyberShield",
    category: "Security / Full Stack",
    description: "A security toolkit for exploring CVE vulnerabilities, checking IP reputation, and investigating threat intelligence.",
    stack: "React · TypeScript · Node.js · PostgreSQL",
    href: "https://github.com/shivasathvik44/cybershield44",
    demo: "https://cybershield44.lovable.app/",
    image: project02,
  },
  {
    number: "03",
    title: "VaultSync",
    category: "Security / Cross Platform",
    description: "A personal password manager for Android and Linux, built around client-side encryption, offline access, and vault synchronization.",
    stack: "Python · FastAPI · PySide6 · Kotlin",
    status: "In development",
    href: "https://github.com/shivasathvik44/pswdMngr",
    image: project03,
  },
];

type Project = (typeof projects)[number];

const ProjectDetails = ({ project }: { project: Project }) => (
  <>
    {project.status && (
      <span className="mt-3 w-fit border border-primary/30 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-primary">
        {project.status}
      </span>
    )}
    <p className="mt-4 max-w-md font-mono text-xs leading-relaxed text-foreground/80">
      {project.description}
    </p>
    <p className="mt-3 font-mono text-[10px] leading-relaxed text-primary/80">
      {project.stack}
    </p>
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
        data-cursor-label="Code"
        className="font-mono text-[11px] uppercase tracking-wider text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        View GitHub ↗
      </a>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live demo (opens in a new tab)`}
          data-cursor-label="Visit"
          className="font-mono text-[11px] uppercase tracking-wider text-foreground underline underline-offset-4 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Live demo ↗
        </a>
      )}
    </div>
  </>
);

/* Desktop card — hover-driven image scale */
const DesktopCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative group shrink-0 w-[45vw] h-[70vh] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={project.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/20 transition-all duration-600" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-10">
        <span className="font-mono text-[10px] text-primary/50 tracking-[0.2em] uppercase mb-2">
          <TextScramble text={`${project.number} — ${project.category}`} delay={300 + index * 150} duration={700} trigger={inView} />
        </span>
        <h3 className="font-heading text-3xl xl:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-600">
          <TextScramble text={project.title} delay={450 + index * 150} duration={800} trigger={inView} />
        </h3>
        <ProjectDetails project={project} />
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
      className="relative overflow-hidden border border-border bg-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={project.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col p-5">
        <span className="font-mono text-[9px] text-primary/50 tracking-[0.2em] uppercase mb-1 block">
          <TextScramble text={`${project.number} — ${project.category}`} delay={200 + index * 150} duration={700} trigger={inView} />
        </span>
        <h3 className="font-heading text-2xl font-bold text-foreground">
          <TextScramble text={project.title} delay={350 + index * 150} duration={800} trigger={inView} />
        </h3>
        <ProjectDetails project={project} />
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
          <TextScramble text="[ 03 — Work ]" delay={200} duration={800} trigger={labelInView} />
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
      <div className="sticky isolate top-0 h-screen overflow-hidden">
        <SectionNumber number="003" className="absolute -z-10 top-0 right-12" />
        <div className="flex items-start pt-24 px-12 mb-8">
          <motion.span
            ref={labelRef}
            className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={labelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextScramble text="[ 03 — Work ]" delay={200} duration={800} trigger={labelInView} />
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
