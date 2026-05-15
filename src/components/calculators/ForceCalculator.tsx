
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function ForceCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'force-mass-acceleration')!;
  const [m, setM] = useState(50);
  const [a, setA] = useState(9.8);
  const [f, setF] = useState(0);

  useEffect(() => {
    setF(m * a);
  }, [m, a]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Newton's Second Law made simple. Calculate the force required to move an object of a certain mass, or find the acceleration resulting from a specific force."
      formula="F = m * a"
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Mass (kg)</label><input type="number" value={m} onChange={e => setM(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Acceleration (m/s²)</label><input type="number" step="0.1" value={a} onChange={e => setA(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-slate-900 border-r-8 border-amber-500 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Resulting Force</p>
                <div className="text-6xl font-black text-white">{f.toFixed(2)} <span className="text-xl">Newtons (N)</span></div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
