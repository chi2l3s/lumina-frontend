"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastType {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toast: (toast: Omit<ToastType, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (newToast: Omit<ToastType, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const toastWithId = { ...newToast, id };
      setToasts((prev) => [...prev, toastWithId]);
      if (newToast.duration !== Number.POSITIVE_INFINITY) {
        setTimeout(() => dismiss(id), newToast.duration ?? 5000);
      }
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed top-6 left-0 right-0 z-[100] flex flex-col items-center gap-3 p-4 pointer-events-none">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <Toast key={t.id} {...t} onDismiss={() => dismiss(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

const variantConfig: Record<
  ToastVariant,
  { icon: React.ReactNode; iconColor: string; glassColor: string }
> = {
  default: {
    icon: null,
    iconColor: "",
    glassColor:
      "bg-white/80 dark:bg-black/80 border-white/20 dark:border-white/10",
  },
  success: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    iconColor: "text-green-500",
    glassColor:
      "bg-green-50/80 dark:bg-green-950/70 border-green-200/30 dark:border-green-800/40",
  },
  error: {
    icon: <AlertCircle className="w-5 h-5" />,
    iconColor: "text-red-500",
    glassColor:
      "bg-red-50/80 dark:bg-red-950/70 border-red-200/30 dark:border-red-800/40",
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    iconColor: "text-amber-500",
    glassColor:
      "bg-amber-50/80 dark:bg-amber-950/70 border-amber-200/30 dark:border-amber-800/40",
  },
  info: {
    icon: <Info className="w-5 h-5" />,
    iconColor: "text-blue-500",
    glassColor:
      "bg-blue-50/80 dark:bg-blue-950/70 border-blue-200/30 dark:border-blue-800/40",
  },
};

interface ToastProps extends ToastType {
  onDismiss: () => void;
}

function Toast({
  title,
  description,
  variant = "default",
  action,
  onDismiss,
  duration = 5000,
}: ToastProps) {
  const [phase, setPhase] = React.useState<
    "capsule" | "circle" | "expanding" | "full" | "dismissing"
  >("capsule");
  const [showContent, setShowContent] = React.useState(false);
  const cfg = variantConfig[variant];
  const ease = [0.34, 1.56, 0.64, 1] as const;

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase("circle"), 300);
    const t2 = setTimeout(() => setPhase("expanding"), 900);
    const t3 = setTimeout(() => setPhase("full"), 1500);
    const t4 = setTimeout(() => setShowContent(true), 2000);
    const t5 =
      duration !== Number.POSITIVE_INFINITY
        ? setTimeout(() => handleDismiss(), duration + 1000)
        : null;
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (t5) clearTimeout(t5);
    };
  }, [duration]);

  const handleDismiss = React.useCallback(() => {
    setShowContent(false);
    setPhase("dismissing");
  }, []);

  const dims = {
    capsule: { width: 120, height: 40, radius: 9999 },
    circle: { width: 48, height: 48, radius: 9999 },
    expanding: { width: 340, height: 80, radius: 24 },
    full: { width: 420, height: "auto", radius: 24 },
    dismissing: { width: 48, height: 48, radius: 9999 },
  } as const;

  return (
    <motion.div
      className={cn(
        "pointer-events-auto relative overflow-hidden border backdrop-blur-2xl backdrop-saturate-150 shadow-xl",
        cfg.glassColor
      )}
      initial={{
        y: -100,
        opacity: 0,
        width: dims.capsule.width,
        height: dims.capsule.height,
        borderRadius: dims.capsule.radius,
      }}
      animate={{
        y: phase === "capsule" ? 0 : 0,
        opacity: phase === "dismissing" ? 0 : 1,
        width: dims[phase].width,
        height: dims[phase].height,
        borderRadius: dims[phase].radius,
        scale: phase === "circle" ? 1.02 : 1,
      }}
      exit={{
        y: -40,
        opacity: 0,
        width: 48,
        height: 48,
        borderRadius: 9999,
        scale: 0.95,
      }}
      transition={{ duration: 0.7, ease }}
      style={{
        boxShadow:
          "0 20px 60px -15px rgba(0,0,0,0.25), 0 0 1px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <motion.div
        className="px-5 py-3 flex items-start gap-3 w-full max-w-[520px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0 }}
      >
        {cfg.icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: showContent ? 1 : 0,
              scale: showContent ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease }}
            className={cn("flex-shrink-0", cfg.iconColor)}
          >
            {cfg.icon}
          </motion.div>
        )}
        <div className="flex-1 min-w-0 text-foreground overflow-hidden">
          {title && (
            <div className="text-sm font-semibold leading-tight break-words mb-1">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm text-foreground/80 leading-snug break-words whitespace-pre-wrap">
              {description}
            </div>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 inline-flex items-center rounded-xl bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-foreground/20 active:scale-95"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 -mr-1 rounded-full p-1.5 text-foreground/60 transition-all hover:text-foreground hover:bg-foreground/10 active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}
