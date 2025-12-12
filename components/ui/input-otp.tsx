"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-3 justify-center",
        "has-disabled:opacity-60",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex items-center justify-center h-12 w-12 rounded-2xl border text-lg font-medium",
        "transition-all duration-200 select-none",
        "bg-muted/50 dark:bg-muted/20 border-border/50 text-foreground shadow-sm",
        "data-[active=true]:border-primary data-[active=true]:bg-background data-[active=true]:shadow-md",
        "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {char ? (
        <span className="text-foreground">{char}</span>
      ) : (
        <span className="text-foreground/30">•</span>
      )}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="bg-foreground h-4 w-px" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="mx-2 flex items-center justify-center text-foreground/40"
      {...props}
    >
      <MinusIcon className="w-4 h-4" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
