
import { NavigationBar } from "@/components/layout/NavigationBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { AIFitnessAssistant } from "@/components/features/AIFitnessAssistant";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-20"> {/* Offset for fixed navbar */}
        <HeroSection />
        <AboutMeSection />
        <AIFitnessAssistant />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
