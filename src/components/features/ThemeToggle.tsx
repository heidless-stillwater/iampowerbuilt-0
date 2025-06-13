
"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomTheme } from "@/lib/theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9" disabled><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>; 
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="transition-all duration-300 ease-in-out transform hover:scale-110">
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-accent transition-colors duration-300" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-primary transition-colors duration-300" />
      )}
    </Button>
  );
}
