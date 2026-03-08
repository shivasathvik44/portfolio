import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticWrap from "@/components/MagneticWrap";

const links = [
  { num: "01", label: "Info", href: "#about" },
  { num: "02", label: "Work", href: "#work" },
  { num: "03", label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);

    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    mainContent.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    mainContent.style.opacity = "0";
    mainContent.style.transform = "translateY(10px)";

    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        mainContent.style.opacity = "1";
        mainContent.style.transform = "translateY(0)";
      }, 100);
    }, 400);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const formattedDate = time.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-md">
        <span className="font-mono text-[11px] text-foreground tracking-[0.35em] uppercase">
          Your Name
        </span>

        <div className="flex items-center gap-6 md:gap-10">
          {links.map((link) => (
            <MagneticWrap key={link.num} className="hidden md:block" strength={0.35}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase"
              >
                <span className="text-primary/50">{link.num}</span>
                <span>{link.label}</span>
              </a>
            </MagneticWrap>
          ))}

          <div className="hidden sm:flex items-center gap-3">
            <span className="font-mono text-[11px] text-foreground tabular-nums">{formattedTime}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{formattedDate}</span>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] w-6 h-5 justify-center items-center relative z-50"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-full h-px bg-foreground origin-center"
              animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-full h-px bg-foreground origin-center"
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-background flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.num}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center gap-4 font-heading text-3xl font-bold text-foreground hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className="font-mono text-xs text-primary/50">{link.num}</span>
                <span>{link.label}</span>
              </motion.a>
            ))}

            <motion.div
              className="flex items-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-mono text-[11px] text-foreground tabular-nums">{formattedTime}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{formattedDate}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
