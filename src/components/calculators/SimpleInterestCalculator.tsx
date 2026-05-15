
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function SimpleInterestCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'simple-interest')!;
  const [p, setP] = useState(5000);
  const [r, setR] = useState(5);
  const [t, setT] = useState(2);
  const [i, setI] = useState(0);

  useEffect(() => {
    setI((p * (r/100) * t));
  }, [p, r, t]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Simple interest is the most straightforward way to calculate the cost of borrowing or the gain of lending. Unlike compound interest, it is only calculated on the principal amount, making it a favorite for short-term loans and basic savings accounts."
      steps={["Enter your Principal.", "Enter Interest Rate.", "Enter Time in Years."]}
      formula="I = P * r * t"
      methodology="Interest is calculated as the product of the principal, the annual interest rate, and the time in years."
      example="$5,000 at 5% for 2 years equals $500 total interest."
      tips={["Use this for low-complexity loans."]}
      faqs={[{ q: "Why use simple over compound?", a: "Simple interest is easier to calculate and used for specific financial products like personal debt or simple certificates of deposit." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Principal ($)</label><input type="number" value={p} onChange={e => setP(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Annual Rate (%)</label><input type="number" step="0.1" value={r} onChange={e => setR(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Time (Years)</label><input type="number" value={t} onChange={e => setT(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box text-center bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Total Interest Earned</p>
                <div className="text-5xl font-black font-mono">{format(i)}</div>
                <p className="mt-4 text-gray-400">Total Balance: {format(p + i)}</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
