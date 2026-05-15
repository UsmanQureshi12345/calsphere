
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function InflationCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'inflation')!;
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(3.5);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState(0);

  useEffect(() => {
    setResult(amount * Math.pow(1 + rate / 100, years));
  }, [amount, rate, years]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Is your money losing its edge? Our Inflation Calculator shows you the 'Purchasing Power' of your dollars over time. Whether you're looking back at historical costs or projecting future value, understanding inflation is crucial for long-term financial planning."
      steps={["Enter a starting amount.", "Input the average inflation rate.", "Choose the number of years.", "See the future cost of that same value."]}
      formula="FV = PV * (1 + r)^n"
      methodology="Calculates future purchasing power using an average annual inflation rate."
      example="$1,000 today will cost $1,410 in 10 years at a 3.5% inflation rate."
      tips={["3% is a common long-term historical average for USD inflation."]}
      faqs={[{ q: "What does this mean for savings?", a: "If your savings interest rate is lower than inflation, you are effectively losing wealth." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Current Value ($)</label><input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Annual Inflation Rate (%)</label><input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Number of Years</label><input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-orange-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Future Equivalent Value</p>
                <div className="text-5xl font-black font-mono text-white">{format(result)}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
