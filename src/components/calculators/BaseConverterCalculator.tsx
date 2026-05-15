
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function BaseConverterCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'base-converter')!;
  const [val, setVal] = useState('255');
  const [from, setFrom] = useState(10);
  const [to, setTo] = useState(2);
  const [result, setResult] = useState('');

  useEffect(() => {
    try {
        const parsed = parseInt(val, from);
        setResult(parsed.toString(to).toUpperCase());
    } catch(e) {
        setResult('Error');
    }
  }, [val, from, to]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The bridge between binary logic and human counting. Our Base Converter allows you to seamlessly translate numbers between Decimal, Hexadecimal, Binary, and Octal formats."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div><label className="calculator-label">Value</label><input type="text" value={val} onChange={e => setVal(e.target.value)} className="calculator-input" /></div>
             <div><label className="calculator-label">From Base</label><select value={from} onChange={e => setFrom(Number(e.target.value))} className="calculator-input"><option value={2}>Binary (2)</option><option value={8}>Octal (8)</option><option value={10}>Decimal (10)</option><option value={16}>Hex (16)</option></select></div>
             <div><label className="calculator-label">To Base</label><select value={to} onChange={e => setTo(Number(e.target.value))} className="calculator-input"><option value={2}>Binary (2)</option><option value={8}>Octal (8)</option><option value={10}>Decimal (10)</option><option value={16}>Hex (16)</option></select></div>
        </div>
        <div className="result-box bg-gray-900 border-l-8 border-accent text-center">
             <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Converted Result</p>
             <div className="text-5xl font-black font-mono break-all">{result}</div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
