
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function IncomeTaxCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'income-tax')!;
  const [gross, setGross] = useState(75000);
  const [filing, setFiling] = useState('single');
  const [tax, setTax] = useState(0);

  useEffect(() => {
    // Simplified 2024 Federal Brackets for Single
    let remaining = gross - 14600; // Standard deduction
    if (remaining < 0) remaining = 0;
    
    let t = 0;
    const brackets = [
        { limit: 11600, rate: 0.10 },
        { limit: 47150, rate: 0.12 },
        { limit: 100525, rate: 0.22 },
        { limit: 191950, rate: 0.24 },
        { limit: 243725, rate: 0.32 },
        { limit: 609350, rate: 0.35 },
        { limit: Infinity, rate: 0.37 },
    ];

    let prevLimit = 0;
    for (const b of brackets) {
        if (remaining > prevLimit) {
            const taxableInBracket = Math.min(remaining, b.limit) - prevLimit;
            t += taxableInBracket * b.rate;
            prevLimit = b.limit;
        } else break;
    }
    setTax(t);
  }, [gross, filing]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Estimate your federal tax liability using current US tax brackets. While tax codes are complex, our calculator provides a reliable baseline for your annual financial planning."
      tips={["This uses 2024 tax year federal brackets and standard deductions."]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Gross Annual Income ($)</label><input type="number" value={gross} onChange={e => setGross(Number(e.target.value))} className="calculator-input" /></div>
          <div>
            <label className="calculator-label">Filing Status</label>
            <select value={filing} onChange={e => setFiling(e.target.value)} className="calculator-input">
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
            </select>
          </div>
        </div>
        <div className="space-y-6">
            <div className="result-box bg-red-700 text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-60 mb-2">Est. Federal Tax</p>
                 <div className="text-5xl font-black text-white">{format(tax)}</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center">
                 <span className="text-gray-500 font-bold uppercase text-xs">Take Home Pay</span>
                 <span className="text-2xl font-black text-primary">{format(gross - tax)}</span>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
