
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function HalfLifeCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'half-life')!;
  const [initial, setInitial] = useState(100);
  const [halfLife, setHalfLife] = useState(10);
  const [time, setTime] = useState(20);
  const [final, setFinal] = useState(0);

  useEffect(() => {
    // N(t) = N0 * (1/2)^(t/h)
    setFinal(initial * Math.pow(0.5, (time / halfLife)));
  }, [initial, halfLife, time]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Model radioactive decay or substance dissipation over time. Half-life is the time required for a quantity to reduce to half of its initial value, used in physics, medicine, and archeology (Carbon-14 dating)."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Initial Amount</label><input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Half-Life Period</label><input type="number" value={halfLife} onChange={e => setHalfLife(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Time Elapsed</label><input type="number" value={time} onChange={e => setTime(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-purple-900 border-b-4 border-accent text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-60 mb-2">Remaining Amount</p>
                <div className="text-6xl font-black text-white">{final.toFixed(4)}</div>
                <p className="text-white/40 mt-2">({((final/initial)*100).toFixed(1)}% remaining)</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
