"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ComponentProps<typeof Button> {
  translucent?: boolean;
}

export function GlassButton({
  className,
  translucent = true,
  children,
  ...props
}: GlassButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "relative overflow-hidden text-white rounded-full text-sm font-medium transition-none", // без hover-анимаций
        "border border-white/15 shadow-sm",
        "text-foreground",
        translucent &&
          "backdrop-blur-xl backdrop-saturate-150 bg-white/10 dark:bg-white/5",
        "dark:border-white/10",
        className
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
        WebkitBackdropFilter: "blur(16px) saturate(150%)",
        backdropFilter: "blur(16px) saturate(150%)",
      }}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
