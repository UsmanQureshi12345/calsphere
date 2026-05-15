
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function SalesTaxCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'sales-tax')!;
  const [amount, setAmount] = useState(100);
  const [tax, setTax] = useState(8.25);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(amount * (1 + tax / 100));
  }, [amount, tax]);

  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="No more sticker shock at the register. Our Sales Tax Calculator helps you find the final price of any item by adding local tax rates, or 'reverse calculate' to find the base price from a total."
      steps={["Enter the price on the tag.", "Enter your local tax rate (%)", "See the total out-the-door cost."]}
      formula="Total = Base * (1 + TaxRate)"
      tips={["Common US sales tax ranges from 0% to 10% depending on state and county."]}
      faqs={[{ q: "Which states have 0% sales tax?", a: "Alaska, Delaware, Montana, New Hampshire, and Oregon." }]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Initial Price ($)</label><input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="calculator-input" /></div>
          <div><label className="calculator-label">Tax Rate (%)</label><input type="number" step="0.01" value={tax} onChange={e => setTax(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-indigo-600 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-70 mb-2">Total with Tax</p>
                <div className="text-5xl font-black font-mono text-white">{format(total)}</div>
                <p className="mt-4 text-white/60">Tax Amount: {format(total - amount)}</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
