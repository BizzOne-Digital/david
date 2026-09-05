"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "words" | "chars";
}

export function TextReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const units = splitBy === "words" ? text.split(" ") : text.split("");

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("overflow-hidden", className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex flex-wrap">
        {units.map((unit, index) => (
          <motion.span
            key={`${unit}-${index}`}
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {unit}
            {splitBy === "words" && index < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
