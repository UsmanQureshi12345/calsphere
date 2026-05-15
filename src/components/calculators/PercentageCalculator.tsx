
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function PercentageCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'percentage')!;

  const [mode, setMode] = useState<'of' | 'is' | 'change'>('of');
  const [val1, setVal1] = useState(20);
  const [val2, setVal2] = useState(150);
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (mode === 'of') {
      setResult((val1 / 100) * val2);
    } else if (mode === 'is') {
      setResult((val1 / val2) * 100);
    } else if (mode === 'change') {
      setResult(((val2 - val1) / val1) * 100);
    }
  }, [mode, val1, val2]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Percentages are the universal language of proportions. Whether you're calculating a discount, determining a tip, or tracking house price growth, our Percentage Calculator handles the three most common mathematical scenarios with ease. No more mental gymnastics or misplaced decimal points—just instant, verified accuracy."
      steps={[
        "Choose your calculation mode: What is X% of Y, X is what % of Y, or Percentage Change.",
        "Enter your first numerical value in the primary input field.",
        "Input your second numerical value in the secondary field.",
        "The calculated percentage or value will appear instantly in the result box.",
        "Toggle between modes to perform different types of proportional analysis.",
        "Use the result for budgeting, academic work, or retail comparisons."
      ]}
      formula={mode === 'of' ? "(X / 100) * Y" : mode === 'is' ? "(X / Y) * 100" : "((Y - X) / X) * 100"}
      methodology="Our tool applies standard mathematical ratios. For percentage of a value, we convert the percentage to a decimal (dividing by 100) before multiplying. For percentage change, we use the formula (New - Old) / Old, which provides the relative growth or decline."
      example="To find 20% of 150: Set mode to 'What is X% of Y', enter X=20, Y=150. Result is 30. To see the % increase from a $50 stock price to $75: Set mode to '% Change', enter X=50, Y=75. Result is 50% increase."
      tips={[
        "Remember that a 100% increase means the value has doubled.",
        "Percentages are reversible: 8% of 50 is the same as 50% of 8 (both are 4).",
        "When calculating percentage change, ensure the 'Old' value (X) is not zero to avoid mathematical errors.",
        "Use the percentage change mode specifically for comparing prices over time or ROI on assets."
      ]}
      faqs={[
        { q: "What is the difference between percentage and percentage points?", a: "A percentage is a ratio of a total. Percentage points refer to the arithmetic difference between two percentages (e.g., a move from 5% to 7% is a 2 percentage point increase, but a 40% increase)." },
        { q: "Can I use negative numbers?", a: "Yes, our calculator supports negative values, which is particularly useful for tracking business losses or temperature changes." },
        { q: "How do I calculate a discount?", a: "Use the 'What is X% of Y' mode. X is the discount percentage, Y is the original price. Subtract the result from Y to find the final price." },
        { q: "What is percentage change used for?", a: "It's primarily used in finance and statistics to track growth, inflation, and performance metrics over different time periods." },
        { q: "Is 100% the maximum?", a: "No, percentages can exceed 100% (e.g., if a value triples, it has increased by 200%, reaching 300% of its original size)." }
      ]}
    >
      <div className="p-8 lg:p-12">
        <div className="flex bg-gray-100 p-1 rounded-2xl mb-8 overflow-hidden">
            <button onClick={() => setMode('of')} className={`flex-1 py-3 px-4 font-bold rounded-xl text-sm transition-all ${mode === 'of' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}>What is X% of Y?</button>
            <button onClick={() => setMode('is')} className={`flex-1 py-3 px-4 font-bold rounded-xl text-sm transition-all ${mode === 'is' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}>X is what % of Y?</button>
            <button onClick={() => setMode('change')} className={`flex-1 py-3 px-4 font-bold rounded-xl text-sm transition-all ${mode === 'change' ? 'bg-white shadow text-primary' : 'text-gray-500'}`}>% Change (X to Y)</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div>
                    <label className="calculator-label">{mode === 'of' ? 'Percentage (X)' : mode === 'is' ? 'Value (X)' : 'Old Value (X)'}</label>
                    <div className="relative">
                        <input type="number" value={val1} onChange={e => setVal1(Number(e.target.value))} className="calculator-input" />
                        {mode === 'of' && <span className="absolute right-4 top-3 text-gray-400 font-bold">%</span>}
                    </div>
                </div>
                <div>
                    <label className="calculator-label">{mode === 'of' ? 'Of Value (Y)' : mode === 'is' ? 'Total (Y)' : 'New Value (Y)'}</label>
                    <input type="number" value={val2} onChange={e => setVal2(Number(e.target.value))} className="calculator-input" />
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <div className="result-box text-center bg-[#1d1d1d]">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">Calculated Result</span>
                    <div className="text-6xl font-black font-mono">
                        {mode === 'of' ? result.toLocaleString() : result.toFixed(2) + '%'}
                    </div>
                    {mode === 'change' && (
                        <div className={`mt-4 font-bold uppercase text-sm ${result >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {result >= 0 ? 'Increase' : 'Decrease'}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
