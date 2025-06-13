
"use client";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/features/ThemeToggle";
import { Button } from "@/components/ui/button";

export function NavigationBar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex items-center justify-between h-20 w-[95%] px-4">
        <Link href="/" passHref className="flex items-center gap-3">
          <Image
            src="https://placehold.co/120x40.png" 
            alt="Logo"
            width={120}
            height={40}
            className="rounded"
            data-ai-hint="logo brand"
          />
          <span className="text-xl font-bold text-primary font-headline">
            @iampowerbuilt
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Button
            variant="link"
            onClick={() => scrollToSection("about-me")}
            className="text-foreground hover:text-primary transition-colors duration-300"
            style={{ fontSize: '20px' }} 
          >
            About Me
          </Button>
          <Button
            variant="link"
            onClick={() => scrollToSection("ai-assistant")}
            className="text-foreground hover:text-primary transition-colors duration-300"
            style={{ fontSize: '20px' }}
          >
            AI Fitness Assistant
          </Button>
          <Button
            variant="link"
            onClick={() => scrollToSection("contact")}
            className="text-foreground hover:text-primary transition-colors duration-300"
            style={{ fontSize: '20px' }}
          >
            Contact
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
