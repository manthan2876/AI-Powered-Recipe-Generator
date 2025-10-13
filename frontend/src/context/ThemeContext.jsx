import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch { return 'dark'; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg', '#0b0b0b');
      root.style.setProperty('--card', '#111111');
      root.style.setProperty('--text', 'rgba(255,255,255,0.92)');
      root.style.setProperty('--muted', 'rgba(255,255,255,0.7)');
      root.style.setProperty('--accent', '#FF3B30');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg', '#ffffff');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--text', '#1f2937');
      root.style.setProperty('--muted', '#4b5563');
      root.style.setProperty('--accent', '#FF3B30');
    }
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
