"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  compact?: boolean;
  className?: string;
}

export function NewsletterForm({ compact, className }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/newsletter", {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(compact ? "flex flex-col gap-2 sm:flex-row" : "space-y-4", className)}
    >
      <div className={compact ? "flex-1" : undefined}>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder:text-silver/60 focus:border-cyan/50 focus:outline-none"
          aria-label="Email address"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} size={compact ? "default" : "lg"}>
        {isSubmitting ? "..." : "Subscribe"}
      </Button>
      {status === "success" && (
        <p className={cn("text-sm text-cyan", compact && "sm:col-span-2")}>
          You&apos;re subscribed.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Subscription failed. Please try again.</p>
      )}
    </form>
  );
}
