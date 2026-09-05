"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatMoney } from "@/lib/utils/money";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  email: z.string().email("Valid email required"),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone is required"),
  company: z.string().optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  className?: string;
}

export function CheckoutForm({ className }: CheckoutFormProps) {
  const { items, subtotalCents, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0 && status !== "success") {
    return (
      <div className={cn("glass rounded-2xl p-8 text-center", className)}>
        <p className="text-silver">Your cart is empty.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, items }),
      });
      if (!response.ok) throw new Error("Failed");
      clearCart();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("glass rounded-2xl p-8 text-center", className)}>
        <h2 className="font-heading text-2xl font-bold">Order Submitted</h2>
        <p className="mt-2 text-silver">
          Thank you — our team will follow up to complete your purchase.
        </p>
        <Button asChild className="mt-6">
          <Link href="/checkout/success">View Confirmation</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("grid gap-8 lg:grid-cols-3", className)}>
      <div className="space-y-4 lg:col-span-2">
        <h2 className="font-heading text-xl font-semibold">Billing Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full Name" error={errors.name?.message}>
            <input {...register("name")} className={inputClass} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input {...register("email")} type="email" className={inputClass} />
          </Field>
          <Field label="Phone" error={errors.phone?.message}>
            <input {...register("phone")} className={inputClass} />
          </Field>
          <Field label="Company" error={errors.company?.message}>
            <input {...register("company")} className={inputClass} />
          </Field>
          <Field label="Address" error={errors.address?.message} className="md:col-span-2">
            <input {...register("address")} className={inputClass} />
          </Field>
          <Field label="City" error={errors.city?.message}>
            <input {...register("city")} className={inputClass} />
          </Field>
          <Field label="State" error={errors.state?.message}>
            <input {...register("state")} className={inputClass} />
          </Field>
          <Field label="ZIP" error={errors.zip?.message}>
            <input {...register("zip")} className={inputClass} />
          </Field>
        </div>
      </div>

      <div className="glass h-fit rounded-2xl p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold">Order Summary</h2>
        <ul className="mb-4 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between text-silver">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatMoney(item.unitPriceCents * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-white/10 pt-4 font-medium">
          <span>Subtotal</span>
          <span>{formatMoney(subtotalCents)}</span>
        </div>
        <Button type="submit" disabled={isSubmitting} className="mt-6 w-full">
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
        {status === "error" && (
          <p className="mt-2 text-xs text-red-400">Checkout failed. Please try again.</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-silver">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30";
