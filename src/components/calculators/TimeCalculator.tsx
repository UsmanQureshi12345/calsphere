
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function TimeCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'time')!;
  const [val, setVal] = useState(1);
  const [unit, setUnit] = useState('hours');
  const [res, setRes] = useState<Record<string, number>>({});

  useEffect(() => {
    let seconds = 0;
    if (unit === 'seconds') seconds = val;
    if (unit === 'minutes') seconds = val * 60;
    if (unit === 'hours') seconds = val * 3600;
    if (unit === 'days') seconds = val * 86400;

    setRes({
        sec: seconds,
        min: seconds / 60,
        hr: seconds / 3600,
        day: seconds / 86400,
        yr: seconds / 31536000
    });
  }, [val, unit]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Convert time into any scale. Whether you're counting seconds for an experiment or visualizing how many hours are in a decade, this tool provides instant chronological context."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="grid grid-cols-2 gap-6">
             <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="calculator-input" />
             <select value={unit} onChange={e => setUnit(e.target.value)} className="calculator-input">
                 <option value="seconds">Seconds</option>
                 <option value="minutes">Minutes</option>
                 <option value="hours">Hours</option>
                 <option value="days">Days</option>
             </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {Object.entries(res).map(([k, v]) => (
                <div key={k} className="bg-gray-50 p-6 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{k}</p>
                    <p className="text-xl font-black text-primary truncate">{v.toLocaleString()}</p>
                </div>
             ))}
        </div>
      </div>
    </CalculatorTemplate>
  );
}
