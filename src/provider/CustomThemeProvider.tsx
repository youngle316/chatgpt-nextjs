'use client';
import { ThemeProvider } from 'next-themes';

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}

export default CustomThemeProvider;
