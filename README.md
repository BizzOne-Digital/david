# Rethink Automotive Inc. — Website & Admin Portal

A production-ready Next.js full-stack application for **Rethink Automotive Inc.**, featuring a premium automotive marketing website with immersive animations and a comprehensive administration system.

## Features

### Public Website
- Cinematic homepage with scroll-driven animations (Framer Motion, GSAP-ready architecture)
- Two flagship product showcases (editable via admin)
- AI marketing journey funnel visualization
- Dynamic products shop with search, filters, and categories
- Services pages with detail routes
- Contact form and appointment booking
- Functional cart and checkout (Stripe-ready, optional)
- Coupon and automatic sale system
- SEO: sitemap, robots.txt, structured metadata
- WCAG-aware accessibility with reduced-motion support

### Admin Portal (`/admin`)
- Secure authentication with role-based access (Super Admin, Admin, Content Manager)
- Dashboard with real MongoDB analytics (Recharts)
- Product, category, service, order, appointment, and inquiry management
- Coupon and discount code system
- Site settings and page content editor
- Cloudinary media library
- CSV export for orders, appointments, and inquiries

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | MongoDB Atlas + Mongoose |
| Auth | NextAuth.js v5 (Auth.js) |
| Validation | Zod + React Hook Form |
| Animations | Framer Motion, Lenis, GSAP |
| 3D Effects | React Three Fiber (lightweight) |
| Media | Cloudinary |
| Email | Nodemailer (Gmail App Password) |
| Payments | Stripe (optional) |
| Charts | Recharts |

---

## Quick Start

### 1. Clone and install

```bash
npm install
```

### 2. Environment setup

Copy the example environment file:

```bash
cp .env.example .env
```

Configure all required variables (see [Environment Variables](#environment-variables) below).

### 3. MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write access
3. Whitelist your IP (or `0.0.0.0/0` for development)
4. Copy the connection string to `MONGODB_URI`

### 4. Generate auth secret

```bash
openssl rand -base64 32
```

Set the output as `AUTH_SECRET` in `.env`.

### 5. Seed the database

```bash
npm run seed
```

This creates:
- Initial admin account (from `ADMIN_EMAIL` / `ADMIN_INITIAL_PASSWORD`)
- Site settings and navigation
- Two placeholder flagship products
- Placeholder services
- Default page content (clearly marked `[PLACEHOLDER]`)

**The seed script never overwrites existing production data.**

### 6. Run development server

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin portal: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `AUTH_SECRET` | Yes | Random secret for session encryption |
| `NEXTAUTH_URL` | Yes | App URL (e.g. `http://localhost:3000`) |
| `ADMIN_EMAIL` | Yes (seed) | Initial admin email |
| `ADMIN_INITIAL_PASSWORD` | Yes (seed) | Initial admin password |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL for SEO/canonical links |
| `CONTACT_RECEIVER_EMAIL` | Recommended | Where inquiry emails are sent |
| `SMTP_HOST` | Optional | Default: `smtp.gmail.com` |
| `SMTP_PORT` | Optional | Default: `587` |
| `SMTP_USER` | Optional | Gmail address |
| `SMTP_PASS` | Optional | Gmail App Password |
| `CLOUDINARY_CLOUD_NAME` | Optional | For image uploads |
| `CLOUDINARY_API_KEY` | Optional | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Optional | Cloudinary API secret |
| `STRIPE_SECRET_KEY` | Optional | Enable when payments approved |
| `STRIPE_WEBHOOK_SECRET` | Optional | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | Stripe publishable key |

If SMTP credentials are missing, form submissions are saved to MongoDB and a non-sensitive warning is logged — the app will not crash.

---

## Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Copy Cloud Name, API Key, and API Secret to `.env`
3. Upload product and media images via **Admin → Media**

---

## Gmail App Password (SMTP)

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Set `SMTP_USER` to your Gmail address and `SMTP_PASS` to the app password

---

## Client Content Workflow

Client-provided content (copy decks, product specs, pricing, images) should be placed in:

```
/content/client-attachments/
```

See `content/client-attachments/README.md` for details.

**Client attachments are the source of truth.** Do not invent product specs, testimonials, statistics, or pricing. Replace `[PLACEHOLDER]` and `[EDITABLE]` content through:

1. **Admin → Content** — homepage, about, and page sections
2. **Admin → Products / Services** — product and service details
3. **Admin → Settings** — business info, navigation, footer, CTAs

---

## Coupon System

Administrators can create coupons with:

- Percentage or fixed-amount discounts
- Minimum order amounts
- Product/category restrictions
- Usage limits (total and per customer)
- Scheduled start/expiry dates
- Display locations: announcement bar, homepage banner, product cards, product details, cart, checkout

Coupons are validated **server-side only**. Expired or disabled coupons automatically disappear from the website.

---

## Product Sale Workflow

Put products on sale via **Admin → Products**:

1. Enable "On Sale"
2. Choose discount type: percentage, fixed amount, or custom sale price
3. Optionally schedule start/end dates
4. Frontend automatically shows strikethrough pricing, sale badge, and discount amount
5. Expired sales stop automatically

---

## Stripe Activation

Payments are **disabled by default**. To enable:

1. Create a Stripe account and obtain API keys
2. Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env`
3. Enable purchasing in **Admin → Settings**
4. Set product purchase mode to "Online Purchase"
5. Configure Stripe webhook endpoint: `https://yourdomain.com/api/stripe/webhook`

---

## Production Build

```bash
npm run build
npm start
```

Type checking:

```bash
npm run typecheck
```

---

## Vercel Deployment

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy
5. Run seed script against production MongoDB (one time):

```bash
MONGODB_URI=your-production-uri npm run seed
```

6. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your production domain

---

## Project Structure

```
app/
  (public)/          # Public marketing pages
  admin/             # Protected admin portal
  api/               # API routes (auth, upload, stripe, settings)
components/
  admin/             # Admin UI components
  animations/        # Motion and visual effects
  cart/              # Shopping cart
  forms/             # Public forms
  layout/            # Header, footer, navigation
  products/          # Product display components
  sections/          # Homepage sections
  ui/                # Shared UI primitives
actions/             # Server actions
lib/
  auth/              # NextAuth configuration
  data/              # Data fetching helpers
  db/                # MongoDB connection
  discounts/         # Price and coupon calculations
  email/             # Email sending and templates
  validation/        # Zod schemas
models/              # Mongoose models
scripts/             # Seed script
content/
  client-attachments/  # Client-provided assets
hooks/               # React hooks
types/               # TypeScript types
middleware.ts        # Route protection
```

---

## Security Notes

- Passwords hashed with bcrypt (12 rounds)
- HTTP-only session cookies via NextAuth
- Account lockout after 5 failed login attempts (15 minutes)
- Server-side coupon and price validation
- Rate limiting on auth and form endpoints
- Admin routes protected by middleware
- Secrets never exposed in client-side code
- SMTP/Cloudinary credentials masked in admin UI after saving

---

## Backup Recommendations

- Enable MongoDB Atlas automated backups (daily snapshots)
- Export orders and appointments periodically via admin CSV export
- Store Cloudinary assets with backup enabled in Cloudinary settings
- Keep `.env` values in a secure password manager — never commit `.env`

---

## Admin Roles

| Role | Access |
|------|--------|
| Super Admin | Full access including user management |
| Admin | Products, orders, appointments, settings |
| Content Manager | Page content, products, services, media |

---

## Support

- **Email:** contact@rethinkautomotive.com
- **Phone:** (615) 571-9900

---

## License

Proprietary — Rethink Automotive Inc. All rights reserved.
