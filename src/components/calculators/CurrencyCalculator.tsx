
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

const RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151.4, INR: 83.3, AUD: 1.52, CAD: 1.36 };

export default function CurrencyCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'currency')!;
  const [val, setVal] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const usdVal = val / RATES[from];
    setResult(usdVal * RATES[to]);
  }, [val, from, to]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Travel the world with confidence. Our Currency Calculator provides instant translations between major global currencies based on reference market rates."
      tips={["Market rates change daily. Use these for planning and estimates."]}
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
             <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="calculator-input" />
             <select value={from} onChange={e => setFrom(e.target.value)} className="calculator-input">
                 {Object.keys(RATES).map(k => <option key={k} value={k}>{k}</option>)}
             </select>
             <div className="flex items-center space-x-4">
                 <span className="text-2xl font-black text-gray-300">TO</span>
                 <select value={to} onChange={e => setTo(e.target.value)} className="calculator-input flex-1">
                     {Object.keys(RATES).map(k => <option key={k} value={k}>{k}</option>)}
                 </select>
             </div>
        </div>
        <div className="result-box bg-emerald-700 text-center">
             <div className="text-5xl font-black text-white">{result.toFixed(2)} <span className="text-xl opacity-50">{to}</span></div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
