"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState, useRef, useMemo } from "react";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  );
}
