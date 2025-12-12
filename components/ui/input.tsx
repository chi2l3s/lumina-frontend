"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  const toggleVisibility = React.useCallback(() => {
    setShowPassword((v) => !v);
  }, []);

  return (
    <div className="relative w-full">
      <input
        type={isPassword && showPassword ? "text" : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-11 w-full min-w-0 rounded-lg bg-muted px-4 pr-12 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />

      <AnimatePresence mode="wait">
        {isPassword && (
          <motion.button
            key="toggle"
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center p-1.5 rounded-full"
            initial={{ opacity: 0, scale: 0.6, y: -5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 220, damping: 20 },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 5,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255,255,255,0.15)",
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }}
            whileTap={{
              scale: 0.9,
              rotate: showPassword ? -10 : 10,
              boxShadow: "0 0 10px rgba(255,255,255,0.3)",
              transition: { type: "spring", stiffness: 600, damping: 15 },
            }}
          >
            <motion.div
              key={showPassword ? "visible" : "hidden"}
              initial={{
                rotate: showPassword ? -90 : 90,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                rotate: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }}
              exit={{
                rotate: showPassword ? 90 : -90,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.25 },
              }}
            >
              {showPassword ? (
                <motion.span
                  animate={{
                    scale: [1, 1.15, 1],
                    transition: {
                      duration: 0.6,
                      repeat: 0,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <EyeOff className="w-5 h-5 text-foreground/70" />
                </motion.span>
              ) : (
                <motion.span
                  animate={{
                    scale: [1, 1.15, 1],
                    transition: {
                      duration: 0.6,
                      repeat: 0,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Eye className="w-5 h-5 text-foreground/70" />
                </motion.span>
              )}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
