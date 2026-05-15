
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function FuelCostCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'fuel-cost')!;
  const [distance, setDistance] = useState(100);
  const [efficiency, setEfficiency] = useState(25); // mpg
  const [price, setPrice] = useState(3.5); // per gal
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const gallons = distance / efficiency;
    setCost(gallons * price);
  }, [distance, efficiency, price]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Planning a road trip? Calculate the true cost of your journey at the pump. By factoring in your vehicle's fuel efficiency and current gas prices, you can budget for transit with precision."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Distance (miles)</label><input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} className="calculator-input" /></div>
          <div className="grid grid-cols-2 gap-4">
               <div><label className="calculator-label">Avg MPG</label><input type="number" value={efficiency} onChange={e => setEfficiency(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Price per Gallon ($)</label><input type="number" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-amber-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-60 mb-2">Estimated Trip Cost</p>
                <div className="text-6xl font-black text-white">{format(cost)}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
