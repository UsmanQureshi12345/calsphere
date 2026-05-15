
import React from 'react';
import { Breadcrumbs, AdSlot, CategoryIcon } from '../App';
import { Link } from 'react-router-dom';
import { CALCULATORS, CalculatorMetadata } from '../data/calculators';
import { BookOpen, HelpCircle, Info, Lightbulb, TrendingUp, ChevronRight, Calculator } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

interface CalculatorTemplateProps {
  metadata: CalculatorMetadata;
  children: React.ReactNode;
  introduction: string;
  steps: string[];
  formula: string | React.ReactNode;
  methodology: string;
  example: string;
  tips: string[];
  faqs: FAQ[];
}

export default function CalculatorTemplate({
  metadata,
  children,
  introduction,
  steps,
  formula,
  methodology,
  example,
  tips,
  faqs
}: CalculatorTemplateProps) {
  const related = CALCULATORS
    .filter(c => c.category === metadata.category && c.id !== metadata.id)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <Breadcrumbs />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content area */}
        <div className="flex-1 space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black text-primary">{metadata.name}</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {introduction}
            </p>
          </header>

          {/* Calculator widget */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
             {children}
          </div>

          <AdSlot type="leaderboard" />

          {/* Educational content */}
          <section className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 space-y-12">
            
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-primary flex items-center">
                <BookOpen className="mr-3 text-accent" /> How to Use the {metadata.name}
              </h2>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li key={i} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center font-bold text-primary border border-gray-100">{i + 1}</span>
                    <span className="text-gray-600 self-center">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black text-primary flex items-center">
                <TrendingUp className="mr-3 text-accent" /> Formula & Methodology
              </h2>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 font-mono text-center text-xl text-primary overflow-x-auto">
                {formula}
              </div>
              <p className="text-gray-600 leading-relaxed text-justify">
                {methodology}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black text-primary flex items-center">
                <Info className="mr-3 text-accent" /> Practical Example
              </h2>
              <div className="p-6 bg-accent/5 border-l-4 border-accent rounded-r-2xl">
                <p className="text-gray-700 italic leading-relaxed">
                  {example}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black text-primary flex items-center">
                <Lightbulb className="mr-3 text-accent" /> Important Tips & Mistakes
              </h2>
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex space-x-3 text-gray-600">
                    <span className="text-accent">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </section>

          <AdSlot type="leaderboard" label="Sponsored Content" />

          {/* FAQ Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-black text-primary text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-lg text-primary mb-3 flex items-start">
                    <HelpCircle className="mr-3 text-accent flex-shrink-0 mt-1" size={20} />
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 ml-8 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Schema component would go here in a production meta setup */}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[320px] space-y-8">
          <div className="sticky top-24 space-y-8">
            <AdSlot type="rectangle" />
            
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h4 className="font-bold text-primary mb-4 flex items-center tracking-tight">
                <Calculator size={18} className="mr-2 text-accent" /> Related Toolkits
              </h4>
              <div className="space-y-4">
                {related.map(calc => (
                  <Link 
                    key={calc.id} 
                    to={calc.path} 
                    className="flex group items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mr-3">
                      <CategoryIcon id={calc.category} size={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary">{calc.name}</span>
                  </Link>
                ))}
              </div>
              <Link 
                to={`/category/${metadata.category}`} 
                className="mt-6 block text-center py-3 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:border-accent hover:text-accent transition-all"
              >
                View Category
              </Link>
            </div>

            <AdSlot type="skyscraper" />
          </div>
        </aside>
      </div>
    </div>
  );
}
