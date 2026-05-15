
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function DayOfWeekCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'day-of-week')!;
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [day, setDay] = useState('');

  useEffect(() => {
    const d = new Date(date);
    setDay(new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(d));
  }, [date]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="What day of the week were you born? What day does that major event fall on next year? Our simple utility provides instant weekday identification for any date in history or the future."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Select Date</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-primary text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">That day is a</p>
                <div className="text-5xl font-black">{day}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
