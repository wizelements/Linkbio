'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800 bg-opacity-80 backdrop-blur-md sticky top-0 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">LinkBio</h1>
          <Link
            href="/admin"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Admin Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Beautiful Landing Pages in Minutes
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Create stunning link-in-bio pages for your business. No coding required.
            Start selling immediately.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/admin"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Create Page Now
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-white font-semibold text-lg mb-2">Fast Setup</h3>
              <p className="text-gray-400">Create and deploy your page in under 5 minutes</p>
            </div>

            <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-white font-semibold text-lg mb-2">Analytics</h3>
              <p className="text-gray-400">Track clicks, visits, and lead conversions in real-time</p>
            </div>

            <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-white font-semibold text-lg mb-2">Start Revenue</h3>
              <p className="text-gray-400">Sell pages to customers and collect payments instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-slate-800 bg-opacity-50 border-t border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Simple Pricing</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MVP Plan */}
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">MVP Plan</h3>
              <p className="text-3xl font-bold text-blue-400 mb-6">Free</p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ 1 landing page</li>
                <li>✓ Basic analytics</li>
                <li>✓ Lead capture</li>
                <li>✓ Custom domain</li>
              </ul>
              <button className="w-full px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold">
                Get Started
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 border border-blue-500 relative">
              <div className="absolute -top-3 left-8 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <p className="text-3xl font-bold text-white mb-6">$9<span className="text-lg">/page/month</span></p>
              <ul className="space-y-3 mb-8 text-white">
                <li>✓ Unlimited pages</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Email notifications</li>
                <li>✓ Custom branding</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Launch?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Create your first landing page right now and start generating revenue.
          </p>
          <Link
            href="/admin"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} LinkBio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
