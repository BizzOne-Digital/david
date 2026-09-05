"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stages = [
  {
    id: "traffic",
    label: "Traffic",
    description: "Drive qualified visitors to your digital storefront.",
    icon: Users,
    color: "from-electric to-electric/60",
  },
  {
    id: "engagement",
    label: "Engagement",
    description: "Capture attention with timely, personalized outreach.",
    icon: MessageSquare,
    color: "from-violet to-violet/60",
  },
  {
    id: "qualified-lead",
    label: "Qualified Lead",
    description: "Identify buyers ready for sales conversations.",
    icon: ArrowRight,
    color: "from-cyan to-cyan/60",
  },
  {
    id: "appointment",
    label: "Appointment",
    description: "Book showroom visits and test drives seamlessly.",
    icon: Calendar,
    color: "from-electric via-violet to-cyan",
  },
];

export function LeadJourneyVisual({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <ScrollReveal>
        <p className="mb-8 text-center text-sm uppercase tracking-[0.2em] text-silver">
          Lead Journey
        </p>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <ScrollReveal key={stage.id} delay={index * 0.1}>
              <div className="relative glass rounded-2xl p-6 text-center">
                {!reducedMotion && index < stages.length - 1 && (
                  <motion.div
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-white/30 to-transparent md:block"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                  />
                )}
                <div
                  className={cn(
                    "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br",
                    stage.color
                  )}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">{stage.label}</h3>
                <p className="text-sm text-silver">{stage.description}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
