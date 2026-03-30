# Quick Start: 25 Minutes to Revenue

## The Path Forward (Pick One)

### Option A: Deploy & Sell Today (Recommended)

**Time: 25 minutes**

```bash
# 1. Setup Supabase (10 min)
- Go to supabase.com
- Create project
- Run SQL from SUPABASE_SETUP.md
- Copy API keys

# 2. Test Locally (5 min)
npm install
npm run dev
# Create a test page at http://localhost:3000/admin

# 3. Deploy (5 min)
git push origin main
# Add env vars to Vercel dashboard

# 4. Sell (5 min)
# Go to /admin on production
# Create first customer's page
# Send them the link
# Collect payment
```

**Result:** Live product + $1st revenue

---

### Option B: Build Features First

**Time: Add 2-3 days**

Start with Option A, then:
- [ ] Add customer login (Phase 2)
- [ ] Add Stripe subscriptions
- [ ] Build analytics dashboard
- [ ] Add email notifications

**Reality:** You probably don't need these for first customers.

---

## 5-Minute Supabase Setup

### Login & Create Project
1. Go to https://supabase.com
2. Sign up or login
3. Click "New Project"
4. Fill in: Name, Password, Region
5. Wait 2 minutes

### Create Tables
Copy-paste this SQL into Supabase SQL Editor:

```sql
-- pages table
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

-- leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_page_id ON leads(page_id);

-- analytics_events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  event_type TEXT CHECK (event_type IN ('view', 'cta_click', 'lead_submit')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_page_id ON analytics_events(page_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
```

### Get Your API Keys
1. In Supabase, go to Settings → API
2. Copy "Project URL"
3. Copy "anon public" key
4. Copy "service_role" key

---

## 5-Minute Local Setup

```bash
# 1. Create environment file
cp .env.local.example .env.local

# 2. Add your Supabase keys
# Edit .env.local with your URLs and keys

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

# 5. Visit http://localhost:3000
```

**Test the admin:**
- Go to http://localhost:3000/admin
- Create a test page
- Visit your page at http://localhost:3000/<slug>
- Try lead capture

---

## 5-Minute Vercel Deployment

### Connect GitHub
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Select GitHub repo: `linkbio-service`
4. Click "Import"

### Add Secrets
In Vercel dashboard:
1. Settings → Environment Variables
2. Add these 3:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Deploy

**Your site is live at:** `https://linkbio-service-xxx.vercel.app`

---

## 5-Minute First Sale

### Find Your First Customer
Pick one:
- Farmer's market vendor
- Service provider (plumber, electrician, hairdresser)
- Creator (photographer, designer)
- Coach or consultant

**Where to find:**
- Local farmers market (go talk to people)
- Instagram (DM small business accounts)
- Facebook Groups (local entrepreneurs)
- Nextdoor app (neighbor recommendations)

### Your Pitch (30 seconds)
> "I built a landing page service for small businesses. Takes 5 minutes to set up, captures leads automatically, tracks analytics. Just $9/month."

### Your Demo (1 minute)
Send them: `https://your-vercel-url.com/example`

Show:
- Hero section (impressive design)
- Lead capture form (see their email appear in dashboard)
- Analytics (show visitor count)

### Close the Sale (2 minutes)
> "I'll create a page for you right now. $9/month. Wanna try it?"

If yes:
1. Get their details
2. Go to /admin
3. Create their page (2 minutes)
4. Send them the URL
5. Collect payment (Stripe Link, PayPal, Venmo, cash)

**Boom. $1st revenue.**

---

## Files to Read (In Order)

1. **This file** — You're reading it
2. **SUPABASE_SETUP.md** — Database setup details
3. **README.md** — Project overview
4. **DEPLOYMENT.md** — How to deploy to Vercel
5. **MONETIZATION.md** — How to make money

---

## Common Mistakes to Avoid

❌ **Don't** spend time building features before selling
→ Sell first, build what customers ask for

❌ **Don't** use local SQLite
→ Use Supabase from day 1, no sync headaches

❌ **Don't** overcomplicate the design
→ Simple dark template converts better

❌ **Don't** wait for Stripe integration
→ Collect payments manually first, integrate later

❌ **Don't** spend money on ads
→ Do cold outreach first (free, high conversion)

❌ **Don't** ship to "beta users"
→ Your code is production-ready, sell confidently

---

## Troubleshooting (Quick Fixes)

**Supabase connection error?**
- Check NEXT_PUBLIC_SUPABASE_URL format (should start with https://)
- Verify API key is correct (no spaces)
- Ensure tables are created

**Pages not showing up in /admin?**
- Check Supabase tables exist
- Verify environment variables
- Check browser console for errors

**Vercel deployment failed?**
- Check build logs in Vercel dashboard
- Run `npm run lint` locally to catch errors
- Ensure Node version compatible

**Lead not saving?**
- Check page_id is correct UUID
- Verify Supabase `leads` table exists
- Check API response in browser Network tab

---

## Success Timeline

| Time | Goal | Status |
|------|------|--------|
| Now | Deploy to Vercel | Go do it |
| Today | First customer | Realistic |
| Week 1 | 3 customers, $27/mo | Expected |
| Week 2 | 10 customers, $90/mo | Achievable |
| Month 1 | 20 customers, $180/mo | With effort |
| Month 3 | 50 customers, $450/mo | If you automate |

---

## The Honest Truth

- This is not "passive income" — it requires sales
- Manual sales get you to $500/mo quickly
- Self-serve scales it to $5k/mo
- You compete on speed & price, not features
- Your first 10 customers will tell you what to build

**But you can have your first customer and first revenue TODAY.**

---

## Next Steps (Copy-Paste)

```bash
# 1. Set up Supabase (follow SUPABASE_SETUP.md)
# 2. Create .env.local with your API keys
# 3. Test locally: npm run dev
# 4. Deploy to Vercel
# 5. Create a test page at /admin
# 6. Find a local business owner
# 7. Show them their page
# 8. Collect $9
# 9. Repeat
```

**You're done. Go execute.**

---

## Questions?

**Setup:** See SUPABASE_SETUP.md
**Deployment:** See DEPLOYMENT.md
**Selling:** See MONETIZATION.md
**Code:** Check /app/api for examples

**Supabase docs:** https://supabase.com/docs
**Next.js docs:** https://nextjs.org/docs

---

**Current Status: READY TO DEPLOY**

You have everything you need. The only thing standing between you and your first customer is 25 minutes of setup.

Go do it.
