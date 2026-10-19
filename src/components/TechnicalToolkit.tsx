import SectionNumber from "@/components/SectionNumber";
import { motion, useReducedMotion } from "framer-motion";

const groups = [
  {
    title: "Languages",
    description: "The languages I use to build applications and explore systems.",
    tools: ["Python", "TypeScript", "JavaScript", "C", "C++", "Bash"],
  },
  {
    title: "Web & Backend",
    description: "Interfaces, APIs, and data for full-stack projects.",
    tools: ["React", "Node.js", "Express", "Flask", "REST APIs", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "Security",
    description: "Security concepts I put into practice through my projects.",
    tools: ["Threat intelligence", "Vulnerability analysis", "Authentication", "Access control", "Network security"],
  },
  {
    title: "Systems & Workflow",
    description: "Tools for developing, testing, and understanding software.",
    tools: ["Linux", "Docker", "Git", "GitHub", "Pytest"],
  },
];

const TechnicalToolkit = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="relative isolate scroll-mt-24 px-6 md:px-12 lg:px-24 py-24 md:py-32">
      <SectionNumber number="002" className="absolute -z-10 top-24 right-12 lg:right-24" />
      <span className="block mb-6 font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase">
        [ 02 — Toolkit ]
      </span>
      <h2 id="toolkit-title" className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
        Technical toolkit.
      </h2>
      <p className="mt-5 max-w-xl font-mono text-xs md:text-sm leading-relaxed text-muted-foreground">
        The languages, tools, and concepts behind my work — from web applications to security and systems.
      </p>
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {groups.map((group, index) => (
          <motion.article
            key={group.title}
            className="border border-border bg-card/50 p-6 md:p-8"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            <span aria-hidden="true" className="font-mono text-[10px] text-primary/60">
              0{index + 1}
            </span>
            <h3 className="mt-3 font-heading text-2xl font-semibold">{group.title}</h3>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">{group.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <li key={tool} className="border border-border px-3 py-2 font-mono text-[11px] text-foreground/90 transition-colors duration-300 hover:text-primary hover:border-primary/50">
                  {tool}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
      <p className="mt-8 font-mono text-xs leading-relaxed text-muted-foreground">
        <span className="text-primary">Currently learning & building</span> — Developing VaultSync, preparing for the CC – Certified in Cybersecurity exam, and practicing hands-on security labs on Hack The Box and TryHackMe.
      </p>
    </section>
  );
};

export default TechnicalToolkit;
