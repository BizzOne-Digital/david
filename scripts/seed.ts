import "dotenv/config";
import bcrypt from "bcryptjs";
import connectDB from "../lib/db/connect";
import User from "../models/User";
import Product from "../models/Product";
import ProductCategory from "../models/ProductCategory";
import Service from "../models/Service";
import SiteSettings from "../models/SiteSettings";
import PageContent from "../models/PageContent";
import { placeholderProducts, placeholderServices } from "../lib/content/placeholders";

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

  // Seed site settings
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings) {
    await SiteSettings.create({
      businessName: "Rethink Automotive Inc.",
      logo: "/images/rethink-logo.png",
      contactEmail: "contact@rethinkautomotive.com",
      contactPhone: "(615) 571-9900",
      defaultSeoTitle: "Rethink Automotive Inc. | Dealership Marketing Solutions",
      defaultSeoDescription:
        "AI-powered and email-driven marketing systems designed to help automotive dealers attract, nurture, and convert more opportunities.",
      headerCtaLabel: "Book a Strategy Call",
      headerCtaUrl: "/book-appointment",
      announcementBar: {
        enabled: false,
        text: "[PLACEHOLDER] Announcement text — edit in Admin → Settings",
      },
      footerContent: {
        brandStatement: "Smarter marketing systems for modern dealerships.",
        copyright: `© ${new Date().getFullYear()} Rethink Automotive Inc. All rights reserved.`,
      },
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
      homepageSections: [
        { sectionId: "hero", isVisible: true, order: 1 },
        { sectionId: "brandStatement", isVisible: true, order: 2 },
        { sectionId: "flagshipProducts", isVisible: true, order: 3 },
        { sectionId: "aiJourney", isVisible: true, order: 4 },
        { sectionId: "services", isVisible: true, order: 5 },
        { sectionId: "whyRethink", isVisible: true, order: 6 },
        { sectionId: "process", isVisible: true, order: 7 },
        { sectionId: "productsPreview", isVisible: true, order: 8 },
        { sectionId: "conversion", isVisible: true, order: 9 },
      ],
      contactForPricingLabel: "Contact for Pricing",
      currency: "USD",
      taxRate: 0,
      purchasingEnabled: false,
      maintenanceMode: false,
      cookieBannerEnabled: true,
      navigation: [
        { label: "Home", href: "/", order: 0, isActive: true },
        { label: "About", href: "/about", order: 1, isActive: true },
        { label: "Products", href: "/products", order: 2, isActive: true },
        { label: "Services", href: "/services", order: 3, isActive: true },
        { label: "Contact", href: "/contact", order: 4, isActive: true },
      ],
      socialLinks: [
        { platform: "LinkedIn", url: "#", isActive: true },
        { platform: "X", url: "#", isActive: true },
        { platform: "YouTube", url: "#", isActive: true },
      ],
    });
    console.log("✅ Site settings created");
  } else {
    console.log("⏭️  Site settings already exist");
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

  // Seed products (only placeholder flagship products)
  for (const [index, product] of placeholderProducts.entries()) {
    const existing = await Product.findOne({ slug: product.slug });
    if (!existing) {
      await Product.create({
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        features: product.features,
        benefits: product.benefits,
        showPricing: product.showPricing,
        contactForPricing: product.contactForPricing,
        purchaseMode: product.purchaseMode,
        isFeatured: product.isFeatured,
        isActive: true,
        displayOrder: index,
        ctaLabel: product.ctaLabel,
        category: categoryMap[product.category] || undefined,
        isPlaceholder: true,
        seoTitle: `${product.name} | Rethink Automotive`,
        seoDescription: product.shortDescription,
      });
      console.log(`✅ Product created: ${product.name}`);
    } else {
      console.log(`⏭️  Product already exists: ${product.slug}`);
    }
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

  // Seed page content
  const pages = [
    {
      pageSlug: "home",
      pageTitle: "Home",
      sections: [
        {
          id: "hero",
          type: "hero",
          eyebrow: "I'm not lion…",
          title: "You're Sitting on Deals You're Not Closing.",
          subtitle:
            "The opportunities are already in your database, website traffic, service lane and follow-up. Rethink Automotive helps you find them, engage them and turn more of them into real sales conversations.",
          ctaLabel: "Request Demo",
          ctaUrl: "/contact",
          isVisible: true,
          order: 1,
        },
        {
          id: "brandStatement",
          type: "brandStatement",
          title: "Marketing Has Changed. Your Systems Should Too.",
          content:
            "[PLACEHOLDER] Automotive marketing has evolved beyond disconnected campaigns. Dealerships need smarter, connected systems that generate demand and nurture leads through every stage.",
          isVisible: true,
          order: 2,
        },
        {
          id: "whyRethink",
          type: "whyRethink",
          title: "Why Rethink Automotive",
          items: [
            { title: "Automotive-Focused Strategy", description: "[PLACEHOLDER] Marketing built specifically for dealership operations and sales cycles." },
            { title: "Connected Marketing Experiences", description: "[PLACEHOLDER] Unified campaigns across email, digital, and lead engagement channels." },
            { title: "Modern Lead Engagement", description: "[PLACEHOLDER] Tools and workflows designed for today's buyer expectations." },
            { title: "Clear Dealership Communication", description: "[PLACEHOLDER] Transparent reporting and actionable insights for decision-makers." },
            { title: "Flexible Digital Solutions", description: "[PLACEHOLDER] Scalable programs that adapt to your dealership's goals." },
          ],
          isVisible: true,
          order: 3,
        },
        {
          id: "process",
          type: "process",
          title: "Our Process",
          items: [
            { step: "Discover", description: "[PLACEHOLDER] Understand your dealership, audience, and current marketing landscape." },
            { step: "Build", description: "[PLACEHOLDER] Design and configure your marketing systems and campaigns." },
            { step: "Launch", description: "[PLACEHOLDER] Deploy programs with proper tracking and team alignment." },
            { step: "Optimize", description: "[PLACEHOLDER] Continuously refine based on performance data and feedback." },
          ],
          isVisible: true,
          order: 4,
        },
        {
          id: "conversion",
          type: "conversion",
          title: "Ready to Rethink Your Dealership's Growth?",
          subtitle: "Schedule a strategy call to explore how we can help your dealership generate and convert more leads.",
          ctaLabel: "Book a Strategy Call",
          ctaUrl: "/book-appointment",
          isVisible: true,
          order: 5,
        },
      ],
    },
    {
      pageSlug: "about",
      pageTitle: "About Us",
      seoTitle: "About Us | Rethink Automotive Inc.",
      seoDescription: "[PLACEHOLDER] Learn about Rethink Automotive's mission to transform dealership marketing.",
      sections: [
        {
          id: "story",
          type: "text",
          title: "Our Story",
          content: "[PLACEHOLDER] Brand story content will be provided by the client. This section is editable from the admin portal.",
          isVisible: true,
          order: 1,
        },
        {
          id: "mission",
          type: "text",
          title: "Mission",
          content: "[PLACEHOLDER] To help automotive dealerships generate, nurture, and convert leads through intelligent digital marketing systems.",
          isVisible: true,
          order: 2,
        },
        {
          id: "vision",
          type: "text",
          title: "Vision",
          content: "[PLACEHOLDER] A future where every dealership has access to modern, measurable marketing technology.",
          isVisible: true,
          order: 3,
        },
        {
          id: "values",
          type: "list",
          title: "Values",
          items: [
            { title: "Innovation", description: "[PLACEHOLDER] Embracing new technology responsibly." },
            { title: "Integrity", description: "[PLACEHOLDER] Honest communication and transparent results." },
            { title: "Partnership", description: "[PLACEHOLDER] Working alongside dealership teams as an extension of their marketing department." },
          ],
          isVisible: true,
          order: 4,
        },
      ],
    },
    {
      pageSlug: "contact",
      pageTitle: "Contact",
      seoTitle: "Contact | Rethink Automotive Inc.",
      sections: [
        {
          id: "intro",
          type: "text",
          title: "Get in Touch",
          content: "Have questions about our solutions? We'd love to hear from you.",
          isVisible: true,
          order: 1,
        },
      ],
    },
    {
      pageSlug: "book-appointment",
      pageTitle: "Book a Strategy Call",
      seoTitle: "Book a Strategy Call | Rethink Automotive Inc.",
      sections: [
        {
          id: "intro",
          type: "text",
          title: "Schedule Your Strategy Call",
          content: "Tell us about your dealership and we'll reach out to confirm your appointment. Submission does not guarantee confirmation until reviewed by our team.",
          isVisible: true,
          order: 1,
        },
      ],
    },
  ];

  for (const page of pages) {
    const existing = await PageContent.findOne({ pageSlug: page.pageSlug });
    if (!existing) {
      await PageContent.create(page);
      console.log(`✅ Page content created: ${page.pageSlug}`);
    } else {
      console.log(`⏭️  Page content already exists: ${page.pageSlug}`);
    }
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
