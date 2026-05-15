
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function OhmsLawCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'ohms-law')!;
  const [v, setV] = useState(12);
  const [i, setI] = useState(2);
  const [r, setR] = useState(6);

  // Simple V = I * R
  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The fundamental principle of electricity. Ohm's Law relates Voltage, Current, and Resistance in a simple but powerful way for circuit design and troubleshooting."
      formula="V = I * R"
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-gray-50 p-6 rounded-2xl">
                 <label className="calculator-label">Voltage (V)</label>
                 <input type="number" value={v} onChange={e => {
                     const val = Number(e.target.value);
                     setV(val);
                     setI(val / r);
                 }} className="calculator-input text-blue-600" />
             </div>
             <div className="bg-gray-50 p-6 rounded-2xl">
                 <label className="calculator-label">Current (A)</label>
                 <input type="number" value={i} onChange={e => {
                     const val = Number(e.target.value);
                     setI(val);
                     setR(v / val);
                 }} className="calculator-input text-rose-600" />
             </div>
             <div className="bg-gray-50 p-6 rounded-2xl">
                 <label className="calculator-label">Resistance (Ω)</label>
                 <input type="number" value={r} onChange={e => {
                     const val = Number(e.target.value);
                     setR(val);
                     setV(i * val);
                 }} className="calculator-input text-amber-600" />
             </div>
        </div>
        <div className="result-box bg-gray-900 text-center">
             <div className="text-4xl font-black text-white">Power (W) = {(v * i).toFixed(2)} Watts</div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
