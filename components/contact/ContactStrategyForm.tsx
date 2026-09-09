"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Building2,
  Briefcase,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { demoRequestSchema } from "@/lib/validation/schemas";
import type { z } from "zod";
import { submitDemoRequestAction } from "@/actions/appointments";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contactCopy, demoConfirmationMessage } from "@/lib/content/revisions";
import { GlassCard } from "@/components/sections/SectionBackground";
import {
  formErrorClass,
  formInputClass,
  formInputClassWithIcon,
} from "@/lib/utils/form-styles";

type DemoFormData = z.input<typeof demoRequestSchema>;

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
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoRequestSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setStatus("idle");
    setServerError(null);
    const result = await submitDemoRequestAction(data);
    if (result.success) {
      setStatus("success");
      reset();
      return;
    }
    setStatus("error");
    setServerError(result.error || "Something went wrong. Please try again.");
  };

  return (
    <GlassCard className={cn("border-white/10", className)}>
      <h2 className="font-heading text-2xl font-bold md:text-3xl">
        {contactCopy.formTitle}
      </h2>
      <p className="mt-2 text-sm text-silver">
        All demo requests route to contact@rethinkautomotive.com
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <IconField icon={User} error={errors.name?.message}>
            <input {...register("name")} className={formInputClassWithIcon} placeholder="Name" />
          </IconField>
          <IconField icon={Building2} error={errors.dealershipName?.message}>
            <input
              {...register("dealershipName")}
              className={formInputClassWithIcon}
              placeholder="Dealership / Dealer Group"
            />
          </IconField>
          <IconField icon={Briefcase} error={errors.title?.message}>
            <input
              {...register("title")}
              className={formInputClassWithIcon}
              placeholder="Title / Role"
            />
          </IconField>
          <IconField icon={Mail} error={errors.workEmail?.message}>
            <input
              {...register("workEmail")}
              type="email"
              className={formInputClassWithIcon}
              placeholder="Email"
            />
          </IconField>
          <IconField icon={Phone} error={errors.phone?.message} className="md:col-span-2">
            <input {...register("phone")} className={formInputClassWithIcon} placeholder="Phone" />
          </IconField>
        </div>

        <IconField icon={MessageSquare} error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={4}
            className={cn(formInputClassWithIcon, "resize-none")}
            placeholder="What do you want to improve? (optional)"
          />
        </IconField>

        <label className="flex items-start gap-3 text-sm text-silver">
          <input
            type="checkbox"
            {...register("consentGiven")}
            className="mt-1 h-4 w-4 rounded border-neutral-300 bg-white accent-brand-orange"
          />
          <span>
            I agree to be contacted about my demo request. Submission does not guarantee
            confirmation until reviewed by our team.
          </span>
        </label>
        {errors.consentGiven && (
          <p className={formErrorClass}>{errors.consentGiven.message}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full uppercase tracking-wider"
          size="lg"
        >
          {contactCopy.submitLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-silver/70">
          <Lock className="h-3.5 w-3.5" />
          Your information is secure and will only be used to follow up on your demo request.
        </p>

        {status === "success" && (
          <p className="text-center text-sm font-medium text-brand-orange">
            {demoConfirmationMessage}
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
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        {children}
      </div>
      {error && <p className={formErrorClass}>{error}</p>}
    </div>
  );
}

