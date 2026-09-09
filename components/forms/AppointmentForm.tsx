"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formErrorClass,
  formInputClass,
  formLabelClass,
} from "@/lib/utils/form-styles";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone is required"),
  company: z.string().min(2, "Company is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  className?: string;
}

export function AppointmentForm({ className }: AppointmentFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className={formInputClass} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} type="email" className={formInputClass} />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} className={formInputClass} />
        </Field>
        <Field label="Dealership / Company" error={errors.company?.message}>
          <input {...register("company")} className={formInputClass} />
        </Field>
        <Field label="Preferred Date" error={errors.preferredDate?.message}>
          <input {...register("preferredDate")} type="date" className={formInputClass} />
        </Field>
        <Field label="Preferred Time" error={errors.preferredTime?.message}>
          <select {...register("preferredTime")} className={formInputClass}>
            <option value="">Select a time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </Field>
      </div>
      <Field label="Notes (optional)" error={errors.notes?.message}>
        <textarea
          {...register("notes")}
          rows={4}
          className={cn(formInputClass, "resize-none")}
          placeholder="Share context for your strategy call..."
        />
      </Field>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Booking..." : "Book Strategy Call"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-cyan">Request received — we&apos;ll confirm your appointment soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Unable to submit. Please try again or contact us directly.</p>
      )}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={formLabelClass}>{label}</label>
      {children}
      {error && <p className={formErrorClass}>{error}</p>}
    </div>
  );
}

