"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GradientOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "violet" | "cyan" | "mixed";
}

const sizes = {
  sm: "h-48 w-48",
  md: "h-72 w-72",
  lg: "h-96 w-96",
};

const colors = {
  blue: "from-electric/50 to-royal/10",
  violet: "from-violet/50 to-magenta/10",
  cyan: "from-cyan/50 to-electric/10",
  mixed: "from-electric/35 via-royal/25 via-violet/20 to-magenta/15",
};

export function GradientOrb({
  className,
  size = "md",
  color = "mixed",
}: GradientOrbProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      animate={
        reducedMotion
          ? undefined
          : {
              scale: [1, 1.08, 1],
              rotate: [0, 8, 0],
            }
      }
      transition={
        reducedMotion
          ? undefined
          : { duration: 8, repeat: Infinity, ease: "easeInOut" }
      }
      className={cn(
        "pointer-events-none rounded-full blur-3xl",
        "bg-gradient-to-br",
        sizes[size],
        colors[color],
        className
      )}
    />
  );
}
