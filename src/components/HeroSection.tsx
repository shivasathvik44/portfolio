const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl">
        <p className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          Creative Developer
        </p>
        <h1 className="font-heading text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight text-foreground animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
          Building<br />
          digital<br />
          <span className="text-primary">experiences</span>
        </h1>
        <p className="font-mono text-sm text-muted-foreground mt-8 max-w-md leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: "0.7s" }}>
          A student passionate about design, code, and the space where they meet. Currently exploring creative development and visual storytelling.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
        <div className="w-px h-12 bg-primary/40" />
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
