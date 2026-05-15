
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';
import { Activity, Scale } from 'lucide-react';

export default function BMICalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'bmi')!;

  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('');

  useEffect(() => {
    let calculatedBmi = 0;
    if (unit === 'metric') {
      const heightInMeters = height / 100;
      calculatedBmi = weight / (heightInMeters * heightInMeters);
    } else {
      const totalInches = (heightFt * 12) + heightIn;
      calculatedBmi = (weight / (totalInches * totalInches)) * 703;
    }
    setBmi(calculatedBmi);

    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
      setCategoryColor('text-blue-500');
    } else if (calculatedBmi < 24.9) {
      setCategory('Healthy Weight');
      setCategoryColor('text-green-500');
    } else if (calculatedBmi < 29.9) {
      setCategory('Overweight');
      setCategoryColor('text-yellow-500');
    } else {
      setCategory('Obese');
      setCategoryColor('text-red-500');
    }
  }, [unit, weight, height, heightFt, heightIn]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Understanding your body composition starts with the Body Mass Index (BMI). While it doesn't directly measure body fat, it is a highly useful screening tool used by medical professionals worldwide to categorize weight relative to height. Use our calculator to find your classification instantly."
      steps={[
        "Choose your preferred unit system (Metric or Imperial).",
        "Enter your current weight accurately.",
        "Input your height (centimeters or feet and inches).",
        "The calculator will instantly determine your BMI score.",
        "Compare your result against the WHO classification table below.",
        "Consult with a physician for a thorough health assessment."
      ]}
      formula={unit === 'metric' ? "BMI = weight (kg) / [height (m)]²" : "BMI = 703 × weight (lbs) / [height (in)]²"}
      methodology="The Body Mass Index (BMI) formula was developed by Adolphe Quetelet in the 19th century. It assumes that body mass increases as the square of the height. We utilize the standard WHO classifications: Underweight (<18.5), Normal (18.5–24.9), Overweight (25.0–29.9), and Obese (≥30.0)."
      example="A person weighing 70kg at 175cm height has a BMI of 22.9. This falls comfortably within the 'Healthy Weight' range (18.5–24.9). Conversely, a person of the same height weighing 95kg would have a BMI of 31.0, classified as 'Obese'."
      tips={[
        "BMI does not distinguish between muscle mass and body fat. Athletes may have high BMIs despite low body fat.",
        "For the most accurate result, weigh yourself in the morning before breakfast.",
        "Check your height periodically; people often overestimate their height, which artificially lowers their BMI.",
        "BMI should be used as a general indicator, not a definitive health diagnosis."
      ]}
      faqs={[
        { q: "Is BMI accurate for children?", a: "No, this calculator is for adults. BMI for children and teens is calculated the same way but interpreted using age-specific and sex-specific percentiles." },
        { q: "Why is muscle mass a problem for BMI?", a: "Muscle is denser than fat. A muscular individual might have a high 'Obese' BMI while being in peak physical condition with low body fat percentage." },
        { q: "What is a dangerous BMI?", a: "A BMI over 30 is associated with increased risk for heart disease, type 2 diabetes, and certain cancers. A BMI under 18.5 can indicate malnutrition or other health issues." },
        { q: "How often should I check my BMI?", a: "Checking once every few months is sufficient unless you are on a specific weight management program supervised by a doctor." },
        { q: "Does age affect BMI result?", a: "While the formula is the same, some research suggests that a slightly higher BMI (25-27) may be protective for individuals over age 65." }
      ]}
    >
      <div className="p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setUnit('metric')}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${unit === 'metric' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
              >
                Metric (kg, cm)
              </button>
              <button 
                onClick={() => setUnit('imperial')}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${unit === 'imperial' ? 'bg-white shadow-sm text-primary' : 'text-gray-500'}`}
              >
                Imperial (lb, ft)
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="calculator-label">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="calculator-input" 
                  />
                  <Scale className="absolute right-4 top-3 text-gray-300" size={20} />
                </div>
              </div>

              {unit === 'metric' ? (
                <div>
                  <label className="calculator-label">Height (cm)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="calculator-input" 
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="calculator-label">Height (ft)</label>
                    <input 
                      type="number" 
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="calculator-input" 
                    />
                  </div>
                  <div>
                    <label className="calculator-label">Height (in)</label>
                    <input 
                      type="number" 
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="calculator-input" 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="result-box text-center bg-gray-900">
               <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">Your BMI Score</span>
               <div className="text-6xl font-black font-mono mb-4">{bmi.toFixed(1)}</div>
               <div className={`text-xl font-bold uppercase tracking-widest ${categoryColor} bg-white/10 py-2 px-6 rounded-full inline-block`}>
                 {category}
               </div>
            </div>

            {/* Gauge visualization (simple) */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Under</span>
                <span>Normal</span>
                <span>Over</span>
                <span>Obese</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden flex relative">
                <div className="h-full bg-blue-500 w-[18.5%] border-r border-white"></div>
                <div className="h-full bg-green-500 w-[6.4%] border-r border-white"></div>
                <div className="h-full bg-yellow-500 w-[5%] border-r border-white"></div>
                <div className="h-full bg-red-500 flex-1"></div>
                
                {/* Pointer */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-black shadow-lg transition-all duration-500"
                  style={{ left: `${Math.min(100, (bmi / 40) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* BMI Table */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Weight Category</th>
                <th className="px-6 py-4">BMI Range (kg/m²)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-6 py-4 text-blue-600 font-bold">Underweight</td><td className="px-6 py-4">Less than 18.5</td></tr>
              <tr className="bg-green-50/30"><td className="px-6 py-4 text-green-600 font-bold">Normal Weight</td><td className="px-6 py-4">18.5 – 24.9</td></tr>
              <tr><td className="px-6 py-4 text-yellow-600 font-bold">Overweight</td><td className="px-6 py-4">25.0 – 29.9</td></tr>
              <tr><td className="px-6 py-4 text-red-600 font-bold">Obese Class I</td><td className="px-6 py-4">30.0 – 34.9</td></tr>
              <tr><td className="px-6 py-4 text-red-800 font-bold">Obese Class II</td><td className="px-6 py-4">35.0 – 39.9</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
