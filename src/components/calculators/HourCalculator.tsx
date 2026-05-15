
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function HourCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'hours')!;
  const [t1, setT1] = useState('09:00');
  const [t2, setT2] = useState('17:00');
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const [h1, m1] = t1.split(':').map(Number);
    const [h2, m2] = t2.split(':').map(Number);
    let mins = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (mins < 0) mins += 24 * 60; // Assume next day
    setDiff(mins / 60);
  }, [t1, t2]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Simplifying your timesheet. Calculate the total hours between two points in time, perfect for tracking work hours or flight durations."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
               <div><label className="calculator-label">Start Time</label><input type="time" value={t1} onChange={e => setT1(e.target.value)} className="calculator-input" /></div>
               <div><label className="calculator-label">End Time</label><input type="time" value={t2} onChange={e => setT2(e.target.value)} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-gray-900 border-r-8 border-accent text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Total Time</p>
                <div className="text-5xl font-black text-white">{diff.toFixed(2)} Hours</div>
                <p className="text-gray-400 mt-2">{Math.floor(diff * 60)} Minutes</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
