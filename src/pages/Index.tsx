import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <CustomCursor />
      <div className="noise-overlay" />
      <div
        id="main-content"
        className={`min-h-screen bg-background transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} cursor-none md:cursor-none`}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsMarquee />
        <ProjectsSection />
        <ContactSection />
        <FooterSection />
      </div>
    </>
  );
};

export default Index;
