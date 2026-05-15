
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function ConcreteCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'concrete')!;
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [thickness, setThickness] = useState(4); // inches
  const [yards, setYards] = useState(0);

  useEffect(() => {
    const feet = length * width * (thickness / 12);
    setYards(feet / 27);
  }, [length, width, thickness]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Ordering too much concrete is expensive; ordering too little is a disaster. Our Concrete Calculator estimates the cubic yardage needed for slabs, footings, or walls, ensuring a smooth pour on project day."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
               <div><label className="calculator-label">Length (ft)</label><input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Width (ft)</label><input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="calculator-input" /></div>
          </div>
          <div><label className="calculator-label">Thickness (inches)</label><input type="number" value={thickness} onChange={e => setThickness(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-gray-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Required Volume</p>
                <div className="text-5xl font-black text-white">{yards.toFixed(2)} Cubic Yards</div>
                <p className="mt-4 text-white/40">≈ {Math.ceil(yards / 0.022)} Bags (80lb)</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
