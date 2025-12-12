"use client";

import { useEffect, useState } from "react";
import { motion } from 'motion/react'
import { CheckCircle2 } from "lucide-react";

export function EmailConfirmationAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full py-10 bg-transparent">
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-green-400/30 blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 0.6, 0.3] }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
      />

      <motion.div
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        animate={{ scale: [0, 1.1, 1], rotate: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative"
      >
        <CheckCircle2 className="w-20 h-20 text-green-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)]" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 text-2xl font-semibold text-center text-foreground tracking-wide"
      >
        Почта подтверждена!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="mt-2 text-sm text-muted-foreground"
      >
        Добро пожаловать в Lumina
      </motion.p>
    </div>
  );
}
