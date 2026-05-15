
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function SavingsCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'savings')!;
  const [goal, setGoal] = useState(10000);
  const [current, setCurrent] = useState(1000);
  const [rate, setRate] = useState(4);
  const [time, setTime] = useState(2); // years
  const [required, setRequired] = useState(0);

  useEffect(() => {
    const r = rate / 100 / 12;
    const n = time * 12;
    const targetAfterLumpSum = goal - current * Math.pow(1 + r, n);
    if (targetAfterLumpSum <= 0) {
        setRequired(0);
    } else {
        const pmt = targetAfterLumpSum / ((Math.pow(1 + r, n) - 1) / r);
        setRequired(pmt);
    }
  }, [goal, current, rate, time]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Targeting a new car, a wedding, or a dream vacation? Our Goal-Based Savings Calculator tells you exactly how much you need to set aside each month to hit your target within your desired timeframe."
      steps={["Define your goal amount.", "Enter current savings.", "Estimate interest rate.", "Set your deadline."]}
      formula="PMT = [ Goal - P(1+r)^n ] / [ ((1+r)^n - 1) / r ]"
      methodology="Calculates the fixed monthly installment needed into an interest-bearing account to reach a future value."
      example="Saving $10,000 in 2 years with $1,000 start at 4% requires ~$350/month."
      tips={["Automate your savings to stay on track."]}
      faqs={[{ q: "Is this for HYSAs?", a: "Yes, use current High Yield Savings Account rates (e.g. 4-5%) for best results." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Target Goal ($)</label><input type="number" value={goal} onChange={e => setGoal(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Current Savings ($)</label><input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} className="calculator-input" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="calculator-label">Rate (%)</label><input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="calculator-input" /></div>
            <div><label className="calculator-label">Deadline (Years)</label><input type="number" value={time} onChange={e => setTime(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-secondary bg-teal-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-70 mb-2">Monthly Saving Needed</p>
                <div className="text-5xl font-black font-mono">{format(required)}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
