import { supabaseAdmin } from '@/lib/supabase';
import { createPageSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createPageSchema.parse(body);

    // Check if slug already exists
    const { data: existing } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', validated.slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Slug already taken' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('pages')
      .insert([{
        slug: validated.slug,
        customer_name: validated.customer_name,
        hero_title: validated.hero_title,
        hero_subtitle: validated.hero_subtitle,
        cta_text: validated.cta_text,
        cta_link: validated.cta_link,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create page' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
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

import { z } from 'zod';
