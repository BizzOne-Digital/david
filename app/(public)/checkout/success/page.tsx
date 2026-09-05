import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your order has been submitted.",
};

export default function CheckoutSuccessPage() {
  return (
    <section className="container mx-auto max-w-xl px-4 py-16 text-center md:py-24">
      <CheckCircle2 className="mx-auto h-16 w-16 text-cyan" />
      <h1 className="mt-6 font-heading text-3xl font-bold">Thank You</h1>
      <p className="mt-4 text-silver">
        Your order has been received. A member of our team will contact you shortly to confirm details and next steps.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </section>
  );
}
