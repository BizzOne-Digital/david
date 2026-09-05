"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProcessStep {
  title: string;
  description: string;
}

interface HorizontalScrollProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HorizontalScroll({
  steps,
  title = "Our Process",
  subtitle = "Scroll to explore each phase of our engagement model.",
  className,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(steps.length - 1) * 85}%`]);

  if (reducedMotion) {
    return (
      <section className={cn("py-16", className)}>
        <div className="container mx-auto px-4">
          <h2 className="mb-2 font-heading text-3xl font-bold">{title}</h2>
          <p className="mb-8 text-silver">{subtitle}</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="glass rounded-2xl p-6">
                <span className="text-sm text-cyan">Step {index + 1}</span>
                <h3 className="mt-2 font-heading text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-silver">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container mx-auto mb-8 px-4">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-2 max-w-xl text-silver">{subtitle}</p>
        </div>
        <motion.div style={{ x }} className="flex gap-6 px-4 md:px-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="glass w-[min(85vw,420px)] shrink-0 rounded-2xl p-8"
            >
              <span className="font-mono text-sm text-cyan">0{index + 1}</span>
              <h3 className="mt-4 font-heading text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-silver">{step.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
