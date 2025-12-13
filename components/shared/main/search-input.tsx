"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { GlassButton } from "../auth/glass-button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

export const SearchInput = () => {
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useClickAway(containerRef, () => {
    setFocused(false);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted &&
        focused &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-[100]" />,
          document.body
        )}

      <div ref={containerRef} className="relative z-[110] flex items-center">
        <AnimatePresence>
          {focused && (
            <motion.div
              key="search-input"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 500, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 overflow-hidden"
            >
              <div className="relative w-full">
                <Input
                  autoFocus
                  type="text"
                  placeholder="Поиск контента"
                  className="w-full pl-9 bg-white text-black dark:bg-white font-semibold text-xl dark:text-black h-11 shadow-lg"
                />
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black z-10" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <GlassButton
          size="icon"
          className="h-10 w-10 p-0"
          onClick={() => setFocused((prev) => !prev)}
        >
          {focused ? <X /> : <Search />}
        </GlassButton>
      </div>
    </>
  );
};
