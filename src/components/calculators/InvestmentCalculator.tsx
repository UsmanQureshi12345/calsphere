
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function InvestmentCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'investment')!;
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let balance = initial;
    const r = rate / 100 / 12;
    const months = years * 12;
    for (let i = 0; i < months; i++) {
      balance = (balance + monthly) * (1 + r);
    }
    setTotal(balance);
  }, [initial, monthly, rate, years]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Watch your wealth grow with our Investment Calculator. By combining an initial lump sum with regular monthly contributions and an expected rate of return, you can project the future value of your portfolio. This tool is essential for long-term goal setting, whether for a down payment, a business venture, or general wealth building."
      steps={["Start with your initial capital.", "Decide your monthly contribution amount.", "Estimate your annual return rate based on historical market trends.", "Choose your time window.", "See the massive impact of consistent contributions."]}
      formula="FV = P(1+r)^n + PMT * [((1+r)^n - 1) / r]"
      methodology="We use the future value of an ordinary annuity formula combined with simple compound growth on the initial principal. Returns are compounded monthly matching the contribution frequency."
      example="An initial $10k with $500 monthly additions at 7% return over 20 years yields approximately $309,000."
      tips={["Small increases in monthly contributions can lead to massive differences over decades.", "Consider 7-8% as a realistic average for an S&P 500 index fund."]}
      faqs={[{ q: "Is this inflation adjusted?", a: "No, this shows the raw numerical value. To adjust for inflation, subtract 2-3% from your expected return rate." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Starting Amount ($)</label><input type="number" value={initial} onChange={e => setInitial(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Monthly Contribution ($)</label><input type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value))} className="calculator-input" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="calculator-label">Expected Return (%)</label><input type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="calculator-input" /></div>
            <div><label className="calculator-label">Horizon (Years)</label><input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Projected Future Value</p>
                <div className="text-5xl font-black font-mono">{format(total)}</div>
                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-400">Total Contributed: {format(initial + (monthly * years * 12))}</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
