"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatMoney } from "@/lib/utils/money";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/animations/TextReveal";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotalCents, clearCart } = useCart();

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <TextReveal as="h1" text="Cart" className="text-4xl font-bold md:text-5xl" />

      {items.length === 0 ? (
        <div className="mt-12 glass rounded-2xl p-12 text-center">
          <p className="text-silver">Your cart is empty.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <li key={item.productId} className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-silver">{formatMoney(item.unitPriceCents)} each</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="rounded-md border border-white/10 p-1"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="rounded-md border border-white/10 p-1"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-mono font-medium">
                    {formatMoney(item.unitPriceCents * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-silver hover:text-white"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="glass h-fit rounded-2xl p-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>{formatMoney(subtotalCents)}</span>
            </div>
            <Button asChild className="mt-6 w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button variant="ghost" className="mt-2 w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
