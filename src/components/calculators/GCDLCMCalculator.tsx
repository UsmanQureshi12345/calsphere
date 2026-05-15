
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function GCDLCMCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'gcd-lcm')!;
  const [a, setA] = useState(12);
  const [b, setB] = useState(18);

  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
  const findGcd = gcd(a, b);
  const findLcm = (a * b) / findGcd;

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The Greatest Common Divisor (GCD) and Least Common Multiple (LCM) are fundamental in arithmetic and number theory. They help in simplifying fractions, finding common denominators, and solving scheduling problems."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Number A</label><input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Number B</label><input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="space-y-6">
            <div className="result-box bg-teal-600 text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50">GCD</p>
                 <div className="text-5xl font-black text-white">{findGcd}</div>
            </div>
            <div className="result-box bg-gray-900 text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50">LCM</p>
                 <div className="text-5xl font-black text-white">{findLcm}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
