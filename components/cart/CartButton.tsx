"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const { itemCount, toggleCart } = useCart();

  return (
    <button
      type="button"
      onClick={toggleCart}
      className={cn(
        "relative rounded-lg p-2 text-white transition-colors hover:bg-white/10",
        className
      )}
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan text-xs font-bold text-obsidian">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
