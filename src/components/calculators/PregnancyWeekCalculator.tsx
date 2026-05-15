
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function PregnancyWeekCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'pregnancy-week')!;
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState({ weeks: 0, days: 0 });

  useEffect(() => {
    const diff = new Date().getTime() - new Date(lastPeriod).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setResult({ weeks: Math.floor(days / 7), days: days % 7 });
  }, [lastPeriod]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Track your progress through one of life's most incredible journeys. This calculator helps you pinpoint exactly how far along you are in your pregnancy, allowing you to follow development milestones as they happen."
      steps={["Select your last period date.", "See your current week and day count."]}
      faqs={[{ q: "How are weeks calculated?", a: "Pregnancy is dated from the first day of your last menstrual period, meaning you are technical 'pregnant' for 2 weeks before conception." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">First Day of Last Period</label><input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-indigo-500 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">You are currently</p>
                <div className="text-5xl font-black text-white">{result.weeks} Weeks</div>
                <div className="text-2xl font-bold text-white/80">{result.days} Days</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
