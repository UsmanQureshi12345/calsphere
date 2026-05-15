
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function TileCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'tile')!;
  const [area, setArea] = useState(100);
  const [size, setSize] = useState(12); // inches (square)
  const [waste, setWaste] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const tileArea = (size * size) / 144; // sq ft
    const count = area / tileArea;
    setTotal(Math.ceil(count * (1 + waste / 100)));
  }, [area, size, waste]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Transforming your space with new tile? Calculate exactly how many boxes to buy, including a safety margin for cuts and breakage."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Room Area (sq ft)</label><input type="number" value={area} onChange={e => setArea(Number(e.target.value))} className="calculator-input" /></div>
          <div className="grid grid-cols-2 gap-4">
               <div><label className="calculator-label">Tile Size (inches)</label><input type="number" value={size} onChange={e => setSize(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Waste Margin (%)</label><input type="number" value={waste} onChange={e => setWaste(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-slate-700 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-60 mb-2">Total Tiles Needed</p>
                <div className="text-6xl font-black text-white">{total}</div>
                <p className="text-white/40 mt-2">Inc. {waste}% waste</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
