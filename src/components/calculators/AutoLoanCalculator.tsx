
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';
import { Car, DollarSign, Percent } from 'lucide-react';

export default function AutoLoanCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'auto-loan')!;

  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeIn, setTradeIn] = useState(2000);
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [interestRate, setInterestRate] = useState(5.5);
  const [salesTax, setSalesTax] = useState(6.0);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const taxAmount = vehiclePrice * (salesTax / 100);
    const amountToFinance = vehiclePrice + taxAmount - downPayment - tradeIn;
    setTotalLoanAmount(amountToFinance);

    if (amountToFinance > 0) {
      const monthlyRate = interestRate / 100 / 12;
      if (monthlyRate > 0) {
        const x = Math.pow(1 + monthlyRate, loanTerm);
        const mP = (amountToFinance * x * monthlyRate) / (x - 1);
        setMonthlyPayment(mP);
        setTotalCost(mP * loanTerm + downPayment + tradeIn);
        setTotalInterest((mP * loanTerm) - amountToFinance);
      } else {
        const mP = amountToFinance / loanTerm;
        setMonthlyPayment(mP);
        setTotalCost(amountToFinance + downPayment + tradeIn);
        setTotalInterest(0);
      }
    } else {
      setMonthlyPayment(0);
      setTotalCost(vehiclePrice + taxAmount);
      setTotalInterest(0);
    }
  }, [vehiclePrice, downPayment, tradeIn, loanTerm, interestRate, salesTax]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Cruising into a new car should be exciting, not stressful. Our Auto Loan Calculator helps you break down the true cost of car financing. By factoring in sales tax, trade-in values, and down payments, you can determine exactly how much car you can afford and what your monthly commitment will be before you even step onto the dealership lot."
      steps={[
        "Enter the negotiated price of the vehicle you intend to buy.",
        "Input your down payment and the estimated value of your trade-in vehicle.",
        "Select the loan term in months (common options are 48, 60, or 72).",
        "Enter the annual interest rate (APR) provided by your lender or bank.",
        "Include local sales tax rates to see the total price out-the-door.",
        "Review your monthly payment and total interest cost."
      ]}
      formula="Monthly Payment = [ P * r * (1 + r)^n ] / [ (1 + r)^n – 1 ]"
      methodology="We calculate the 'Amount to Finance' by taking the Vehicle Price, adding Sales Tax, and then subtracting your Down Payment and Trade-in Allowance. The resulting principal (P) is then processed through the standard fixed-rate amortization formula using your monthly interest rate (r) and term length (n)."
      example="If you buy a $35,000 car with 6% sales tax ($2,100), put $5,000 down and trade in a car for $2,000, you will finance $30,100. At a 5.5% interest rate for 60 months, your monthly payment will be approximately $574.68, with a total interest cost of $4,380.80."
      tips={[
        "Aim for a loan term of 60 months or less to avoid paying excessive interest.",
        "Remember that longer terms can lead to 'negative equity' where you owe more than the car is worth.",
        "Get pre-approved at a bank or credit union before visiting a dealer to ensure a competitive rate.",
        "Don't forget to factor in insurance and registration fees, which are not included in the loan calculation."
      ]}
      faqs={[
        { q: "What is a good APR for a car loan?", a: "Average APRs vary based on your credit score and whether the car is new or used. Generally, anything below 5-6% is considered good as of 2024." },
        { q: "Should I choose a 72-month loan?", a: "While it lowers your monthly payment, it significantly increases the total interest you pay and keeps you in debt longer. Use it only if necessary for monthly cash flow." },
        { q: "How does a trade-in affect my loan?", a: "A trade-in acts like a down payment. It reduces the amount you need to finance, which lowers both your monthly payment and the total interest paid." },
        { q: "Does sales tax depend on my location?", a: "Yes, sales tax is determined by the state and sometimes the county where you register the vehicle, not necessarily where you buy it." },
        { q: "Can I refinance an auto loan later?", a: "Yes, if interest rates drop or your credit score improves, you can often refinance with a different lender to lower your monthly payments." }
      ]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="calculator-label">Vehicle Price ($)</label>
            <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(Number(e.target.value))} className="calculator-input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="calculator-label">Down Payment ($)</label>
              <input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="calculator-input" />
            </div>
            <div>
              <label className="calculator-label">Trade-in Value ($)</label>
              <input type="number" value={tradeIn} onChange={e => setTradeIn(Number(e.target.value))} className="calculator-input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="calculator-label">Term (Months)</label>
              <select value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className="calculator-input">
                {[24, 36, 48, 60, 72, 84].map(m => <option key={m} value={m}>{m} Months</option>)}
              </select>
            </div>
            <div>
              <label className="calculator-label">Interest Rate (%)</label>
              <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="calculator-input" />
            </div>
          </div>
          <div>
            <label className="calculator-label">Sales Tax (%)</label>
            <input type="number" step="0.1" value={salesTax} onChange={e => setSalesTax(Number(e.target.value))} className="calculator-input" />
          </div>
        </div>

        <div className="flex flex-col justify-center">
            <div className="result-box bg-primary text-center">
                <div className="flex justify-center mb-4"><Car size={48} className="text-accent opacity-20" /></div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Monthly Payment</p>
                <p className="text-5xl font-black font-mono">{formatCurrency(monthlyPayment)}</p>
                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-6 text-left">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold">Amount Financed</p>
                    <p className="font-bold text-lg">{formatCurrency(totalLoanAmount)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold">Total Interest</p>
                    <p className="font-bold text-lg">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
