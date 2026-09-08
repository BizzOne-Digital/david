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
      headerCtaLabel: "Request Demo",
      headerCtaUrl: "/contact",
      announcementBar: {
        enabled: true,
        text: "See what your dealership may be missing — request a demo today.",
        link: "/contact",
      },
      footerContent: {
        brandStatement:
          "Creative + Campaign + AI + Dashboard + Advisory for dealership growth.",
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
      contactForPricingLabel: "Request Demo",
      currency: "USD",
      taxRate: 0,
      purchasingEnabled: false,
      maintenanceMode: false,
      cookieBannerEnabled: true,
      navigation: [
        { label: "Home", href: "/", order: 0, isActive: true },
        { label: "Solutions", href: "/products", order: 1, isActive: true },
        { label: "Consulting", href: "/consulting", order: 2, isActive: true },
        { label: "Future Fuel", href: "/future-fuel", order: 3, isActive: true },
        { label: "About Us", href: "/about", order: 4, isActive: true },
        { label: "Contact", href: "/contact", order: 5, isActive: true },
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
          title: "Dealer Intelligence That Sells.",
          content:
            "AI-powered targeting, follow-up and service-to-sales conversion built to capture the opportunities already inside your dealership — with dealer-controlled dashboards and campaigns designed around measurable action.",
          isVisible: false,
          order: 2,
        },
        {
          id: "whyRethink",
          type: "whyRethink",
          title: "Four Core Capabilities",
          items: [
            {
              title: "Smart Email Targeting",
              description:
                "Reach the right customers with the right message, inventory and reason to act.",
            },
            {
              title: "AI Follow-Up",
              description:
                "Persistent, intelligent engagement designed to keep qualified opportunities from disappearing.",
            },
            {
              title: "Dealer Control",
              description:
                "See campaigns, engagement and opportunities through management dashboard controls.",
            },
            {
              title: "Service to Sales",
              description:
                "Identify service customers who may be ready for a replacement, upgrade or trade conversation.",
            },
          ],
          isVisible: true,
          order: 3,
        },
        {
          id: "process",
          type: "process",
          title: "Watch One Missed Lead Become a Real Opportunity.",
          items: [
            { step: "New Lead", description: "A qualified opportunity enters your pipeline." },
            { step: "AI Engages", description: "Intelligent follow-up keeps the conversation alive." },
            { step: "Appointment", description: "Interest moves toward a scheduled conversation." },
            { step: "Opportunity", description: "Management sees progress and qualified handoff." },
          ],
          isVisible: false,
          order: 4,
        },
        {
          id: "conversion",
          type: "conversion",
          title: "You're Already Sitting on the Opportunity. Let's Find It.",
          subtitle: "Request a demo to see what your dealership should rethink.",
          ctaLabel: "Request Demo",
          ctaUrl: "/contact",
          isVisible: false,
          order: 5,
        },
      ],
    },
    {
      pageSlug: "about",
      pageTitle: "About Us",
      seoTitle: "About Us | Rethink Automotive Inc.",
      seoDescription:
        "Learn about Rethink Automotive — partners who help dealerships find missed opportunity and turn insight into action.",
      sections: [
        {
          id: "story",
          type: "text",
          title: "Our Story",
          content:
            "Rethink Automotive was created around a simple belief: dealerships do not need another vendor telling them to buy more technology. They need partners who understand automotive retail, recognize where opportunity is being missed, and can help turn insight into action.",
          isVisible: true,
          order: 1,
        },
        {
          id: "mission",
          type: "text",
          title: "Mission",
          content:
            "To help automotive dealerships generate, nurture, and convert leads through intelligent digital marketing systems and consultative partnership.",
          isVisible: true,
          order: 2,
        },
        {
          id: "vision",
          type: "text",
          title: "Vision",
          content:
            "We help dealerships find missed opportunity and turn insight into practical marketing, follow-up and consulting action.",
          isVisible: false,
          order: 3,
        },
        {
          id: "values",
          type: "list",
          title: "Values",
          items: [
            { title: "Partnership", description: "We work alongside dealership teams as an extension of their growth strategy." },
            { title: "Integrity", description: "Honest communication, measurable action and transparent reporting." },
            { title: "Future Focus", description: "We study market, technology and consumer change so dealers can decide—not react." },
          ],
          isVisible: false,
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
          title: "See What Your Dealership May Be Missing.",
          content:
            "Give us a short look at your goals. We'll show you how Rethink can identify and activate opportunities across marketing, follow-up, service-to-sales and future-fuel demand.",
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
