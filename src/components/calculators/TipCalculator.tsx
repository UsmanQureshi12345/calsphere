
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function TipCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'tip')!;
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(1);

  const calculate = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  const tipAmount = bill * (tipPercent / 100);
  const totalBill = bill + tipAmount;

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Dining out with friends? Take the math out of the check. Our Tip Calculator handles splitting the bill, calculating percentages, and ensuring everyone pays their fair share effortlessly."
      steps={["Enter total bill amount.", "Choose tip percentage.", "Optionally split between multiple people."]}
      tips={["15-20% is standard in many Western countries.", "Consider adding the tip before splitting to keep it simple."]}
      faqs={[{ q: "Is the tip calculated before tax?", a: "Standard practice is to tip on the pre-tax total, though many people tip on the final total for simplicity." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Bill Total ($)</label><input type="number" value={bill} onChange={e => setBill(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Tip (%)</label><input type="number" value={tipPercent} onChange={e => setTipPercent(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Split (People)</label><input type="number" min="1" value={people} onChange={e => setPeople(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="space-y-6">
            <div className="result-box bg-primary text-center">
                 <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Total Per Person</p>
                 <div className="text-5xl font-black font-mono">{calculate(totalBill / people)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                     <p className="text-[10px] text-gray-400 font-black uppercase">Tip Amount</p>
                     <p className="text-xl font-bold">{calculate(tipAmount)}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl text-center">
                     <p className="text-[10px] text-gray-400 font-black uppercase">Total Bill</p>
                     <p className="text-xl font-bold">{calculate(totalBill)}</p>
                 </div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
