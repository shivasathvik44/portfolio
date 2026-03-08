const AboutSection = () => {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-24 py-32">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">About</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4 leading-tight">
            Design meets<br />engineering
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
            I'm a student developer and designer exploring the boundaries of creative technology. 
            My work spans branding, web development, and interactive experiences.
          </p>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-10">
            I believe in thoughtful design — where every detail serves a purpose and every interaction tells a story.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {["React", "TypeScript", "Figma", "Three.js"].map((skill) => (
              <div key={skill} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-foreground">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
