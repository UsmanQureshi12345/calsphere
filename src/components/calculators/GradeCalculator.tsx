
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function GradeCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'grade')!;
  const [current, setCurrent] = useState(85);
  const [target, setTarget] = useState(90);
  const [weight, setWeight] = useState(25);
  const [required, setRequired] = useState(0);

  useEffect(() => {
    // Current * (1-w) + Final * w = Target
    const res = (target - (current * (1 - weight/100))) / (weight/100);
    setRequired(res);
  }, [current, target, weight]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The ultimate finals stress-reducer. Find out exactly what you need to score on your final exam to achieve your desired course grade."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Current Grade (%)</label><input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Target Grade (%)</label><input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Final Value (%) of Total Grade</label><input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-indigo-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Required Grade on Final</p>
                <div className="text-6xl font-black text-white">{required.toFixed(1)}%</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
