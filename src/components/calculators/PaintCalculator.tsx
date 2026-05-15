
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function PaintCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'paint')!;
  const [area, setArea] = useState(200);
  const [coats, setCoats] = useState(2);
  const [result, setResult] = useState(0);

  useEffect(() => {
    // 1 gallon covers approx 350 sq ft
    setResult((area * coats) / 350);
  }, [area, coats]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Refresh your walls without the waste. Our Paint Calculator helps you estimate how many gallons you need based on surface area and desired coats."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Wall Area (sq ft)</label><input type="number" value={area} onChange={e => setArea(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Number of Coats</label><input type="number" value={coats} onChange={e => setCoats(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-blue-500 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Paint Required</p>
                <div className="text-5xl font-black text-white">{result.toFixed(2)} Gallons</div>
                <p className="mt-4 text-white/40">≈ {Math.ceil(result)} Cans</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
