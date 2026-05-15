
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function WorkDaysCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'work-days')!;
  const [d1, setD1] = useState(new Date().toISOString().split('T')[0]);
  const [d2, setD2] = useState(new Date().toISOString().split('T')[0]);
  const [workDays, setWorkDays] = useState(0);

  useEffect(() => {
    let start = new Date(d1);
    let end = new Date(d2);
    if (start > end) [start, end] = [end, start];
    
    let count = 0;
    let cur = new Date(start);
    while (cur <= end) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    setWorkDays(count);
  }, [d1, d2]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Strip out the weekends and see the real time available for your projects. Our Work Days calculator helps project managers and freelancers plan deadlines realistically."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Start Date</label><input type="date" value={d1} onChange={e => setD1(e.target.value)} className="calculator-input" /></div>
          <div><label className="calculator-label">End Date</label><input type="date" value={d2} onChange={e => setD2(e.target.value)} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-emerald-700 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-60 mb-2">Total Working Days</p>
                <div className="text-6xl font-black text-white">{workDays}</div>
                <p className="text-white/40 mt-2">(excluding Sat/Sun)</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
