
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function BodyFatCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'body-fat')!;
  const [gender, setGender] = useState<'m' | 'f'>('m');
  const [weight, setWeight] = useState(80);
  const [waist, setWaist] = useState(90);
  const [neck, setNeck] = useState(40);
  const [hip, setHip] = useState(90);
  const [height, setHeight] = useState(180);
  const [result, setResult] = useState(0);

  useEffect(() => {
    // US Navy Method
    let bf = 0;
    if (gender === 'm') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    }
    setResult(Math.max(1, bf));
  }, [gender, waist, neck, hip, height]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Body fat percentage is a better indicator of health and fitness than weight alone. While scales can be misleading due to muscle mass, our calculator uses the US Navy Method—a trusted tape-measure algorithm—to estimate your body composition."
      steps={["Select gender.", "Enter height.", "Measure neck at narrowest point.", "Measure waist at navel (Men) or narrowest point (Women).", "Measure hips at widest point (Women only)."]}
      formula="Navy Method (Logarithmic height/neck/waist ratio)"
      methodology="We utilize the US Navy Body Fat formula, which estimates density based on the circumference of specific body locations."
      example="A male with a 180cm height, 40cm neck, and 90cm waist would have approximately 18% body fat."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex p-1 bg-gray-100 rounded-xl">
               <button onClick={() => setGender('m')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${gender === 'm' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}>Male</button>
               <button onClick={() => setGender('f')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${gender === 'f' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}>Female</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div><label className="calculator-label">Height (cm)</label><input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="calculator-input" /></div>
              <div><label className="calculator-label">Neck (cm)</label><input type="number" value={neck} onChange={e => setNeck(Number(e.target.value))} className="calculator-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div><label className="calculator-label">Waist (cm)</label><input type="number" value={waist} onChange={e => setWaist(Number(e.target.value))} className="calculator-input" /></div>
              {gender === 'f' && <div><label className="calculator-label">Hips (cm)</label><input type="number" value={hip} onChange={e => setHip(Number(e.target.value))} className="calculator-input" /></div>}
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-rose-600 text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Estimated Body Fat</p>
                 <div className="text-6xl font-black font-mono text-white">{result.toFixed(1)}%</div>
                 <p className="mt-4 text-white/60 text-sm italic">Status: {result < 14 ? 'Athlete' : result < 21 ? 'Fitness' : result < 25 ? 'Average' : 'Overweight'}</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
