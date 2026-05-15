
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function QuadraticCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'quadratic')!;
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);
  const [sol, setSol] = useState<string>('');

  useEffect(() => {
    const d = (b * b) - (4 * a * c);
    if (d > 0) {
      const x1 = (-b + Math.sqrt(d)) / (2 * a);
      const x2 = (-b - Math.sqrt(d)) / (2 * a);
      setSol(`x₁ = ${x1}, x₂ = ${x2}`);
    } else if (d === 0) {
      setSol(`x = ${-b / (2 * a)}`);
    } else {
      setSol('No real roots');
    }
  }, [a, b, c]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Solve complex parabolic equations instantly. Our Quadratic Equation Solver handles second-degree polynomials to find coordinates where the curve intersects the horizontal axis."
      formula="ax² + bx + c = 0"
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="calculator-input w-20" /> <span>x² + </span>
            <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="calculator-input w-20" /> <span>x + </span>
            <input type="number" value={c} onChange={e => setC(Number(e.target.value))} className="calculator-input w-20" /> <span> = 0</span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-indigo-800 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Roots</p>
                <div className="text-3xl font-black text-white">{sol}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
