'use client';

import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface PageData {
  id: string;
  slug: string;
  customer_name: string;
  hero_title: string;
  hero_subtitle: string;
  cta_text: string;
  cta_link: string;
}

export default function LandingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);

  const fetchPage = useCallback(async () => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();

      if (supabaseError || !data) {
        setError('Page not found');
        setLoading(false);
        return;
      }

      setPage(data as PageData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching page:', err);
      setError('Failed to load page');
      setLoading(false);
    }
  }, [slug]);

  const trackView = useCallback(async () => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_id: slug, // Will be replaced with actual ID after fetch
          event_type: 'view',
        }),
      });
    } catch (err) {
      console.error('Error tracking view:', err);
    }
  }, [slug]);

  useEffect(() => {
    const init = async () => {
      await fetchPage();
      await trackView();
    };
    init();
  }, [fetchPage, trackView]);

  const handleCTAClick = async () => {
    if (!page) return;
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_id: page.id,
          event_type: 'cta_click',
        }),
      });
      window.location.href = page.cta_link;
    } catch (err) {
      console.error('Error tracking CTA click:', err);
      window.location.href = page.cta_link;
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page) return;

    setLeadSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_id: page.id,
          email,
        }),
      });

      if (response.ok) {
        setLeadSuccess(true);
        setEmail('');
        setTimeout(() => setLeadSuccess(false), 3000);
      } else {
        alert('Failed to save email. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      alert('Error submitting email');
    } finally {
      setLeadSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-300">{error || 'Page not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {page.hero_title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            {page.hero_subtitle}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl mb-12"
          >
            {page.cta_text}
          </button>

          {/* Email Capture */}
          <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-slate-700">
            <h2 className="text-white text-2xl font-semibold mb-4">
              Get Updates
            </h2>
            <form onSubmit={handleLeadSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={leadSubmitting}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {leadSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
            {leadSuccess && (
              <p className="text-green-400 mt-3">✓ Email saved! Check your inbox.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} {page.customer_name}. All rights reserved.</p>
          <p className="text-sm mt-2">Powered by LinkBio</p>
        </div>
      </footer>
    </div>
  );
}
