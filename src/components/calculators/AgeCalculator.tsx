
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function AgeCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'age')!;
  const [dob, setDob] = useState('1990-01-01');
  const [result, setResult] = useState({ y: 0, m: 0, d: 0 });

  useEffect(() => {
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setResult({ y: years, m: months, d: days });
  }, [dob]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="More than just a number. Our Age Calculator provides your precise chronological age down to the day, helping you celebrate milestones or calculate eligibility for services."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Date of Birth</label><input type="date" value={dob} onChange={e => setDob(e.target.value)} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-primary text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Current Age</p>
                <div className="text-5xl font-black">{result.y} Years</div>
                <p className="text-xl font-bold text-gray-400">{result.m} Months, {result.d} Days</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
