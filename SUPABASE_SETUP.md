# Supabase Setup Guide

## Quick Start (2 minutes)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Click "New Project"
   - Name: `linkbio`
   - Region: Closest to your users
   - Copy the Project URL and Anon Key

2. **Create Tables** (in Supabase SQL Editor)

### Table: `pages`
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT,
  cta_text TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);
```

### Table: `leads`
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_page_id ON leads(page_id);
```

### Table: `analytics_events`
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  event_type TEXT CHECK (event_type IN ('view', 'cta_click', 'lead_submit')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_page_id ON analytics_events(page_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
```

3. **Set Environment Variables**

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

4. **Enable RLS (Row Level Security)** - Optional for MVP, required for multi-tenant

In Supabase Dashboard:
- Go to Authentication → Policies
- Enable RLS on all tables
- Add policies as needed

## Deployment to Vercel

1. Push code to GitHub
2. Create Vercel project from GitHub repo
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

## Testing Locally

```bash
# Install dependencies
npm install

# Set up .env.local with your Supabase keys
cp .env.local.example .env.local
# Edit .env.local with your actual keys

# Run dev server
npm run dev

# Visit http://localhost:3000
# Go to /admin to create a test page
```

## Scaling Notes

- **Free tier:** 500 MB database, suitable for 10k+ pages
- **Pro tier:** $25/month for 8 GB, suitable for 100k+ pages
- **No migrations needed:** Schema changes done in Supabase UI
- **Auth later:** Supabase Auth ready when you add user accounts
- **Webhooks ready:** Supabase Realtime for live updates
