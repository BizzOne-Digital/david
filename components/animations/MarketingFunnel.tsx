"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const funnelStages = [
  {
    id: "awareness",
    label: "Awareness",
    width: "100%",
    description: "Brand visibility across search, social, and email touchpoints.",
  },
  {
    id: "interest",
    label: "Interest",
    width: "82%",
    description: "Content and campaigns that educate and nurture prospects.",
  },
  {
    id: "consideration",
    label: "Consideration",
    width: "64%",
    description: "Targeted offers and AI-assisted follow-up sequences.",
  },
  {
    id: "conversion",
    label: "Conversion",
    width: "46%",
    description: "Appointment booking and sales-ready handoffs.",
  },
];

export function MarketingFunnel({ className }: { className?: string }) {
  const [active, setActive] = useState(funnelStages[0].id);
  const reducedMotion = useReducedMotion();
  const activeStage = funnelStages.find((s) => s.id === active) ?? funnelStages[0];

  return (
    <section className={cn("py-8", className)}>
      <ScrollReveal>
        <h2 className="mb-2 text-center font-heading text-3xl font-bold md:text-4xl">
          Marketing Funnel
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-silver">
          Interactive overview of how Rethink guides dealership prospects from first touch to appointment.
        </p>
      </ScrollReveal>

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3">
        {funnelStages.map((stage, index) => (
          <motion.button
            key={stage.id}
            type="button"
            onClick={() => setActive(stage.id)}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className={cn(
              "relative rounded-xl border px-6 py-4 text-left transition-colors",
              active === stage.id
                ? "border-cyan/50 bg-gradient-to-r from-electric/20 via-violet/15 to-cyan/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            )}
            style={{ width: stage.width }}
            aria-pressed={active === stage.id}
          >
            <span className="font-heading text-sm font-semibold uppercase tracking-wider">
              {index + 1}. {stage.label}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-8 max-w-xl rounded-2xl glass p-6 text-center"
        >
          <h3 className="mb-2 font-heading text-xl font-semibold">{activeStage.label}</h3>
          <p className="text-silver">{activeStage.description}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
