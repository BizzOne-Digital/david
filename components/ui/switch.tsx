"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked = false, onCheckedChange, disabled, id, className }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = checked ?? internalChecked;

    return (
    <button
      ref={ref}
      id={id}
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={() => {
        const next = !isChecked;
        if (checked === undefined) setInternalChecked(next);
        onCheckedChange?.(next);
      }}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan disabled:cursor-not-allowed disabled:opacity-50",
        isChecked ? "bg-electric" : "bg-charcoal",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          isChecked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
