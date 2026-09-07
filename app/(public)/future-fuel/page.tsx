import type { Metadata } from "next";
import { FutureFuelPageContent } from "@/components/future-fuel/FutureFuelPageContent";

export const metadata: Metadata = {
  title: "Future Fuel Intelligence | Rethink Automotive Inc.",
  description:
    "Build a future-fuel strategy for EV, hybrid, PHEV and emerging powertrain demand in your market.",
};

export default function FutureFuelPage() {
  return <FutureFuelPageContent />;
}
