
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function CountdownCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'countdown-timer')!;
  const [target, setTarget] = useState('2026-12-31T23:59:59');
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(target).getTime() - new Date().getTime();
      if (diff <= 0) {
          setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
          return;
      }
      setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The anticipation builder. Set a target date and time to see exactly how much life happens between now and your next big moment."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div><label className="calculator-label">Target Date & Time</label><input type="datetime-local" value={target} onChange={e => setTarget(e.target.value)} className="calculator-input" /></div>
        <div className="grid grid-cols-4 gap-4">
             <div className="result-box bg-primary p-4 md:p-8 m-0!"><div className="text-2xl md:text-5xl font-black">{timeLeft.d}</div><small className="opacity-50 text-[10px] uppercase font-bold">Days</small></div>
             <div className="result-box bg-primary p-4 md:p-8 m-0!"><div className="text-2xl md:text-5xl font-black">{timeLeft.h}</div><small className="opacity-50 text-[10px] uppercase font-bold">Hrs</small></div>
             <div className="result-box bg-primary p-4 md:p-8 m-0!"><div className="text-2xl md:text-5xl font-black">{timeLeft.m}</div><small className="opacity-50 text-[10px] uppercase font-bold">Min</small></div>
             <div className="result-box bg-primary p-4 md:p-8 m-0!"><div className="text-2xl md:text-5xl font-black text-accent">{timeLeft.s}</div><small className="opacity-50 text-[10px] uppercase font-bold">Sec</small></div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
