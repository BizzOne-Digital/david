import "dotenv/config";
import bcrypt from "bcryptjs";
import connectDB from "../lib/db/connect";
import User from "../models/User";
import Product from "../models/Product";
import ProductCategory from "../models/ProductCategory";
import Service from "../models/Service";
import SiteSettings from "../models/SiteSettings";
import PageContent from "../models/PageContent";
import { getAdminSeedPages, getSeedProductsFromFeatured, getSiteSettingsSyncFields } from "../lib/content/admin-seed-pages";
import { placeholderServices } from "../lib/content/placeholders";

async function seed() {
  console.log("🌱 Starting seed...");

  if (!process.env.MONGODB_URI) {
    console.error("❌ MONGODB_URI is required. Copy .env.example to .env and configure it.");
    process.exit(1);
  }

  await connectDB();

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rethinkautomotive.com";
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (!adminPassword) {
    console.error("❌ ADMIN_INITIAL_PASSWORD is required in .env");
    process.exit(1);
  }

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await User.create({
      email: adminEmail,
      password: hashedPassword,
      name: "Super Admin",
      role: "super_admin",
      isActive: true,
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`⏭️  Admin user already exists: ${adminEmail}`);
  }

  // Seed / sync site settings
  const settingsSync = getSiteSettingsSyncFields();
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings) {
    await SiteSettings.create({
      ...settingsSync,
      logo: "/images/rethink-logo.jpg",
      brandColors: {
        primary: "#00d2ff",
        secondary: "#6b00ff",
        accent: "#ff00ff",
      },
      gradientColors: {
        from: "#00d2ff",
        via: "#0033ff",
        to: "#ff00ff",
      },
      currency: "USD",
      taxRate: 0,
      purchasingEnabled: false,
      maintenanceMode: false,
      cookieBannerEnabled: true,
      socialLinks: [
        { platform: "LinkedIn", url: "#", isActive: true },
        { platform: "X", url: "#", isActive: true },
        { platform: "YouTube", url: "#", isActive: true },
      ],
    });
    console.log("✅ Site settings created");
  } else {
    await SiteSettings.findOneAndUpdate({}, { $set: settingsSync });
    console.log("✅ Site settings synced from revisions");
  }

  // Seed categories
  const categoryMap: Record<string, string> = {};
  const categories = [
    { name: "AI Solutions", slug: "ai-solutions", displayOrder: 1 },
    { name: "Email Marketing", slug: "email-marketing", displayOrder: 2 },
    { name: "Reputation", slug: "reputation", displayOrder: 3 },
  ];

  for (const cat of categories) {
    let category = await ProductCategory.findOne({ slug: cat.slug });
    if (!category) {
      category = await ProductCategory.create({ ...cat, isActive: true });
      console.log(`✅ Category created: ${cat.name}`);
    }
    categoryMap[cat.name] = category._id.toString();
  }

  // Seed / sync flagship products from live solutions content
  for (const product of getSeedProductsFromFeatured()) {
    const { categoryName, ...productData } = product;
    const categoryId = categoryName ? categoryMap[categoryName] : undefined;
    await Product.findOneAndUpdate(
      { slug: product.slug },
      {
        $set: {
          ...productData,
          ...(categoryId ? { category: categoryId } : {}),
        },
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Product synced: ${product.slug}`);
  }

  // Seed services
  for (const [index, service] of placeholderServices.entries()) {
    const existing = await Service.findOne({ slug: service.slug });
    if (!existing) {
      await Service.create({
        title: service.title,
        slug: service.slug,
        icon: service.icon,
        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription,
        features: service.features,
        isFeatured: service.isFeatured,
        isActive: true,
        displayOrder: index,
        ctaLabel: service.ctaLabel,
        isPlaceholder: true,
      });
      console.log(`✅ Service created: ${service.title}`);
    } else {
      console.log(`⏭️  Service already exists: ${service.slug}`);
    }
  }

  // Sync page content for admin editor
  for (const page of getAdminSeedPages()) {
    const pageDoc = JSON.parse(JSON.stringify(page));
    await PageContent.findOneAndUpdate(
      { pageSlug: page.pageSlug },
      { $set: pageDoc },
      { upsert: true }
    );
    console.log(`✅ Page content synced: ${page.pageSlug}`);
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log(`\n📧 Admin login: ${adminEmail}`);
  console.log("🔐 Password: (value from ADMIN_INITIAL_PASSWORD in .env)");
  console.log("🌐 Admin portal: /admin/login\n");

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
