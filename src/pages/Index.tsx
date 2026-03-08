import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <div className={`min-h-screen bg-background transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <FooterSection />
      </div>
    </>
  );
};

export default Index;
