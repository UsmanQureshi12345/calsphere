
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function StdDevCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'std-dev')!;
  const [data, setData] = useState('10, 20, 30, 40, 50');
  const [result, setResult] = useState({ sd: 0, mean: 0 });

  useEffect(() => {
    const nums = data.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (nums.length > 0) {
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const vari = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
      setResult({ sd: Math.sqrt(vari), mean });
    }
  }, [data]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="In statistics, standard deviation measures the amount of variation or dispersion in a set of values. It is a vital tool for understanding data volatility and reliability in everything from financial markets to scientific research."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div><label className="calculator-label">Numbers (comma separated)</label><textarea value={data} onChange={e => setData(e.target.value)} className="calculator-input h-32" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="result-box bg-blue-600 text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50">Standard Deviation</p>
                 <div className="text-5xl font-black text-white">{result.sd.toFixed(4)}</div>
            </div>
            <div className="result-box bg-gray-900 text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50">Mean (Average)</p>
                 <div className="text-5xl font-black text-white">{result.mean.toFixed(2)}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
