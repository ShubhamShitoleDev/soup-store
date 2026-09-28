# Soup Up — Next.js E-commerce Template

A ready-to-run storefront template (App Router + TypeScript + Tailwind v4),
styled after a warm marigold/terracotta food brand, with a signature
**Reels-style video shelf** ("The Soup Up Show") for short product clips.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Database setup (MySQL via Hostinger) — do this first

This uses **Prisma** (type-safe query builder) against a plain MySQL database —
works with Hostinger's built-in MySQL (free with your hosting plan) or any
other MySQL host.

1. **Create the database in Hostinger:**
   hPanel → **Databases → MySQL Databases** → create a new database + user.
   Note the database name, username, password, and host it gives you.

2. **Set your connection string.**
   Copy `.env.local.example` to `.env.local` and fill in:
   ```
   DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DATABASE_NAME"
   NEXTAUTH_SECRET="<run: openssl rand -base64 32>"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   ```
   (Google OAuth values come from Google Cloud Console → Credentials — only
   needed if you want the "Continue with Google" button to work; email/password
   login works without it.)

3. **Push the schema and seed sample data:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```
   `db push` creates every table (`User`, `Product`, `Order`, etc.) from
   `prisma/schema.prisma`. `db seed` loads the 4 sample soups + reels from
   `prisma/seed.ts`.

   **Note (Prisma 7):** the database connection now lives in `prisma.config.ts`
   at the project root, not in `schema.prisma` — that file reads `DATABASE_URL`
   from `.env.local` automatically. You shouldn't need to touch it.

4. **View/edit your data anytime** via Hostinger's **phpMyAdmin** (hPanel →
   Databases → phpMyAdmin) — no extra tool needed, works like a spreadsheet
   view of every table.

5. **Make yourself an admin:** sign up once through `/signup`, then in
   phpMyAdmin run:
   ```sql
   UPDATE User SET role = 'ADMIN' WHERE email = 'you@example.com';
   ```

## What's included

- `components/AnnouncementBar.tsx` — dismissible top banner
- `components/Header.tsx` — logo, nav, search/account/wishlist/cart icons, mobile menu
- `components/Hero.tsx` — banner + 3-step "how it works"
- `components/ProductGrid.tsx` + `ProductCard.tsx` — product listing with Add to Cart
- `components/ReelsShow.tsx` — horizontal snap-scroll vertical video shelf.
  Videos autoplay muted while in view, pause when scrolled out, tap to unmute.
- `components/Reviews.tsx` — Google-review style testimonials
- `components/FeaturedIn.tsx` — scrolling press-logo marquee
- `components/Footer.tsx` — quick links, policies, socials, newsletter
- `context/CartContext.tsx` — client-side cart (persists to localStorage),
  no backend required yet
- `lib/data.ts` — sample product & reel data — replace with your real
  products once you wire up a database or CMS

## Add your real media

1. Drop product photos in `public/products/` and update `image` paths in `lib/data.ts`
2. Drop reel clips (vertical, ~9:16, ideally <10MB each, mp4/H.264) in `public/reels/`
   and a matching poster/thumbnail jpg, then update `lib/data.ts`
3. Swap the placeholder `<div>` in `ProductCard.tsx` for `next/image` once you
   have real photos:
   ```tsx
   import Image from "next/image";
   <Image src={product.image} alt={product.name} fill className="object-cover" />
   ```

## Next steps (not included yet — ask if you want these built)

- Product detail pages (`/product/[slug]`)
- Checkout flow + Razorpay/Stripe integration
- Login (NextAuth / Clerk / Supabase Auth, or guest checkout only)
- Order storage (Supabase/Postgres or any DB of your choice)

## Deploy

Push this to GitHub, then connect the repo in Hostinger's Next.js/Node.js
hosting (or Vercel) and point your domain at it.
