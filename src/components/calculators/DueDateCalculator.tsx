
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function DueDateCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'due-date')!;
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const d = new Date(lastPeriod);
    d.setDate(d.getDate() + 280); // Naegele's Rule approx (LMP + 9mo + 7days)
    setDueDate(d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  }, [lastPeriod]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The journey to parenthood begins with a date. Our Pregnancy Due Date Calculator uses Naegele's Rule—the medical standard—to estimate when your little one will arrive based on your last menstrual period."
      steps={["Select the first day of your last period.", "The calculator adds 280 days (40 weeks) to predict your due date."]}
      formula="Naegele's Rule: Last Period + 7 Days - 3 Months + 1 Year"
      tips={["Most babies arrive within 2 weeks of their due date.", "Confirm this date with your obstetrician during your first ultrasound."]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">First Day of Last Period</label><input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-pink-500 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-70 mb-2">Estimated Due Date</p>
                <div className="text-4xl font-black text-white">{dueDate}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
