
import React, { useState } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function RandomCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'random')!;
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);

  const generate = () => {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    setResult(val);
  };

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Need a truly unbiased choice? Our Random Number Generator provides cryptographically secure-style randomness for games, statistical sampling, or settling debates."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="grid grid-cols-2 gap-8">
            <div><label className="calculator-label">Min</label><input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="calculator-input" /></div>
            <div><label className="calculator-label">Max</label><input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <button onClick={generate} className="w-full py-6 bg-primary text-white font-black text-2xl rounded-2xl shadow-xl active:scale-95 transition-all">GENERATE RANDOM NUMBER</button>
        {result !== null && (
            <div className="result-box bg-gray-900 animate-in fade-in zoom-in text-center">
                 <div className="text-8xl font-black text-accent">{result}</div>
            </div>
        )}
      </div>
    </CalculatorTemplate>
  );
}
