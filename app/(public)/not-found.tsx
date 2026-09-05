import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-mono text-sm text-cyan">404</p>
      <h1 className="mt-4 font-heading text-4xl font-bold">Page not found</h1>
      <p className="mt-4 max-w-md text-silver">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return Home</Link>
      </Button>
    </section>
  );
}
