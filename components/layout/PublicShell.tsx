"use client";

import dynamic from "next/dynamic";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/animations/PageTransition";

const CursorGlow = dynamic(
  () => import("@/components/animations/CursorGlow").then((m) => m.CursorGlow),
  { ssr: false }
);

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SmoothScroll>
        <div className="overflow-x-clip max-w-full">
          <CursorGlow />
          <Header />
          <main className="min-h-screen overflow-x-clip pt-16 md:pt-[72px]">
            <PageTransition className="overflow-x-clip">{children}</PageTransition>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </SmoothScroll>
    </CartProvider>
  );
}
