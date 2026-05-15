
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function EnergyCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'energy-power')!;
  const [val, setVal] = useState(100);
  const [unit, setUnit] = useState('wh'); // Watt-hours
  const [res, setRes] = useState<Record<string, number>>({});

  useEffect(() => {
    // Basic Energy Joule conversions
    let joules = 0;
    if (unit === 'wh') joules = val * 3600;
    if (unit === 'kwh') joules = val * 3600000;
    if (unit === 'j') joules = val;
    if (unit === 'cal') joules = val * 4.184;

    setRes({
        J: joules,
        kWh: joules / 3600000,
        Cal: joules / 4.184,
        BTU: joules / 1055.06
    });
  }, [val, unit]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The currency of the universe. Convert between various units of energy and power, from the electricity in your home (kWh) to the heat in your food (Calories)."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="grid grid-cols-2 gap-6">
             <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="calculator-input" />
             <select value={unit} onChange={e => setUnit(e.target.value)} className="calculator-input">
                 <option value="j">Joules (J)</option>
                 <option value="wh">Watt-hours (Wh)</option>
                 <option value="kwh">kilowatt-hours (kWh)</option>
                 <option value="cal">Calories (cal)</option>
             </select>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {Object.entries(res).map(([k, v]) => (
                <div key={k} className="bg-gray-50 border-b-4 border-amber-500 p-6 rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{k}</p>
                    <p className="text-xl font-black text-primary truncate">{v.toExponential(2)}</p>
                </div>
             ))}
        </div>
      </div>
    </CalculatorTemplate>
  );
}
