
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function FractionCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'fraction')!;
  const [n1, setN1] = useState(3);
  const [d1, setD1] = useState(4);
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(2);
  const [op, setOp] = useState('+');
  const [result, setResult] = useState('');

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  useEffect(() => {
    let rn = 0;
    let rd = 0;
    if (op === '+') {
      rn = n1 * d2 + n2 * d1;
      rd = d1 * d2;
    } else if (op === '-') {
      rn = n1 * d2 - n2 * d1;
      rd = d1 * d2;
    } else if (op === 'x') {
      rn = n1 * n2;
      rd = d1 * d2;
    } else {
      rn = n1 * d2;
      rd = d1 * n2;
    }
    const common = Math.abs(gcd(rn, rd));
    setResult(`${rn / common} / ${rd / common}`);
  }, [n1, d1, n2, d2, op]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Simplifying fractions or performing operations on them used to be homework dread. Our Fraction Calculator makes it instant—handling addition, subtraction, multiplication, and division while automatically simplifying to the lowest terms."
    >
      <div className="p-8 lg:p-12">
        <div className="flex items-center justify-center space-x-8 mb-12">
           <div className="flex flex-col space-y-4">
              <input type="number" value={n1} onChange={e => setN1(Number(e.target.value))} className="calculator-input w-20 text-center" />
              <div className="h-0.5 bg-gray-300 w-full"></div>
              <input type="number" value={d1} onChange={e => setD1(Number(e.target.value))} className="calculator-input w-20 text-center" />
           </div>
           <select value={op} onChange={e => setOp(e.target.value)} className="bg-gray-100 p-4 rounded-xl text-2xl font-black">
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="x">×</option>
              <option value="/">÷</option>
           </select>
           <div className="flex flex-col space-y-4">
              <input type="number" value={n2} onChange={e => setN2(Number(e.target.value))} className="calculator-input w-20 text-center" />
              <div className="h-0.5 bg-gray-300 w-full"></div>
              <input type="number" value={d2} onChange={e => setD2(Number(e.target.value))} className="calculator-input w-20 text-center" />
           </div>
           <span className="text-4xl font-black text-gray-400">=</span>
           <div className="result-box bg-primary px-12 py-8 m-0!">
                <div className="text-4xl font-black">{result}</div>
           </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
