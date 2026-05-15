
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function TriangleCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'triangle')!;
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(5);
  const [area, setArea] = useState(0);

  useEffect(() => {
    const s = (a + b + c) / 2;
    const aVal = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    setArea(isNaN(aVal) ? 0 : aVal);
  }, [a, b, c]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="From construction to complex engineering, triangles are the foundational shapes of our world. Our Triangle Calculator handles side lengths and areas using Heron's Formula, helping you verify dimensions and calculate surface areas for any valid triangle."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
               <div><label className="calculator-label">Side A</label><input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Side B</label><input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Side C</label><input type="number" value={c} onChange={e => setC(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-blue-700 text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Area (Heron's Formula)</p>
                 <div className="text-6xl font-black text-white">{area.toFixed(2)}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
