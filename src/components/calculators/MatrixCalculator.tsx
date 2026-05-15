
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function MatrixCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'matrix')!;
  const [m1, setM1] = useState([[1, 2], [3, 4]]);
  const [det, setDet] = useState(0);

  useEffect(() => {
    // 2x2 determinant
    setDet(m1[0][0] * m1[1][1] - m1[0][1] * m1[1][0]);
  }, [m1]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Linear algebra simplified. Our Matrix Calculator (2x2) helps you find determinants instantly—the first step in solving systems of equations and understanding vector space transformations."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="flex justify-center">
             <div className="grid grid-cols-2 gap-4 bg-gray-100 p-8 rounded-3xl border-4 border-gray-200">
                <input type="number" value={m1[0][0]} onChange={e => setM1([[Number(e.target.value), m1[0][1]], m1[1]])} className="calculator-input w-24 text-center font-bold" />
                <input type="number" value={m1[0][1]} onChange={e => setM1([[m1[0][0], Number(e.target.value)], m1[1]])} className="calculator-input w-24 text-center font-bold" />
                <input type="number" value={m1[1][0]} onChange={e => setM1([m1[0], [Number(e.target.value), m1[1][1]]])} className="calculator-input w-24 text-center font-bold" />
                <input type="number" value={m1[1][1]} onChange={e => setM1([m1[0], [m1[1][0], Number(e.target.value)]])} className="calculator-input w-24 text-center font-bold" />
             </div>
        </div>
        <div className="result-box bg-primary text-center">
             <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Determinant (det A)</p>
             <div className="text-5xl font-black">{det}</div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
