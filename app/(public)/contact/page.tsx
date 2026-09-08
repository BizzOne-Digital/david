import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { contactCopy } from "@/lib/content/revisions";

export const metadata: Metadata = {
  title: "Contact | Rethink Automotive Inc.",
  description: contactCopy.subhead,
};

export default function ContactPage() {
  return <ContactPageContent />;
}
