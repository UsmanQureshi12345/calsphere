
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function IdealWeightCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'ideal-weight')!;
  const [gender, setGender] = useState<'m'|'f'>('m');
  const [height, setHeight] = useState(175); // cm
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Devine Formula
    const heightInInches = height / 2.54;
    const baseHeight = 60; // 5 feet
    const extraInches = heightInInches - baseHeight;
    
    if (gender === 'm') {
      setResult(50 + (2.3 * extraInches));
    } else {
      setResult(45.5 + (2.3 * extraInches));
    }
  }, [gender, height]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The Ideal Body Weight (IBW) calculator provides a target weight range based on the Devine Formula. While it doesn't account for muscle mass or bone density, it serves as a medical baseline for calculating medication dosages and general health benchmarks."
      steps={["Select gender.", "Enter height accurately.", "Review the Devine Formula estimate."]}
      formula="Male: 50kg + 2.3kg per inch over 5ft | Female: 45.5kg + 2.3kg per inch over 5ft"
      methodology="We use the Devine Formula (1974), which is the most commonly used weight estimation algorithm in clinical settings."
      tips={["Use this as a guide, not a strict rule. Elite athletes often weigh more due to muscle."]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="flex p-1 bg-gray-100 rounded-xl">
               <button onClick={() => setGender('m')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${gender === 'm' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}>Male</button>
               <button onClick={() => setGender('f')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${gender === 'f' ? 'bg-white shadow-md text-primary' : 'text-gray-500'}`}>Female</button>
          </div>
          <div><label className="calculator-label">Height (cm)</label><input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-blue-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-70 mb-2">Ideal Body Weight</p>
                <div className="text-6xl font-black font-mono text-white">{result.toFixed(1)} kg</div>
                <p className="mt-4 text-white/60">({(result * 2.20462).toFixed(1)} lbs)</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
