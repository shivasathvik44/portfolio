import { useState, useEffect } from "react";

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const links = [
    { num: "01", label: "Info", href: "#about" },
    { num: "02", label: "Work", href: "#work" },
    { num: "03", label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-md">
      <span className="font-mono text-[11px] text-foreground tracking-[0.35em] uppercase">
        Your Name
      </span>

      <div className="flex items-center gap-8 md:gap-10">
        {links.map((link) => (
          <a
            key={link.num}
            href={link.href}
            className="hidden md:flex items-center gap-2 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase"
          >
            <span className="text-primary/50">{link.num}</span>
            <span>{link.label}</span>
          </a>
        ))}

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-foreground tabular-nums">{formattedTime}</span>
          <span className="font-mono text-[10px] text-muted-foreground">{formattedDate}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
