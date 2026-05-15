
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function SpeedCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'speed-distance-time')!;
  const [d, setD] = useState(100);
  const [t, setT] = useState(2);
  const [s, setS] = useState(50);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Master kinematics. Calculate how fast you were going, how far you'll go, or how long it will take to get there with our 3-way Speed, Distance, and Time solver."
      formula="Speed = Distance / Time"
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-2xl">
              <label className="calculator-label">Distance</label>
              <input type="number" value={d} onChange={e => { const v = Number(e.target.value); setD(v); setS(v/t); }} className="calculator-input" />
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl">
              <label className="calculator-label">Time</label>
              <input type="number" value={t} onChange={e => { const v = Number(e.target.value); setT(v); setS(d/v); }} className="calculator-input" />
          </div>
          <div className="bg-primary p-6 rounded-2xl">
              <label className="calculator-label text-white/50">Speed (Average)</label>
              <input type="number" value={s} onChange={e => { const v = Number(e.target.value); setS(v); setD(v*t); }} className="calculator-input bg-white/10 text-white border-white/20" />
          </div>
      </div>
    </CalculatorTemplate>
  );
}
