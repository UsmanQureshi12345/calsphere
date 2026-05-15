
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';
import { TrendingUp } from 'lucide-react';

export default function CompoundInterestCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'compound-interest')!;
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12); // monthly
  const [result, setResult] = useState(0);

  useEffect(() => {
    const r = rate / 100;
    const n = frequency;
    const t = years;
    const a = principal * Math.pow(1 + r/n, n*t);
    setResult(a);
  }, [principal, rate, years, frequency]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Compound interest is the eighth wonder of the world. It is the interest you earn on your interest, creating an exponential growth curve for your savings. Our precision calculator allows you to model daily, monthly, or annual compounding to see exactly how your wealth accumulates over time."
      steps={[
        "Enter your starting balance (Principal).",
        "Input the expected annual interest rate.",
        "Select the time horizon in years.",
        "Choose the compounding frequency (how often interest is added).",
        "Review the total balance and interest earned."
      ]}
      formula="A = P(1 + r/n)^(nt)"
      methodology="We apply the standard compound interest formula where 'A' is the final amount, 'P' is principal, 'r' is interest rate, 'n' is compounding frequency, and 't' is time in years."
      example="Investing $10,000 at 5% interest compounded monthly for 10 years results in $16,470.09. That is $6,470.09 in pure interest earned."
      tips={["The earlier you start, the more time compound interest has to work.", "Higher frequency compounding results in slightly higher returns."]}
      faqs={[{ q: "What is n?", a: "It represents the number of times interest is applied per year. 12 for monthly, 365 for daily." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="calculator-label">Initial Principal ($)</label>
            <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="calculator-input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="calculator-label">Interest Rate (%)</label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="calculator-input" />
            </div>
            <div>
              <label className="calculator-label">Terms (Years)</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="calculator-input" />
            </div>
          </div>
          <div>
            <label className="calculator-label">Compounding Frequency</label>
            <select value={frequency} onChange={e => setFrequency(Number(e.target.value))} className="calculator-input">
              <option value={1}>Annually (1/year)</option>
              <option value={4}>Quarterly (4/year)</option>
              <option value={12}>Monthly (12/year)</option>
              <option value={365}>Daily (365/year)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box text-center bg-primary">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Future Balance</p>
                <div className="text-5xl font-black font-mono">{format(result)}</div>
                <div className="mt-4 pt-4 border-t border-white/10 text-gray-400">Total Interest: {format(result - principal)}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
