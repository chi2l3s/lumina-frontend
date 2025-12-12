"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > {
  value?: number | null;
  onChange?: (value: number | null) => void;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [inner, setInner] = React.useState(
      value !== null && value !== undefined ? String(value) : ""
    );

    React.useEffect(() => {
      setInner(value !== null && value !== undefined ? String(value) : "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^\d]/g, "");
      setInner(raw);
      if (onChange) {
        onChange(raw === "" ? null : Number(raw));
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        value={inner}
        onChange={handleChange}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
