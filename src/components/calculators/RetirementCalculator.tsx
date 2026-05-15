
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function RetirementCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'retirement')!;
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(50000);
  const [monthly, setMonthly] = useState(1000);
  const [returnRate, setReturnRate] = useState(7);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let balance = savings;
    const r = returnRate / 100 / 12;
    const months = (retireAge - currentAge) * 12;
    for (let i = 0; i < months; i++) {
        balance = (balance + monthly) * (1 + r);
    }
    setResult(balance);
  }, [currentAge, retireAge, savings, monthly, returnRate]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Secure your golden years with our Retirement Savings calculator. By projecting your current savings trajectory and factoring in withdrawal rates, you can see if you're on track to retire comfortably or if you need to ramp up your contributions today."
      steps={["Enter your current age.", "Target retirement age.", "Current nest egg amount.", "Annual rate of return."]}
      formula="Iterative compounding growth: (B + M) * (1+r)"
      methodology="We use monthly compounding to simulate realistic contribution patterns. The '4% rule' is often used to calculate how much you can safely withdraw annually without depleting your capital."
      example="If you retire with $1.5M, a 4% withdrawal rate provides $60,000 pre-tax income per year."
      tips={["Don't forget to account for inflation in your goals."]}
      faqs={[{ q: "What is the 4% rule?", a: "It is a rule of thumb used to determine a safe withdrawal rate that typically allows a portfolio to last 30 years." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="calculator-label">Current Age</label><input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} className="calculator-input" /></div>
            <div><label className="calculator-label">Retire Age</label><input type="number" value={retireAge} onChange={e => setRetireAge(Number(e.target.value))} className="calculator-input" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="calculator-label">Current Savings ($)</label><input type="number" value={savings} onChange={e => setSavings(Number(e.target.value))} className="calculator-input" /></div>
            <div><label className="calculator-label">Monthly Add ($)</label><input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} className="calculator-input" /></div>
          </div>
          <div><label className="calculator-label">Investment Return (%)</label><input type="number" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div className="result-box text-center bg-gray-900 border-accent border-t-4">
             <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Nest Egg at Retirement</p>
             <div className="text-5xl font-black font-mono">{format(result)}</div>
             <p className="mt-4 text-xs text-gray-400">Monthly Retirement Income (at {withdrawalRate}%): {format((result * (withdrawalRate/100)) / 12)}</p>
          </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
