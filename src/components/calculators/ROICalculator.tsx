
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function ROICalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'roi')!;
  const [invested, setInvested] = useState(1000);
  const [returned, setReturned] = useState(1500);

  const roi = ((returned - invested) / invested) * 100;

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Return on Investment (ROI) is the gold standard for measuring financial efficiency. Whether you're analyzing a stock trade, a house flip, or a business marketing campaign, ROI tells you exactly how much profit you've generated relative to your cost."
      steps={["Enter your initial cost.", "Enter the final value or gain.", "Review the percentage return."]}
      formula="ROI = [(Final Value - Cost) / Cost] * 100"
      methodology="Calculates the percentage gain or loss based on the initial investment."
      example="An investment of $1,000 that grows to $1,500 has an ROI of 50%."
      tips={["ROI doesn't account for time. A 20% ROI over 1 month is much better than 20% over 5 years."]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Amount Invested ($)</label><input type="number" value={invested} onChange={e => setInvested(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Final Amount ($)</label><input type="number" value={returned} onChange={e => setReturned(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-emerald-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-70 mb-2">Return On Investment</p>
                <div className="text-6xl font-black font-mono text-white">{roi.toFixed(2)}%</div>
                <p className="mt-4 text-white/60">Profit: {new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(returned - invested)}</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
