import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TextScramble from "@/components/TextScramble";

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.footer
      ref={ref}
      className="py-10 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase text-center">
        <TextScramble text={`© ${new Date().getFullYear()} Shiva Sathvik — All Rights Reserved`} delay={200} duration={800} trigger={inView} />
      </p>
    </motion.footer>
  );
};

export default FooterSection;
