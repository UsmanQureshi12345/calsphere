
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function SalaryCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'salary')!;
  const [annual, setAnnual] = useState(60000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);

  const calculate = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Turn your annual salary into chunks you can actually plan with. Whether you're comparing job offers or budgeting your life, seeing your income broken down by month, week, and hour gives you clarity on your real earnings."
      steps={["Enter annual gross pay.", "Adjust working hours if needed.", "Review the breakdown."]}
      formula="Hourly = Annual / (Weeks * Hours)"
      methodology="Simple division of annual gross pay across time units."
      example="$60,000/year at 40 hrs/week equals $28.85 per hour."
      tips={["Consider 'take-home' pay after taxes for a better budget."]}
      faqs={[{ q: "Is this pre-tax?", a: "Yes, this uses gross (pre-tax) income figures." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Annual Salary ($)</label><input type="number" value={annual} onChange={e => setAnnual(Number(e.target.value))} className="calculator-input" /></div>
          <div className="grid grid-cols-2 gap-4">
               <div><label className="calculator-label">Hours / Week</label><input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Weeks / Year</label><input type="number" value={weeksPerYear} onChange={e => setWeeksPerYear(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="space-y-4">
             <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center">
                 <span className="text-gray-500 font-bold uppercase text-xs">Monthly</span>
                 <span className="text-2xl font-black text-primary">{calculate(annual / 12)}</span>
             </div>
             <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center">
                 <span className="text-gray-500 font-bold uppercase text-xs">Weekly</span>
                 <span className="text-2xl font-black text-primary">{calculate(annual / weeksPerYear)}</span>
             </div>
             <div className="bg-primary p-6 rounded-2xl flex justify-between items-center shadow-lg transform -rotate-1">
                 <span className="text-white/60 font-bold uppercase text-xs">Hourly Rate</span>
                 <span className="text-3xl font-black text-white">{calculate(annual / (weeksPerYear * hoursPerWeek))}</span>
             </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
