const FooterSection = () => {
  return (
    <footer id="contact" className="px-6 md:px-12 lg:px-24 py-32 border-t border-border">
      <div className="max-w-5xl">
        <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">Get in Touch</span>
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-4 mb-12 leading-tight">
          Let's work<br />together
        </h2>
        <a
          href="mailto:hello@example.com"
          className="font-mono text-sm text-foreground border-b border-primary pb-1 hover:text-primary transition-colors duration-300"
        >
          hello@example.com
        </a>
      </div>

      <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
          © 2025 — All rights reserved
        </span>
        <div className="flex gap-6">
          {["GitHub", "LinkedIn", "Twitter"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
