
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function PaceCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'pace')!;
  const [distance, setDistance] = useState(5);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [pace, setPace] = useState('');

  useEffect(() => {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds > 0 && distance > 0) {
        const paceInSeconds = totalSeconds / distance;
        const pMin = Math.floor(paceInSeconds / 60);
        const pSec = Math.round(paceInSeconds % 60);
        setPace(`${pMin}:${pSec.toString().padStart(2, '0')} /km`);
    }
  }, [distance, hours, minutes, seconds]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Whether training for a 5K or a marathon, knowing your pace is vital for performance. Our Pace Calculator helps you determine how fast you need to run to hit your finish-time goals, or helps you calculate your performance from a recent race."
      steps={["Enter race distance.", "Enter total time elapsed.", "Review your split pace per kilometer."]}
      formula="Pace = Time / Distance"
      tips={["Consistency is key. Try to maintain an even pace rather than starting too fast."]}
      faqs={[{q: "What is a good 5k pace?", a: "For beginners, 6:00-7:00 /km is a common starting point. Elite runners go below 3:00 /km."}]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Distance (km)</label><input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} className="calculator-input" /></div>
          <div className="grid grid-cols-3 gap-4">
               <div><label className="calculator-label">Hours</label><input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Minutes</label><input type="number" value={minutes} onChange={e => setMinutes(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Seconds</label><input type="number" value={seconds} onChange={e => setSeconds(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-purple-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Required Pace</p>
                <div className="text-6xl font-black font-mono text-white">{pace}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
