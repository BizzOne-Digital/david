"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isTouchDevice } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setEnabled(!isTouchDevice() && !reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      animate={{ x: position.x - 150, y: position.y - 150 }}
      transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
    >
      <div className="h-[300px] w-[300px] rounded-full bg-gradient-to-r from-electric/25 via-violet/20 to-magenta/15 blur-3xl" />
    </motion.div>
  );
}
