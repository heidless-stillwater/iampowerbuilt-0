
"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: Theme }> = ({ children, defaultTheme = 'dark' }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const applyTheme = useCallback((selectedTheme: Theme) => {
    localStorage.setItem('theme', selectedTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(selectedTheme);
    setThemeState(selectedTheme);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || defaultTheme;
    applyTheme(initialTheme);
  }, [defaultTheme, applyTheme]);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, applyTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    applyTheme(newTheme);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
