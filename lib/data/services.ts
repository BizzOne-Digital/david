import connectDB from "@/lib/db/connect";
import Service from "@/models/Service";

export interface ServiceFilters {
  featured?: boolean;
  active?: boolean;
  limit?: number;
  skip?: number;
}

export async function getServices(filters: ServiceFilters = {}) {
  await connectDB();

  const query: Record<string, unknown> = {};

  if (filters.active !== false) {
    query.isActive = true;
  }
  if (filters.featured) {
    query.isFeatured = true;
  }

  return Service.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(filters.skip ?? 0)
    .limit(filters.limit ?? 100)
    .lean();
}

export async function getServiceBySlug(slug: string) {
  await connectDB();
  return Service.findOne({ slug, isActive: true }).lean();
}

export async function getFeaturedServices(limit = 4) {
  return getServices({ featured: true, limit });
}
