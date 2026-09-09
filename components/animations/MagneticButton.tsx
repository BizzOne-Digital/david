"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const buttonClassName =
  "relative inline-flex items-center justify-center rounded-lg bg-brand-orange px-6 py-3 font-medium text-white transition-colors hover:bg-brand-orange-hover";

export function MagneticButton({
  children,
  className,
  strength = 0.25,
  href,
  type = "button",
  onClick,
  disabled,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    setPosition({ x, y });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const motionProps = {
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    animate: reducedMotion ? undefined : { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
    className: cn(buttonClassName, "max-w-full", className),
  };

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Link href={href} className="inline-flex w-full items-center justify-center sm:w-auto">
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...motionProps} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </motion.button>
  );
}
