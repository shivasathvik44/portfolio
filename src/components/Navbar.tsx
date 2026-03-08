const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-difference">
      <span className="font-mono text-sm text-foreground tracking-widest uppercase">Portfolio</span>
      <div className="flex gap-8">
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
