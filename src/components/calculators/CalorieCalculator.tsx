
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';
import { User, Activity } from 'lucide-react';

export default function CalorieCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'calorie')!;

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [activity, setActivity] = useState(1.2); // Sedentary

  const [tdee, setTdee] = useState(0);

  useEffect(() => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    setTdee(bmr * activity);
  }, [gender, age, weight, height, activity]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Achieve your fitness goals with scientific accuracy. Our Calorie Calculator uses the Mifflin-St Jeor equation—considered the most reliable predictor of metabolic rate—to estimate your Total Daily Energy Expenditure (TDEE). Whether you want to lose weight, build muscle, or maintain your physique, knowing your daily caloric burn is the essential first step."
      steps={[
        "Select your gender (biological sex assigned at birth for metabolic baseline).",
        "Enter your current age in years.",
        "Input your weight in kilograms and height in centimeters.",
        "Select your average weekly activity level (from sedentary to athlete).",
        "The calculator will provide your daily maintenance calories.",
        "Adjust this value by 300-500 calories for weight loss or gain goals."
      ]}
      formula="BMR = (10 × weight) + (6.25 × height) - (5 × age) + s"
      methodology="We use the Mifflin-St Jeor Equation, where 's' is +5 for males and -161 for females. This determines your Basal Metabolic Rate (BMR). To find your TDEE (Total Daily Energy Expenditure), we multiply the BMR by an activity factor ranging from 1.2 (sedentary) to 1.9 (extremely active)."
      example="A 25-year-old male weighing 70kg at 175cm height who is sedentary (activity factor 1.2) has a TDEE of approximately 2,010 calories per day. To lose roughly 1lb of fat per week, he would target a daily intake of 1,510 calories."
      tips={[
        "Be honest about your activity level; most people overestimate how much they move.",
        "For weight loss, a deficit of 500 calories per day typically results in 1lb of loss per week.",
        "Ensure you consume enough protein (approx. 0.8g per lb of body weight) while in a deficit to preserve muscle.",
        "TDEE is an estimate; monitor your weight for 2-3 weeks and adjust if results differ from projections."
      ]}
      faqs={[
        { q: "What is BMR vs TDEE?", a: "BMR (Basal Metabolic Rate) is the energy your body spends just to keep you alive at rest. TDEE includes all physical movement and the thermic effect of food." },
        { q: "Is this calculator accurate for keto?", a: "Yes, calories remain the primary driver of weight change regardless of your macronutrient split (Keto, Paleo, Vegan)." },
        { q: "How much weight loss is safe?", a: "Medical professionals generally recommend losing no more than 1-2 lbs (0.5-1kg) per week to ensure long-term sustainability and nutritional health." },
        { q: "Should I eat back exercise calories?", a: "Generally, no. If you've selected an 'active' setting, those calories are already included in your daily goal." },
        { q: "Does metabolism slow down with age?", a: "Yes, slightly, due to natural muscle loss. Strength training can help counteract this metabolic slowdown." }
      ]}
    >
      <div className="p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button onClick={() => setGender('male')} className={`flex-1 py-3 font-bold rounded-lg ${gender === 'male' ? 'bg-white shadow text-primary' : 'text-gray-400'}`}>Male</button>
                <button onClick={() => setGender('female')} className={`flex-1 py-3 font-bold rounded-lg ${gender === 'female' ? 'bg-white shadow text-primary' : 'text-gray-400'}`}>Female</button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="calculator-label">Age</label>
                <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="calculator-input" />
              </div>
              <div>
                <label className="calculator-label">Weight (kg)</label>
                <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="calculator-input" />
              </div>
              <div>
                <label className="calculator-label">Height (cm)</label>
                <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="calculator-input" />
              </div>
            </div>

            <div>
              <label className="calculator-label">Activity Level</label>
              <select value={activity} onChange={e => setActivity(Number(e.target.value))} className="calculator-input">
                <option value={1.2}>Sedentary (Little/no exercise)</option>
                <option value={1.375}>Lightly Active (1-3 days/week)</option>
                <option value={1.55}>Moderately Active (3-5 days/week)</option>
                <option value={1.725}>Very Active (6-7 days/week)</option>
                <option value={1.9}>Extra Active (Hard labor/Pro athlete)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="result-box text-center bg-gray-900">
               <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Maintenance Calories</p>
               <p className="text-6xl font-black font-mono mb-2">{Math.round(tdee).toLocaleString()}</p>
               <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Calories Per Day</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Weight Loss (-500)</p>
                  <p className="text-xl font-bold text-blue-900">{Math.round(tdee - 500).toLocaleString()}</p>
               </div>
               <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-[10px] font-bold text-orange-400 uppercase mb-1">Weight Gain (+500)</p>
                  <p className="text-xl font-bold text-orange-900">{Math.round(tdee + 500).toLocaleString()}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
