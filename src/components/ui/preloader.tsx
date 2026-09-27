"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { theme, systemTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show preloader on the homepage for maximum cinematic effect
    if (pathname !== "/") {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[100] flex items-center justify-center ${
            isDark ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-sm sm:text-ui tracking-widest opacity-80"
            >
              WAKING UP CLAUDE
            </motion.p>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="ml-1 font-mono text-sm sm:text-ui font-bold"
            >
              _
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
