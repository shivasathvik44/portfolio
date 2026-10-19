import SectionNumber from "@/components/SectionNumber";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextScramble from "@/components/TextScramble";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative isolate px-6 md:px-12 lg:px-24 py-32" ref={ref}>
      <SectionNumber number="004" className="absolute -z-10 bottom-20 left-12 lg:left-24" />
      <motion.span
        className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-16 block"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <TextScramble text="[ 04 — Contact ]" delay={200} duration={800} trigger={inView} />
      </motion.span>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-[0.9]">
            <TextScramble text="LET'S" delay={400} duration={900} trigger={inView} />
            <br />
            <TextScramble text="TALK." delay={550} duration={900} trigger={inView} />
          </h2>
          <motion.p
            className="font-mono text-xs text-muted-foreground mt-6 leading-relaxed max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <TextScramble text="Have an idea, a project, or just want to say hi? Drop me a line." delay={700} duration={800} trigger={inView} />
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-10"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { name: "name", placeholder: "Your name", type: "text" },
            { name: "email", placeholder: "Your email", type: "email" },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.48 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full bg-transparent border-0 border-b border-border pb-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-600"
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <textarea
              placeholder="Your message"
              rows={3}
              className="w-full bg-transparent border-0 border-b border-border pb-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-600 resize-none"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.84, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="submit"
              data-cursor-label="Send"
              className="font-mono text-xs text-foreground tracking-[0.2em] uppercase relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-bottom-left hover:text-primary transition-colors duration-600"
            >
              <TextScramble text="Send Message →" delay={1000} duration={700} trigger={inView} />
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
