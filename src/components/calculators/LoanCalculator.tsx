
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function LoanCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'loan')!;

  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [loanTerm, setLoanTerm] = useState(5);
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const mP = (principal * x * monthlyRate) / (x - 1);
      
      setMonthlyPayment(mP);
      setTotalCost(mP * numberOfPayments);
      setTotalInterest((mP * numberOfPayments) - principal);
    } else if (principal > 0 && monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      setTotalCost(principal);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Take control of your personal finances with our Personal Loan Calculator. Whether you are consolidating debt, funding a home improvement project, or planning a major purchase, understanding the monthly cost and total interest of a loan is essential. Our tool provides a clear breakdown of your repayment obligations so you can borrow with confidence."
      steps={[
        "Enter the total amount you wish to borrow (Principal).",
        "Input the annual interest rate offered by your lender.",
        "Select the loan repayment term in years.",
        "Review the calculated monthly payment instantly.",
        "Check the total interest paid over the life of the loan.",
        "Compare different interest rates to see how much you can save by shopping around."
      ]}
      formula="P = [ r * PV ] / [ 1 - (1 + r)^-n ]"
      methodology="This tool uses the standard annuity formula for fixed-rate installment loans. PV is the present value (Loan Amount), r is the monthly interest rate, and n is the total number of monthly payments. This methodology applies to most personal, student, and consolidated debt loans provided by commercial banks and credit unions."
      example="A $10,000 personal loan at a 5% interest rate for 5 years results in a monthly payment of $188.71. Over 60 months, you will pay a total of $11,322.74, meaning the cost of borrowing (interest) is $1,322.74."
      tips={[
        "Check for origination fees; some lenders deduct these from the total amount you receive.",
        "Paying even a small amount extra each month can significantly reduce your total interest paid.",
        "Beware of variable interest rates that may increase over the life of your loan.",
        "Always review the 'Total Cost of Loan' to understand the true price of borrowing."
      ]}
      faqs={[
        { q: "What is an amortization schedule?", a: "It is a table showing each periodic payment on a loan. Each payment is broken down into the amount that goes toward interest and the amount that goes toward the principal balance." },
        { q: "Does this include taxes or insurance?", a: "No, personal loan calculators typically only cover principal and interest. Mortgage and auto loan calculators may include additional fees." },
        { q: "Can I pay off my loan early?", a: "Most modern personal loans allow early repayment without penalty, but you should always check your specific loan agreement for 'Prepayment Penalties'." },
        { q: "Why is my monthly payment higher than the calculator says?", a: "Your lender may include monthly service fees, credit insurance, or other add-ons that are not reflected in a standard P+I calculation." },
        { q: "How does my credit score affect the rate?", a: "Higher credit scores typically qualify for lower interest rates, reducing your monthly payment and total interest cost." }
      ]}
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="calculator-label">Loan Amount</label>
            <input 
              type="number" 
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="calculator-input" 
            />
          </div>
          <div>
            <label className="calculator-label">Annual Interest Rate (%)</label>
            <input 
              type="number" 
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="calculator-input" 
            />
          </div>
          <div>
            <label className="calculator-label">Loan Term (Years)</label>
            <input 
              type="number" 
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="calculator-input" 
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
            <div className="result-box bg-primary text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Monthly Payment</p>
                <p className="text-5xl font-black font-mono">{formatCurrency(monthlyPayment)}</p>
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400">Total Interest</p>
                    <p className="font-bold">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400">Total Cost</p>
                    <p className="font-bold">{formatCurrency(totalCost)}</p>
                  </div>
                </div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
