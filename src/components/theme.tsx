import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false)


  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      type="button"
      className="relative rounded-full p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer transition"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? (
        <MoonIcon className="w-6 h-6" aria-hidden="true" />
      ) : (
        <SunIcon className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
}
