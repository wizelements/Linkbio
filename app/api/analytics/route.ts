import { supabaseAdmin } from '@/lib/supabase';
import { trackEventSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = trackEventSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('analytics_events')
      .insert([{
        page_id: validated.page_id,
        event_type: validated.event_type,
      }])
      .select()
      .single();

    if (error) {
      console.error('Analytics error:', error);
      return NextResponse.json(
        { error: 'Failed to track event' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET analytics for a page
export async function GET(req: NextRequest) {
  try {
    const pageId = req.nextUrl.searchParams.get('page_id');
    
    if (!pageId) {
      return NextResponse.json(
        { error: 'page_id required' },
        { status: 400 }
      );
    }

    const { data: events, error } = await supabaseAdmin
      .from('analytics_events')
      .select('*')
      .eq('page_id', pageId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch analytics' },
        { status: 500 }
      );
    }

    // Calculate summary
    const summary = {
      total_views: events.filter((e) => e.event_type === 'view').length,
      total_cta_clicks: events.filter((e) => e.event_type === 'cta_click').length,
      total_leads: events.filter((e) => e.event_type === 'lead_submit').length,
      conversion_rate:
        events.length > 0
          ? (events.filter((e) => e.event_type === 'lead_submit').length / 
             events.filter((e) => e.event_type === 'view').length * 100).toFixed(2)
          : '0',
    };

    return NextResponse.json({ events, summary }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
