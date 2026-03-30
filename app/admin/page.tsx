'use client';

import { useEffect, useState } from 'react';

interface PageData {
  id: string;
  slug: string;
  customer_name: string;
  hero_title: string;
  hero_subtitle: string;
  cta_text: string;
  cta_link: string;
}

interface FormData {
  slug: string;
  customer_name: string;
  hero_title: string;
  hero_subtitle: string;
  cta_text: string;
  cta_link: string;
}

export default function AdminDashboard() {
  const [pages, setPages] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({
    slug: '',
    customer_name: '',
    hero_title: '',
    hero_subtitle: '',
    cta_text: 'Book Now',
    cta_link: '',
  });

  useEffect(() => {
    // Note: In production, fetch pages from API
    // For MVP, we'll just show the form
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/pages/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create page');
      }

      const newPage = await response.json();
      setPages((prev) => [...prev, newPage]);
      setSuccessMessage(
        `✓ Page created! Visit: ${window.location.origin}/${newPage.slug}`
      );

      // Reset form
      setFormData({
        slug: '',
        customer_name: '',
        hero_title: '',
        hero_subtitle: '',
        cta_text: 'Book Now',
        cta_link: '',
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to create page'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">LinkBio Admin</h1>

        {/* Create Page Form */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Create New Page</h2>

          {successMessage && (
            <div className="mb-4 p-4 bg-green-900 border border-green-700 rounded text-green-200">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded text-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Slug (URL-friendly name)
              </label>
              <input
                type="text"
                name="slug"
                placeholder="john-doe"
                value={formData.slug}
                onChange={handleInputChange}
                pattern="^[a-z0-9-]+$"
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                Only lowercase letters, numbers, and hyphens
              </p>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="customer_name"
                placeholder="John Doe"
                value={formData.customer_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Hero Title
              </label>
              <input
                type="text"
                name="hero_title"
                placeholder="Welcome to my business"
                value={formData.hero_title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                Hero Subtitle
              </label>
              <textarea
                name="hero_subtitle"
                placeholder="A brief description of your business"
                value={formData.hero_subtitle}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                CTA Button Text
              </label>
              <input
                type="text"
                name="cta_text"
                placeholder="Book Now"
                value={formData.cta_text}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                CTA Link
              </label>
              <input
                type="url"
                name="cta_link"
                placeholder="https://calendly.com/john"
                value={formData.cta_link}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Page'}
            </button>
          </form>
        </div>

        {/* Pages List */}
        {pages.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Your Pages</h2>
            <div className="space-y-4">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="bg-slate-700 rounded-lg p-4 border border-slate-600"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">{page.customer_name}</p>
                      <p className="text-gray-400 text-sm">
                        {window.location.origin}/{page.slug}
                      </p>
                    </div>
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
