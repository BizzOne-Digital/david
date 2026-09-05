import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPageContent } from "@/components/services/ServiceDetailPageContent";
import { getServiceBySlug, serviceDetails } from "@/lib/content/service-details";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <ServiceDetailPageContent service={service} />;
}
