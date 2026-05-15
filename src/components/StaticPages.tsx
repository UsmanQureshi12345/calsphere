
import React from 'react';
import { Breadcrumbs } from '../App';
import { Link } from 'react-router-dom';
import { CALCULATORS, CATEGORIES } from '../data/calculators';
import { Shield, Book, FileText, Map as MapIcon, Mail } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Breadcrumbs />
      <header className="space-y-4">
        <h1 className="text-5xl font-black text-primary flex items-center">
            <Shield className="mr-4 text-accent" size={48} />
            Privacy Policy
        </h1>
        <p className="text-xl text-gray-500 italic">Effective Date: May 9, 2026</p>
      </header>
      
      <div className="prose lg:prose-xl text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-primary">1. Our Commitment to Your Data</h2>
          <p>At CalcSphere, we believe your mathematical data is your own. We do not require sign-ups, accounts, or any personal identification to use our 60+ calculators. Our platform is designed to be a "Zero-Knowledge" environment.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">2. Information We Collect</h2>
          <p>We do not collect Personally Identifiable Information (PII). We do not store your calculation history on our servers. Any data you enter into our calculators remains entirely within your local browser session.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies:</strong> We use minimal, non-tracking cookies to remember your preferred unit systems (e.g., Metric vs Imperial).</li>
            <li><strong>Analytics:</strong> We use basic, privacy-focused analytics to understand which tools are most popular, helping us improve the site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">3. Third-Party Services</h2>
          <p>We may display advertisements via Google AdSense. These third-party vendors may use cookies to serve ads based on your prior visits to this website. You can opt out of personalized advertising by visiting Ad Settings in your browser.</p>
        </section>

        <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <h3 className="text-xl font-bold text-primary mb-4">Questions?</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@calcsphere.example.</p>
        </section>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <Breadcrumbs />
      <header className="space-y-4">
        <h1 className="text-5xl font-black text-primary flex items-center">
            <FileText className="mr-4 text-accent" size={48} />
            Terms of Use
        </h1>
        <p className="text-xl text-gray-500 italic">Last Revised: May 2026</p>
      </header>
      
      <div className="prose lg:prose-xl text-gray-600 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-primary">1. Acceptance of Terms</h2>
          <p>By accessing and using CalcSphere, you agree to be bound by these Terms of Use. If you do not agree, please discontinue use immediately.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">2. No Financial or Medical Advice</h2>
          <p className="font-bold text-red-600">IMPORTANT DISCLAIMER:</p>
          <p>All calculations provided by CalcSphere are estimates intended for educational and illustrative purposes only. We are not financial advisors, medical professionals, or legal experts. Always consult with a qualified professional before making significant life decisions based on these tools.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">3. Intellectual Property</h2>
          <p>The design, unique content descriptions, and original code of CalcSphere are the intellectual property of CalcSphere. You may not scrape, replicate, or re-distribute our content for commercial purposes without explicit written consent.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary">4. Limitation of Liability</h2>
          <p>CalcSphere is provided "as is" without warranties of any kind. We are not liable for any damages resulting from errors, inaccuracies, or downtime of our calculation engines.</p>
        </section>
      </div>
    </div>
  );
}

export function SitemapPage() {
  return (
    <div className="space-y-12">
      <Breadcrumbs />
      <header className="space-y-4">
        <h1 className="text-5xl font-black text-primary flex items-center">
            <MapIcon className="mr-4 text-accent" size={48} />
            HTML Sitemap
        </h1>
        <p className="text-lg text-gray-600">Navigate every single tool and resource within the CalcSphere ecosystem.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="space-y-6">
            <h2 className="text-2xl font-black text-primary flex items-center border-b-2 border-gray-100 pb-2">
              {cat.id === 'financial' && <DollarSign className="mr-2 text-accent" size={20} />}
              {cat.name}
            </h2>
            <ul className="space-y-2">
              {CALCULATORS.filter(c => c.category === cat.id).map(calc => (
                <li key={calc.id}>
                  <Link to={calc.path} className="text-gray-600 hover:text-accent transition-colors flex items-center py-1">
                    <span className="w-1.5 h-1.5 bg-gray-200 rounded-full mr-3"></span>
                    {calc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        <div className="space-y-6">
           <h2 className="text-2xl font-black text-primary flex items-center border-b-2 border-gray-100 pb-2">
              Supporting Pages
            </h2>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-accent transition-colors border-b border-transparent hover:border-accent">About CalcSphere</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-accent transition-colors border-b border-transparent hover:border-accent">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-accent transition-colors border-b border-transparent hover:border-accent">Terms of Use</Link></li>
              <li><a href="/robots.txt" className="text-gray-600 hover:text-accent transition-colors">Robots.txt</a></li>
              <li><a href="/sitemap.xml" className="text-gray-600 hover:text-accent transition-colors">Sitemap.xml</a></li>
            </ul>
        </div>
      </div>
    </div>
  );
}

function DollarSign({ className, size }: { className?: string, size?: number }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
}
