
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function DateAddCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'date-add-subtract')!;
  const [start, setStart] = useState(new Date().toISOString().split('T')[0]);
  const [days, setDays] = useState(30);
  const [result, setResult] = useState('');

  useEffect(() => {
    const d = new Date(start);
    d.setDate(d.getDate() + days);
    setResult(d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  }, [start, days]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Easily figure out future or past dates. Whether you need to know when a 90-day warrantee ends or what the date was 6 weeks ago, this tool handles the calendar math for you."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Starting Date</label><input type="date" value={start} onChange={e => setStart(e.target.value)} className="calculator-input" /></div>
          <div><label className="calculator-label">Add/Subtract Days (use negative for past)</label><input type="number" value={days} onChange={e => setDays(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-primary text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Calculated Date</p>
                <div className="text-4xl font-black">{result}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
