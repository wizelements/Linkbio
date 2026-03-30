import { z } from 'zod';

export const createPageSchema = z.object({
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  customer_name: z.string().min(1).max(100),
  hero_title: z.string().min(1).max(200),
  hero_subtitle: z.string().max(300),
  cta_text: z.string().min(1).max(50),
  cta_link: z.string().url(),
});

export const createLeadSchema = z.object({
  page_id: z.string().uuid(),
  email: z.string().email(),
});

export const trackEventSchema = z.object({
  page_id: z.string().uuid(),
  event_type: z.enum(['view', 'cta_click', 'lead_submit']),
});

export type CreatePageInput = z.infer<typeof createPageSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type TrackEventInput = z.infer<typeof trackEventSchema>;
