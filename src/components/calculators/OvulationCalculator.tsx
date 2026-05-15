
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function OvulationCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'ovulation')!;
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState(28);
  const [window, setWindow] = useState('');

  useEffect(() => {
    const d = new Date(lastPeriod);
    d.setDate(d.getDate() + (cycleLength - 14)); // Typical ovulation: 14 days before next period
    const start = new Date(d);
    start.setDate(start.getDate() - 2);
    const end = new Date(d);
    end.setDate(end.getDate() + 2);
    
    setWindow(`${start.toLocaleDateString()} - ${end.toLocaleDateString()}`);
  }, [lastPeriod, cycleLength]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Understanding your fertile window is the first step in planning for a family. This tool estimates your ovulation day and most fertile dates based on your typical cycle length."
      steps={["Enter last period start.", "Select your average cycle length.", "Identify your most fertile dates."]}
      tips={["Cycle lengths vary, so track your patterns for several months."]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Last Period Start</label><input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className="calculator-input" /></div>
          <div><label className="calculator-label">Cycle Length (Days)</label><input type="number" value={cycleLength} onChange={e => setCycleLength(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-purple-500 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Most Fertile Window</p>
                <div className="text-3xl font-black text-white">{window}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
