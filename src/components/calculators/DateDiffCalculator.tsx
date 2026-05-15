
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function DateDiffCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'date-difference')!;
  const [d1, setD1] = useState(new Date().toISOString().split('T')[0]);
  const [d2, setD2] = useState(new Date().toISOString().split('T')[0]);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const diffTime = Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    setDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [d1, d2]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Calculate the exact span between two points in time. Perfect for travel planning, project timelines, or counting down to major events."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Start Date</label><input type="date" value={d1} onChange={e => setD1(e.target.value)} className="calculator-input" /></div>
          <div><label className="calculator-label">End Date</label><input type="date" value={d2} onChange={e => setD2(e.target.value)} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-gray-900 border-t-8 border-accent text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Total Difference</p>
                <div className="text-6xl font-black text-white">{days} Days</div>
                <p className="text-gray-400 mt-2">≈ {(days/7).toFixed(1)} Weeks</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
