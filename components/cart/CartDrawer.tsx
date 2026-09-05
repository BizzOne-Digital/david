"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatMoney } from "@/lib/utils/money";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotalCents } =
    useCart();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden
          />
          <motion.aside
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reducedMotion ? undefined : { x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-graphite"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-cyan" />
                <h2 className="font-heading text-lg font-semibold">Your Cart</h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-lg p-2 hover:bg-white/10"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <p className="text-center text-silver">
                  Your cart is empty. Browse products to get started.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.productId} className="glass rounded-xl p-4">
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-silver">
                            {formatMoney(item.unitPriceCents)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="text-silver hover:text-white"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="rounded-md border border-white/10 p-1"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="rounded-md border border-white/10 p-1"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/10 p-6">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-silver">Subtotal</span>
                <span className="font-medium">{formatMoney(subtotalCents)}</span>
              </div>
              <Button asChild className="w-full" disabled={items.length === 0}>
                <Link href="/checkout" onClick={closeCart}>
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
