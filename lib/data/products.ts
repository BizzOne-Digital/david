import connectDB from "@/lib/db/connect";
import Product from "@/models/Product";
import { getProductSalePrice } from "@/lib/discounts/calculate";

export interface ProductFilters {
  category?: string;
  featured?: boolean;
  active?: boolean;
  search?: string;
  limit?: number;
  skip?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  await connectDB();

  const query: Record<string, unknown> = {};

  if (filters.active !== false) {
    query.isActive = true;
  }
  if (filters.featured) {
    query.isFeatured = true;
  }
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { shortDescription: { $regex: filters.search, $options: "i" } },
    ];
  }

  const products = await Product.find(query)
    .populate("category", "name slug")
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(filters.skip ?? 0)
    .limit(filters.limit ?? 100)
    .lean();

  return products.map((product) => ({
    ...product,
    pricing: getProductSalePrice(product),
  }));
}

export async function getProductBySlug(slug: string) {
  await connectDB();

  const product = await Product.findOne({ slug, isActive: true })
    .populate("category", "name slug")
    .lean();

  if (!product) return null;

  return {
    ...product,
    pricing: getProductSalePrice(product),
  };
}

export async function getFeaturedProducts(limit = 6) {
  return getProducts({ featured: true, limit });
}

export async function getProductCount(filters: Pick<ProductFilters, "active" | "category"> = {}) {
  await connectDB();

  const query: Record<string, unknown> = {};
  if (filters.active !== false) query.isActive = true;
  if (filters.category) query.category = filters.category;

  return Product.countDocuments(query);
}
