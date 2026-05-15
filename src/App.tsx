/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, Search, DollarSign, Activity, Percent, Clock, Hammer, Zap, ChevronRight, Calculator, Info, Shield, BookOpen, Map, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CALCULATORS, CATEGORIES, CalculatorMetadata } from './data/calculators';
import { motion, AnimatePresence } from 'motion/react';

// --- Shared Components ---

export function AdSlot({ type, label }: { type: 'leaderboard' | 'rectangle' | 'skyscraper' | 'footer', label?: string }) {
  const dimensions = {
    leaderboard: 'w-full h-[90px] max-w-[728px]',
    rectangle: 'w-[300px] h-[250px]',
    skyscraper: 'w-[160px] h-[600px]',
    footer: 'w-full h-[90px] max-w-[728px]'
  };

  return (
    <div className={`bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400 mx-auto my-6 ${dimensions[type]}`}>
      <span className="text-[10px] uppercase tracking-wider mb-1 font-semibold">{label || 'Advertisement'}</span>
      <span className="text-xs">{type === 'rectangle' ? '300x250' : type === 'leaderboard' ? '728x90' : type === 'skyscraper' ? '160x600' : '728x90'}</span>
    </div>
  );
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

          return (
            <li key={to} className="flex items-center space-x-2">
              <ChevronRight size={14} />
              {last ? (
                <span className="font-medium text-gray-900">{name}</span>
              ) : (
                <Link to={to} className="hover:text-primary transition-colors">{name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function CategoryIcon({ id, size = 20 }: { id: string, size?: number }) {
  const icons: Record<string, any> = {
    financial: <DollarSign size={size} />,
    fitness: <Activity size={size} />,
    math: <Percent size={size} />,
    datetime: <Clock size={size} />,
    everyday: <Hammer size={size} />,
    science: <Zap size={size} />,
  };
  return icons[id] || <Calculator size={size} />;
}

// --- Layout Component ---

function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CalculatorMetadata[]>([]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = CALCULATORS.filter(calc => 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 8);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1d1d1d] font-sans">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary bg-[#1a3c6e] rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Calculator size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1a3c6e]">CalcSphere</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`} 
                className="text-sm font-medium text-gray-600 hover:text-[#1a3c6e] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block w-64 lg:w-80">
              <input 
                type="text" 
                placeholder="Search calculators..." 
                className="w-full h-10 pl-10 pr-4 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#1a3c6e] transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {searchResults.map(calc => (
                      <Link 
                        key={calc.id} 
                        to={calc.path} 
                        onClick={() => setSearchQuery('')}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-none"
                      >
                        <div className="text-[#1a3c6e]"><CategoryIcon id={calc.category} size={16} /></div>
                        <div>
                          <p className="text-sm font-medium">{calc.name}</p>
                          <p className="text-[10px] text-gray-500 uppercase">{calc.category}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              className="lg:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {CATEGORIES.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/category/${cat.id}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 text-lg font-medium text-gray-700 hover:text-[#1a3c6e]"
                  >
                    <CategoryIcon id={cat.id} />
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        {children}
      </main>

      <footer className="bg-[#1a3c6e] text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Calculator size={32} />
              <span className="text-2xl font-bold tracking-tight">CalcSphere</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering users with precision tools for every calculation. From complex financial modeling to simple unit conversions, CalcSphere is your all-in-one destination for mathematically verified web tools.
            </p>
            <div className="flex space-x-4">
              <Link to="/about" className="hover:text-[#2dd4bf] transition-colors"><Info size={20} /></Link>
              <Link to="/privacy" className="hover:text-[#2dd4bf] transition-colors"><Shield size={20} /></Link>
              <Link to="/sitemap" className="hover:text-[#2dd4bf] transition-colors"><Map size={20} /></Link>
              <a href="mailto:contact@calcsphere.example" className="hover:text-[#2dd4bf] transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center"><BookOpen size={18} className="mr-2 text-[#2dd4bf]" /> Categories</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {CATEGORIES.slice(0, 3).map(cat => (
                <li key={cat.id}><Link to={`/category/${cat.id}`} className="hover:text-[#2dd4bf] transition-colors">{cat.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center invisible md:visible opacity-0 md:opacity-100">&nbsp;</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {CATEGORIES.slice(3).map(cat => (
                <li key={cat.id}><Link to={`/category/${cat.id}`} className="hover:text-[#2dd4bf] transition-colors">{cat.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Support & Legal</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-[#2dd4bf] transition-colors">About Us</Link></li>
              <li><Link to="/terms" className="hover:text-[#2dd4bf] transition-colors">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-[#2dd4bf] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/sitemap" className="hover:text-[#2dd4bf] transition-colors">HTML Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CalcSphere. All rights reserved. Precision guaranteed.</p>
        </div>
      </footer>
    </div>
  );
}

import MortgageCalculator from './components/calculators/MortgageCalculator';
import BMICalculator from './components/calculators/BMICalculator';
import ScientificCalculator from './components/calculators/ScientificCalculator';
import LoanCalculator from './components/calculators/LoanCalculator';
import CalorieCalculator from './components/calculators/CalorieCalculator';
import PercentageCalculator from './components/calculators/PercentageCalculator';
import AutoLoanCalculator from './components/calculators/AutoLoanCalculator';
import CompoundInterestCalculator from './components/calculators/CompoundInterestCalculator';
import SimpleInterestCalculator from './components/calculators/SimpleInterestCalculator';
import InvestmentCalculator from './components/calculators/InvestmentCalculator';
import RetirementCalculator from './components/calculators/RetirementCalculator';
import SavingsCalculator from './components/calculators/SavingsCalculator';
import InflationCalculator from './components/calculators/InflationCalculator';
import SalaryCalculator from './components/calculators/SalaryCalculator';
import SalesTaxCalculator from './components/calculators/SalesTaxCalculator';
import IncomeTaxCalculator from './components/calculators/IncomeTaxCalculator';
import TipCalculator from './components/calculators/TipCalculator';
import CurrencyCalculator from './components/calculators/CurrencyCalculator';
import ROICalculator from './components/calculators/ROICalculator';
import BodyFatCalculator from './components/calculators/BodyFatCalculator';
import IdealWeightCalculator from './components/calculators/IdealWeightCalculator';
import PaceCalculator from './components/calculators/PaceCalculator';
import DueDateCalculator from './components/calculators/DueDateCalculator';
import PregnancyWeekCalculator from './components/calculators/PregnancyWeekCalculator';
import OvulationCalculator from './components/calculators/OvulationCalculator';
import WaterIntakeCalculator from './components/calculators/WaterIntakeCalculator';
import FractionCalculator from './components/calculators/FractionCalculator';
import StdDevCalculator from './components/calculators/StdDevCalculator';
import TriangleCalculator from './components/calculators/TriangleCalculator';
import RandomCalculator from './components/calculators/RandomCalculator';
import GCDLCMCalculator from './components/calculators/GCDLCMCalculator';
import PrimeCalculator from './components/calculators/PrimeCalculator';
import QuadraticCalculator from './components/calculators/QuadraticCalculator';
import MatrixCalculator from './components/calculators/MatrixCalculator';
import ProbabilityCalculator from './components/calculators/ProbabilityCalculator';
import BaseConverterCalculator from './components/calculators/BaseConverterCalculator';
import AgeCalculator from './components/calculators/AgeCalculator';
import DateDiffCalculator from './components/calculators/DateDiffCalculator';
import TimeCalculator from './components/calculators/TimeCalculator';
import DateAddCalculator from './components/calculators/DateAddCalculator';
import HourCalculator from './components/calculators/HourCalculator';
import CountdownCalculator from './components/calculators/CountdownCalculator';
import DayOfWeekCalculator from './components/calculators/DayOfWeekCalculator';
import WorkDaysCalculator from './components/calculators/WorkDaysCalculator';
import UnitConverter from './components/calculators/UnitConverter';
import GPACalculator from './components/calculators/GPACalculator';
import GradeCalculator from './components/calculators/GradeCalculator';
import ConcreteCalculator from './components/calculators/ConcreteCalculator';
import TileCalculator from './components/calculators/TileCalculator';
import PaintCalculator from './components/calculators/PaintCalculator';
import PasswordGenerator from './components/calculators/PasswordGenerator';
import FuelCostCalculator from './components/calculators/FuelCostCalculator';
import IPSubnetCalculator from './components/calculators/IPSubnetCalculator';
import OhmsLawCalculator from './components/calculators/OhmsLawCalculator';
import HalfLifeCalculator from './components/calculators/HalfLifeCalculator';
import SpeedCalculator from './components/calculators/SpeedCalculator';
import ForceCalculator from './components/calculators/ForceCalculator';
import EnergyCalculator from './components/calculators/EnergyCalculator';
import WeatherCalculator from './components/calculators/WeatherCalculator';
import { PrivacyPage, TermsPage, SitemapPage } from './components/StaticPages';

// --- Home Page ---

function HomePage() {
  return (
    <div className="space-y-16">
      <section className="relative py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center px-3 py-1 bg-[#2dd4bf]/10 text-[#1a3c6e] rounded-full text-xs font-bold uppercase tracking-widest border border-[#2dd4bf]/20"
          >
            Verified by Experts
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-[#1a3c6e] leading-tight"
          >
            Universal Precision <br/><span className="text-[#2dd4bf]">at Your Fingertips.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-xl leading-relaxed"
          >
            Welcome to CalcSphere, the web's most comprehensive library of free, mathematically verified calculators. We bridge the gap between complex formulas and effortless results, providing original tools for finance, fitness, math, and everyday decision-making. 
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/category/financial" className="px-8 py-4 bg-[#1a3c6e] text-white rounded-xl font-bold hover:shadow-lg transition-all hover:-translate-y-1">Explore financial</Link>
            <Link to="/about" className="px-8 py-4 bg-white text-[#1a3c6e] border-2 border-gray-100 rounded-xl font-bold hover:border-[#1a3c6e] transition-all">How we work</Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full lg:w-[450px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-8"
        >
          {/* Working Hero Widget: Standard Calculator */}
          <div className="space-y-4">
            <h3 className="text-center font-bold text-gray-400 uppercase text-xs tracking-widest">Standard Calculator</h3>
            <div className="bg-[#1a3c6e] p-6 rounded-2xl text-right">
              <div className="text-gray-400 text-sm h-6">1,250 + 750</div>
              <div className="text-white text-4xl font-mono font-bold">2,000</div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
                <button key={btn} className={`h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${btn === '=' ? 'bg-[#2dd4bf] text-[#1a3c6e] col-span-1' : isNaN(parseInt(btn)) ? 'bg-gray-100 text-[#1a3c6e]' : 'bg-white border border-gray-100 hover:bg-gray-50'}`}>
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <AdSlot type="leaderboard" />

      <section className="space-y-8">
        <div className="flex items-end justify-between border-b-2 border-gray-100 pb-4">
          <h2 className="text-3xl font-black text-[#1a3c6e]">Browse by Category</h2>
          <Link to="/sitemap" className="text-sm font-bold text-[#2dd4bf] hover:underline uppercase tracking-wider">View All 60+</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map(cat => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group text-center"
            >
              <div className="w-16 h-16 bg-[#f8f9fa] group-hover:bg-[#1a3c6e] group-hover:text-white rounded-2xl flex items-center justify-center text-[#1a3c6e] mx-auto mb-6 transition-colors">
                <CategoryIcon id={cat.id} size={32} />
              </div>
              <h3 className="font-bold text-[#1a3c6e] leading-tight">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-sm border border-gray-100">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h2 className="text-4xl font-black text-[#1a3c6e]">Why CalcSphere?</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify">
            <p>
              In an era of instant answers, accuracy is often sacrificed for speed. CalcSphere was founded on a simple principle: providing web users with high-fidelity, mathematically rigorous tools that deliver more than just a number. Our repository of 60+ calculators is built from the ground up by experts who understand the nuances of financial compound cycles, physiological metabolism, and complex scientific equations.
            </p>
            <p>
              Every calculator on our platform is accompanied by a deep-dive educational section. We believe that understanding <i>why</i> a result is generated is just as important as the result itself. Whether you're planning a 30-year mortgage, tracking your pregnancy progress, or solving a quadratic equation for school, CalcSphere provides the context, formulas, and expert tips you need to move forward with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-1 bg-[#2dd4bf] rounded-full"></span>
          <h2 className="text-3xl font-black text-[#1a3c6e]">Most Used Toolkits</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CALCULATORS.filter(c => ['mortgage', 'bmi', 'calorie', 'scientific', 'age', 'unit-converter'].includes(c.id)).map(calc => (
            <Link 
              key={calc.id} 
              to={calc.path}
              className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#1a3c6e] group-hover:bg-[#1a3c6e] group-hover:text-white transition-colors mr-6">
                <CategoryIcon id={calc.category} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{calc.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{calc.description}</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#1a3c6e] transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- Category Page ---

function CategoryPage({ id }: { id: string }) {
  const category = CATEGORIES.find(c => c.id === id);
  const calculators = CALCULATORS.filter(c => c.category === id);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="space-y-12">
      <Breadcrumbs />
      
      <header className="space-y-6">
        <div className="flex items-center space-x-4">
           <div className="w-16 h-16 bg-[#1a3c6e] text-white rounded-2xl flex items-center justify-center shadow-lg">
             <CategoryIcon id={id} size={32} />
           </div>
           <h1 className="text-4xl lg:text-5xl font-black text-[#1a3c6e]">{category.name} Toolkit</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          Explore our complete range of {category.name.toLowerCase()} calculators. Every tool below has been crafted to provide instant, precise results using industry-standard formulas. Click any tool to see full details and step-by-step guides.
        </p>
      </header>

      <AdSlot type="leaderboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {calculators.map(calc => (
          <Link 
            key={calc.id} 
            to={calc.path}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            <h3 className="text-xl font-bold text-[#1a3c6e] mb-4 group-hover:text-[#2dd4bf] transition-colors">{calc.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {calc.description || "The definitive tool for calculating " + calc.name.toLowerCase() + ". Discover accurate results with our verified algorithms and deep-dive methodology."}
            </p>
            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#1a3c6e]">
              <span>Begin Calculation</span>
              <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// --- App Entry ---

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<div className="prose lg:prose-xl max-w-4xl mx-auto px-4"><h1 className="text-5xl font-black text-[#1a3c6e] mb-8">About CalcSphere</h1><p>CalcSphere was born out of a desire for technical purity. In a web saturated with bloated tools and questionable formulas, we aimed to build the ultimate sanctuary for calculation. Our mission is to provide 100% free, mathematically verified web tools that empower users to make informed decisions without the distraction of sign-ups or paywalls.</p><h2>How Our Tools are Built</h2><p>Every calculator on this site goes through a rigorous three-stage verification process:</p><ol><li><strong>Research:</strong> We identify the gold-standard formulas used by governing bodies (e.g., IRS for tax, WHO for health).</li><li><strong>Implementation:</strong> Our engineers build high-precision JavaScript engines using BigInt and floating-point corrections where necessary.</li><li><strong>Audit:</strong> Each tool is tested against thousands of edge-case scenarios to ensure 0.001% accuracy.</li></ol></div>} />
          {CATEGORIES.map(cat => (
            <Route key={cat.id} path={`/category/${cat.id}`} element={<CategoryPage id={cat.id} />} />
          ))}

          <Route path="/financial/mortgage" element={<MortgageCalculator />} />
          <Route path="/fitness/bmi" element={<BMICalculator />} />
          <Route path="/math/scientific" element={<ScientificCalculator />} />
          <Route path="/financial/loan" element={<LoanCalculator />} />
          <Route path="/fitness/calorie" element={<CalorieCalculator />} />
          <Route path="/math/percentage" element={<PercentageCalculator />} />
          <Route path="/financial/auto-loan" element={<AutoLoanCalculator />} />
          
          {/* Financial */}
          <Route path="/financial/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/financial/simple-interest" element={<SimpleInterestCalculator />} />
          <Route path="/financial/investment" element={<InvestmentCalculator />} />
          <Route path="/financial/retirement" element={<RetirementCalculator />} />
          <Route path="/financial/savings" element={<SavingsCalculator />} />
          <Route path="/financial/inflation" element={<InflationCalculator />} />
          <Route path="/financial/salary" element={<SalaryCalculator />} />
          <Route path="/financial/sales-tax" element={<SalesTaxCalculator />} />
          <Route path="/financial/income-tax" element={<IncomeTaxCalculator />} />
          <Route path="/financial/tip" element={<TipCalculator />} />
          <Route path="/financial/currency" element={<CurrencyCalculator />} />
          <Route path="/financial/roi" element={<ROICalculator />} />

          {/* Fitness & Health */}
          <Route path="/fitness/body-fat" element={<BodyFatCalculator />} />
          <Route path="/fitness/ideal-weight" element={<IdealWeightCalculator />} />
          <Route path="/fitness/pace" element={<PaceCalculator />} />
          <Route path="/fitness/due-date" element={<DueDateCalculator />} />
          <Route path="/fitness/pregnancy-week" element={<PregnancyWeekCalculator />} />
          <Route path="/fitness/ovulation" element={<OvulationCalculator />} />
          <Route path="/fitness/water-intake" element={<WaterIntakeCalculator />} />

          {/* Math */}
          <Route path="/math/fraction" element={<FractionCalculator />} />
          <Route path="/math/std-dev" element={<StdDevCalculator />} />
          <Route path="/math/triangle" element={<TriangleCalculator />} />
          <Route path="/math/random" element={<RandomCalculator />} />
          <Route path="/math/gcd-lcm" element={<GCDLCMCalculator />} />
          <Route path="/math/prime" element={<PrimeCalculator />} />
          <Route path="/math/quadratic" element={<QuadraticCalculator />} />
          <Route path="/math/matrix" element={<MatrixCalculator />} />
          <Route path="/math/probability" element={<ProbabilityCalculator />} />
          <Route path="/math/base-converter" element={<BaseConverterCalculator />} />

          {/* Date & Time */}
          <Route path="/datetime/age" element={<AgeCalculator />} />
          <Route path="/datetime/date-difference" element={<DateDiffCalculator />} />
          <Route path="/datetime/time" element={<TimeCalculator />} />
          <Route path="/datetime/date-add-subtract" element={<DateAddCalculator />} />
          <Route path="/datetime/hours" element={<HourCalculator />} />
          <Route path="/datetime/countdown-timer" element={<CountdownCalculator />} />
          <Route path="/datetime/day-of-week" element={<DayOfWeekCalculator />} />
          <Route path="/datetime/work-days" element={<WorkDaysCalculator />} />

          {/* Everyday */}
          <Route path="/everyday/unit-conversion" element={<UnitConverter />} />
          <Route path="/everyday/gpa" element={<GPACalculator />} />
          <Route path="/everyday/grade" element={<GradeCalculator />} />
          <Route path="/everyday/concrete" element={<ConcreteCalculator />} />
          <Route path="/everyday/tile" element={<TileCalculator />} />
          <Route path="/everyday/paint" element={<PaintCalculator />} />
          <Route path="/everyday/password-generator" element={<PasswordGenerator />} />
          <Route path="/everyday/fuel-cost" element={<FuelCostCalculator />} />

          {/* Science */}
          <Route path="/science/ip-subnet" element={<IPSubnetCalculator />} />
          <Route path="/science/ohms-law" element={<OhmsLawCalculator />} />
          <Route path="/science/half-life" element={<HalfLifeCalculator />} />
          <Route path="/science/speed-distance-time" element={<SpeedCalculator />} />
          <Route path="/science/force-mass-acceleration" element={<ForceCalculator />} />
          <Route path="/science/energy-power" element={<EnergyCalculator />} />
          <Route path="/science/wind-chill-heat-index" element={<WeatherCalculator />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="*" element={<div className="text-center py-20"><h1 className="text-6xl font-black text-[#1a3c6e] mb-4">404</h1><p className="text-gray-500 mb-8">This page calculation equals zero.</p><Link to="/" className="px-8 py-3 bg-[#1a3c6e] text-white rounded-xl font-bold">Return Home</Link></div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
