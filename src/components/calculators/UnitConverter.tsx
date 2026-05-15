
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

const CONVERSIONS: Record<string, Record<string, number>> = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, in: 39.3701, ft: 3.28084, yr: 1.09361, mi: 0.000621371 },
  weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
};

export default function UnitConverter() {
  const metadata = CALCULATORS.find(c => c.id === 'unit-conversion')!;
  const [type, setType] = useState('length');
  const [val, setVal] = useState(1);
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const units = CONVERSIONS[type];
    const baseVal = val / units[from];
    setResult(baseVal * units[to]);
  }, [val, from, to, type]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Seamlessly switch between Metric and Imperial systems. Whether you're working on a global project or following an international recipe, our Unit Converter provides instant, accurate translations across multiple categories."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="flex justify-center space-x-4">
             {Object.keys(CONVERSIONS).map(t => (
                 <button key={t} onClick={() => { setType(t); setFrom(Object.keys(CONVERSIONS[t])[0]); setTo(Object.keys(CONVERSIONS[t])[1]); }} className={`px-6 py-2 rounded-full font-bold uppercase text-xs tracking-widest transition-all ${type === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>{t}</button>
             ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
             <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="calculator-input" />
             <select value={from} onChange={e => setFrom(e.target.value)} className="calculator-input">
                 {Object.keys(CONVERSIONS[type]).map(u => <option key={u} value={u}>{u}</option>)}
             </select>
             <div className="flex items-center space-x-4">
                 <span className="text-2xl font-black text-gray-300">TO</span>
                 <select value={to} onChange={e => setTo(e.target.value)} className="calculator-input flex-1">
                     {Object.keys(CONVERSIONS[type]).map(u => <option key={u} value={u}>{u}</option>)}
                 </select>
             </div>
        </div>
        <div className="result-box bg-gray-900 text-center">
             <div className="text-5xl font-black text-accent">{result.toFixed(4)} <span className="text-xl opacity-50">{to}</span></div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
