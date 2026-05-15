
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function PrimeCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'prime')!;
  const [num, setNum] = useState(97);
  const [isPrime, setIsPrime] = useState(true);

  useEffect(() => {
    if (num <= 1) return setIsPrime(false);
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return setIsPrime(false);
    }
    setIsPrime(true);
  }, [num]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Prime numbers are the 'atoms' of mathematics—numbers greater than 1 that cannot be formed by multiplying two smaller natural numbers. They form the backbone of modern cryptography and number theory."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Enter a Number</label><input type="number" value={num} onChange={e => setNum(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className={`result-box text-center ${isPrime ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                <div className="text-4xl font-black text-white">{num} is {isPrime ? 'PRIME' : 'NOT PRIME'}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
