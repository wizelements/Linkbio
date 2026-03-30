import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export type Page = {
  id: string;
  slug: string;
  customer_name: string;
  hero_title: string;
  hero_subtitle: string;
  cta_text: string;
  cta_link: string;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  page_id: string;
  email: string;
  created_at: string;
};

export type AnalyticsEvent = {
  id: string;
  page_id: string;
  event_type: 'view' | 'cta_click' | 'lead_submit';
  created_at: string;
};
