import { createClient } from '@supabase/supabase-js';
import { createLeadSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createLeadSchema.parse(body);

    // Insert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert([{
        page_id: validated.page_id,
        email: validated.email,
      }])
      .select()
      .single();

    if (leadError) {
      console.error('Lead insert error:', leadError);
      return NextResponse.json(
        { error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    // Track event
    await supabase
      .from('analytics_events')
      .insert([{
        page_id: validated.page_id,
        event_type: 'lead_submit',
      }]);

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.issues },
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
