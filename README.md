# LinkBio Service

Beautiful, high-converting landing pages for small business owners, creators, and service providers.

## Features (MVP)

- ⚡ **Fast Page Creation** — Create a landing page in under 5 minutes
- 📊 **Built-in Analytics** — Track visits, clicks, and lead conversions
- 📧 **Lead Capture** — Collect emails directly on the landing page
- 🎨 **Professional Design** — Modern, mobile-responsive pages out of the box
- 💰 **Revenue Ready** — Sell pages to customers immediately

## Tech Stack

- **Frontend:** Next.js 16 App Router, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (serverless)
- **Database:** Supabase PostgreSQL (hosted)
- **Deployment:** Vercel
- **Validation:** Zod

## Quick Start

### 1. Setup Supabase

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

TL;DR:
- Create account at https://supabase.com
- Create 3 tables: `pages`, `leads`, `analytics_events`
- Copy your Project URL and API keys

### 2. Set Environment Variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 3. Run Locally

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### 4. Create Your First Page

1. Go to http://localhost:3000/admin
2. Fill in customer details
3. Click "Create Page"
4. Visit the live page at `http://localhost:3000/john-doe`

### 5. Deploy to Vercel

```bash
git push origin main
# Vercel auto-deploys from GitHub
```

## API Routes

### `POST /api/pages/create`
Create a new landing page

**Request:**
```json
{
  "slug": "john-doe",
  "customer_name": "John Doe",
  "hero_title": "Welcome to my business",
  "hero_subtitle": "High-quality services for your needs",
  "cta_text": "Book Now",
  "cta_link": "https://calendly.com/john"
}
```

**Response:**
```json
{
  "id": "uuid",
  "slug": "john-doe",
  "customer_name": "John Doe",
  ...
}
```

### `POST /api/leads`
Submit an email lead

**Request:**
```json
{
  "page_id": "uuid",
  "email": "visitor@example.com"
}
```

### `POST /api/analytics`
Track an event (view, cta_click, lead_submit)

**Request:**
```json
{
  "page_id": "uuid",
  "event_type": "view"
}
```

### `GET /api/analytics?page_id=uuid`
Get analytics summary for a page

**Response:**
```json
{
  "events": [...],
  "summary": {
    "total_views": 42,
    "total_cta_clicks": 15,
    "total_leads": 3,
    "conversion_rate": "7.14"
  }
}
```

## Project Structure

```
app/
├── page.tsx              # Landing page / homepage
├── admin/
│   └── page.tsx          # Admin dashboard
├── [slug]/
│   └── page.tsx          # Dynamic landing page
└── api/
    ├── pages/
    │   └── create/
    │       └── route.ts  # Create page endpoint
    ├── leads/
    │   └── route.ts      # Submit lead endpoint
    └── analytics/
        └── route.ts      # Track events endpoint

lib/
├── supabase.ts           # Supabase client
└── validation.ts         # Zod schemas

public/                   # Static assets
```

## Roadmap

### Phase 1 (Current)
- [x] Landing page template
- [x] Admin dashboard
- [x] Lead capture
- [x] Basic analytics
- [x] Supabase integration

### Phase 2 (Week 2-3)
- [ ] Customer authentication
- [ ] Customer dashboard
- [ ] Email notifications (leads to customer)
- [ ] Advanced analytics dashboard
- [ ] Template system

### Phase 3 (Week 4+)
- [ ] Stripe integration
- [ ] Subscription billing
- [ ] Multi-tenant support
- [ ] Custom domains
- [ ] Custom CSS/HTML

## Database Schema

### pages
- `id` — UUID primary key
- `slug` — URL-friendly identifier (unique)
- `customer_name` — Business name
- `hero_title` — Main headline
- `hero_subtitle` — Secondary description
- `cta_text` — Button label
- `cta_link` — Button destination
- `created_at` — Timestamp
- `updated_at` — Timestamp

### leads
- `id` — UUID primary key
- `page_id` — FK to pages
- `email` — Visitor email
- `created_at` — Timestamp

### analytics_events
- `id` — UUID primary key
- `page_id` — FK to pages
- `event_type` — 'view' | 'cta_click' | 'lead_submit'
- `created_at` — Timestamp

## Development

### Linting
```bash
npm run lint
```

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

## Notes for Termux Development

This project is optimized for development in Termux (Android terminal):

- No Docker required
- No local database setup
- All data stored in hosted Supabase
- Environment variables via `.env.local`
- Lightweight dependencies

## Deployment Notes

### Vercel
1. Connect GitHub repo to Vercel
2. Add environment variables
3. Deploy automatically on push to main

### Scaling
- Supabase free tier supports 10k+ pages
- Pro tier ($25/month) supports 100k+ pages
- No code changes needed to scale

## Support

For issues or questions:
1. Check Supabase docs: https://supabase.com/docs
2. Check Next.js docs: https://nextjs.org/docs
3. Review SUPABASE_SETUP.md for database setup help

## License

MIT
