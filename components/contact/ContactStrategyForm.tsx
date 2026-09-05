"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  Globe,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { appointmentSchema } from "@/lib/validation/schemas";
import type { z } from "zod";
import { submitAppointmentAction } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { interestedSolutions, preferredTimes } from "@/lib/content/contact-page";
import { GlassCard } from "@/components/sections/SectionBackground";

type StrategyFormData = z.input<typeof appointmentSchema>;

interface ContactStrategyFormProps {
  className?: string;
}

export function ContactStrategyForm({ className }: ContactStrategyFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StrategyFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      consentGiven: undefined,
    },
  });

  const onSubmit = async (data: StrategyFormData) => {
    setStatus("idle");
    setServerError(null);
    const result = await submitAppointmentAction(data);
    if (result.success) {
      setStatus("success");
      reset({
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      return;
    }
    setStatus("error");
    setServerError(result.error || "Something went wrong. Please try again.");
  };

  return (
    <GlassCard className={cn("border-cyan/20 glow-cyan", className)}>
      <h2 className="font-heading text-2xl font-bold md:text-3xl">
        Book Your Strategy Call
      </h2>
      <p className="mt-2 text-sm text-silver">
        A smarter conversation for a stronger tomorrow.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <IconField icon={User} error={errors.name?.message}>
            <input {...register("name")} className={inputClass} placeholder="Your name" />
          </IconField>
          <IconField icon={Building2} error={errors.dealershipName?.message}>
            <input
              {...register("dealershipName")}
              className={inputClass}
              placeholder="Dealership name"
            />
          </IconField>
          <IconField icon={Mail} error={errors.workEmail?.message}>
            <input
              {...register("workEmail")}
              type="email"
              className={inputClass}
              placeholder="Work email"
            />
          </IconField>
          <IconField icon={Phone} error={errors.phone?.message}>
            <input {...register("phone")} className={inputClass} placeholder="Phone" />
          </IconField>
          <IconField icon={Globe} error={errors.website?.message}>
            <input
              {...register("website")}
              className={inputClass}
              placeholder="Website (optional)"
            />
          </IconField>
          <IconField icon={MessageSquare} error={errors.interestedIn?.message}>
            <select {...register("interestedIn")} className={inputClass}>
              <option value="">Interested solution</option>
              {interestedSolutions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </IconField>
          <IconField icon={Calendar} error={errors.preferredDate?.message}>
            <input {...register("preferredDate")} type="date" className={inputClass} />
          </IconField>
          <IconField icon={Clock} error={errors.preferredTime?.message}>
            <select {...register("preferredTime")} className={inputClass}>
              <option value="">Preferred time</option>
              {preferredTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </IconField>
        </div>

        <IconField icon={MessageSquare} error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={4}
            className={cn(inputClass, "resize-none")}
            placeholder="Tell us about your goals..."
          />
        </IconField>

        <input type="hidden" {...register("timezone")} />

        <label className="flex items-start gap-3 text-sm text-silver">
          <input
            type="checkbox"
            {...register("consentGiven")}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan"
          />
          <span>
            I agree to be contacted about my request. Submission does not guarantee
            appointment confirmation until reviewed by our team.
          </span>
        </label>
        {errors.consentGiven && (
          <p className="text-xs text-red-400">{errors.consentGiven.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full uppercase tracking-wider"
          size="lg"
        >
          <Calendar className="h-4 w-4" />
          Request A Strategy Call
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-silver/70">
          <Lock className="h-3.5 w-3.5" />
          Your information is secure and will only be used to schedule your call.
        </p>

        {status === "success" && (
          <p className="text-center text-sm text-cyan">
            Thank you — your request has been received. Our team will follow up to confirm
            your strategy call.
          </p>
        )}
        {status === "error" && serverError && (
          <p className="text-center text-sm text-red-400">{serverError}</p>
        )}
      </form>
    </GlassCard>
  );
}

function IconField({
  icon: Icon,
  error,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan/70" />
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm text-white placeholder:text-silver/50 backdrop-blur-sm focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30";
