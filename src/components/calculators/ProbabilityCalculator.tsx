
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function ProbabilityCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'probability')!;
  const [favorable, setFavorable] = useState(1);
  const [total, setTotal] = useState(6);

  const prob = (favorable / total) * 100;

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Life is a game of odds. Our Probability Calculator helps you quantify chance—whether you're calculating the odds of a dice roll, a card draw, or a specific business outcome."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Favorable Outcomes</label><input type="number" value={favorable} onChange={e => setFavorable(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Total Possible Outcomes</label><input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-purple-700 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Probability</p>
                <div className="text-6xl font-black text-white">{prob.toFixed(2)}%</div>
                <p className="mt-4 text-white/40">1 in { (total/favorable).toFixed(1) }</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
