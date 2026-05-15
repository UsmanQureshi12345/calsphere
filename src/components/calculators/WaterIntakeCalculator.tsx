
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function WaterIntakeCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'water-intake')!;
  const [weight, setWeight] = useState(80);
  const [exercise, setExercise] = useState(30);
  const [result, setResult] = useState(0);

  useEffect(() => {
    // General rule: weight (kg) * 0.033 + exercise (mins)/30 * 0.35
    const base = weight * 0.033;
    const add = (exercise / 30) * 0.35;
    setResult(base + add);
  }, [weight, exercise]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Proper hydration is the foundation of energy, mental clarity, and physical performance. While '8 glasses a day' is common advice, your actual needs vary drastically based on your body weight and daily activity levels."
      steps={["Enter your weight.", "Input average daily exercise minutes.", "View your personalized hydration goal."]}
      formula="Weight(kg) * 0.033 + (Exercise/30 * 0.35)"
      tips={["Drink throughout the day rather than all at once.", "Listen to your body; thirst is often a late signal."]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Weight (kg)</label><input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Daily Exercise (min)</label><input type="number" value={exercise} onChange={e => setExercise(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-blue-500 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-70 mb-2">Recommended Intake</p>
                <div className="text-6xl font-black font-mono text-white">{result.toFixed(2)} L</div>
                <p className="mt-4 text-white/60">approx. {Math.round(result * 4.22)} glasses (236ml per glass)</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
