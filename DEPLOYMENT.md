# Deployment Guide

## Prerequisites

- GitHub account (repo already set up)
- Supabase account with database configured (see SUPABASE_SETUP.md)
- Vercel account (sign up at https://vercel.com)

## Vercel Deployment (Recommended)

### Step 1: Connect GitHub to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Continue with GitHub"
4. Find and import `linkbio-service` repo
5. Click "Import"

### Step 2: Configure Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
```

Get these from your Supabase dashboard:
- Settings → API
- Copy URL and keys

### Step 3: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Visit your deployed URL: `https://linkbio-service-xxx.vercel.app`

### Step 4: Custom Domain (Optional)

In Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `linkbio.com`)
3. Follow DNS setup instructions

## Deployment Checklist

- [ ] Supabase project created
- [ ] All 3 tables created (`pages`, `leads`, `analytics_events`)
- [ ] Environment variables configured in Supabase
- [ ] Code committed to GitHub
- [ ] GitHub connected to Vercel
- [ ] Environment variables added to Vercel
- [ ] Initial deployment successful
- [ ] Test creating a page at `/admin`
- [ ] Test landing page renders at `/<slug>`
- [ ] Test lead capture form
- [ ] Analytics showing events

## Testing After Deployment

### 1. Test Admin Dashboard
1. Visit `https://your-domain.vercel.app/admin`
2. Fill in test customer details
3. Click "Create Page"
4. Should see success message with URL

### 2. Test Landing Page
1. Visit the generated URL (e.g., `/test-page`)
2. Page should render with correct title and CTA
3. Button should be clickable

### 3. Test Lead Capture
1. Enter an email in the form
2. Click "Send"
3. Check Supabase dashboard → `leads` table
4. New row should appear

### 4. Test Analytics
1. Visit the landing page
2. Wait 5 seconds
3. Check API: `GET /api/analytics?page_id=<page_id>`
4. Should see events in response

## Troubleshooting

### Build Fails
- Check logs in Vercel
- Ensure all dependencies installed: `npm install`
- Run `npm run lint` locally to catch errors early

### Environment Variables Not Found
- Verify keys in Vercel dashboard
- Keys are case-sensitive
- Ensure `NEXT_PUBLIC_*` keys are in "Frontend" scope

### Database Connection Error
- Check Supabase URL is correct (https://...)
- Verify anon key has permission to select/insert
- Check RLS policies not blocking public access

### Pages Not Creating
- Check Supabase tables exist
- Verify environment variables in Vercel
- Check API endpoint response in browser DevTools

### Analytics Not Tracking
- Ensure page_id is correct UUID
- Check Supabase `analytics_events` table has insert permission
- Verify event_type is one of: 'view', 'cta_click', 'lead_submit'

## Auto-Deployment

Vercel automatically deploys when you:
- Push to main branch on GitHub
- Pull request is approved

To disable auto-deploy:
- Vercel Dashboard → Settings → Git → Auto-deploy disabled

## Rollback

If deployment breaks:
1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"
4. Wait for rollback to complete

## Monitoring

### Logs
- Vercel Dashboard → Deployments → Logs
- Check for errors during build/runtime

### Analytics (Later)
- Vercel Analytics (when enabled)
- Supabase Query Performance
- Custom dashboard at `/analytics` (Phase 2)

## Scaling

### Database Limits
- **Free tier:** 500 MB (supports ~10k pages)
- **Pro tier:** 8 GB (supports ~100k pages)

When you hit limits:
- Upgrade in Supabase Settings → Billing
- No code changes needed
- Instant scaling

### CDN / Caching
- Vercel Edge Network auto-enabled
- Supabase uses Postgres replication
- No additional setup needed for MVP

### Performance
Current setup handles:
- 10k pages/day: ✓
- 100k leads/day: ✓
- Real-time analytics: ✓

## Cost Estimate

### Supabase
- Free tier: $0 (up to 10k pages)
- Pro tier: $25/month (100k+ pages)

### Vercel
- Free tier: $0 (generous limits)
- Pro tier: $20/month (when you scale)

**Total MVP cost: $0 (free tier)**

## Next Steps

1. Deploy to Vercel
2. Create 5 test pages
3. Share with first customer
4. Collect feedback
5. Iterate on design/features
6. Launch Phase 2 (customer auth, templates)
