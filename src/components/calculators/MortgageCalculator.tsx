
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';
import { DollarSign, Percent, Calendar } from 'lucide-react';

export default function MortgageCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'mortgage')!;

  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [insurance, setInsurance] = useState(1200);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortization, setAmortization] = useState<any[]>([]);

  useEffect(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthlyP = (principal * x * monthlyRate) / (x - 1);
      
      const mTax = propertyTax / 12;
      const mInsurance = insurance / 12;
      const totalMonthly = monthlyP + mTax + mInsurance;

      setMonthlyPayment(totalMonthly);
      setTotalPayment(monthlyP * numberOfPayments);
      setTotalInterest((monthlyP * numberOfPayments) - principal);

      // Simple yearly amortization for display
      let balance = principal;
      const yearlyAmort = [];
      for (let y = 1; y <= loanTerm; y++) {
          let yearlyInterest = 0;
          let yearlyPrincipal = 0;
          for(let m = 1; m <= 12; m++) {
              const interest = balance * monthlyRate;
              const principalPaid = monthlyP - interest;
              yearlyInterest += interest;
              yearlyPrincipal += principalPaid;
              balance -= principalPaid;
          }
          yearlyAmort.push({
              year: y,
              principal: yearlyPrincipal,
              interest: yearlyInterest,
              balance: Math.max(0, balance)
          });
      }
      setAmortization(yearlyAmort);
    }
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, insurance]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Plan your future with precision. Our Mortgage Calculator helps you estimate monthly payments by accounting for principal, interest, taxes, and insurance (PITI). Whether you are a first-time homebuyer or looking to refinance, understanding your long-term financial commitment is the first step toward homeownership."
      steps={[
        "Enter the total purchase price of the home.",
        "Input your down payment amount (usually 20% to avoid PMI).",
        "Select the loan term (standard options are 15 or 30 years).",
        "Enter the estimated annual interest rate from your lender.",
        "Include annual property taxes and homeowners insurance for PITI estimates.",
        "Review the monthly breakdown and amortization schedule below."
      ]}
      formula="M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]"
      methodology="We use the standard fixed-rate mortgage formula. 'M' is the monthly payment, 'P' is the principal loan amount (Home Price - Down Payment), 'i' is the monthly interest rate (Annual Rate / 12), and 'n' is the number of months (Years * 12). Taxes and insurance are added as flat monthly estimates to provide the PITI result."
      example="If you buy a $300,000 home with $60,000 down (20%) at a 6.5% interest rate for 30 years, your principal and interest payment is approximately $1,517. Adding $300/month for taxes and $100/month for insurance brings your total monthly PITI payment to $1,917."
      tips={[
        "Increase your down payment to 20% to avoid costly Private Mortgage Insurance (PMI).",
        "A 15-year term will result in higher monthly payments but significantly lower total interest paid.",
        "Don't forget to factor in maintenance and utilities, which calculators typically exclude.",
        "Double-check your credit score, as a 1% difference in rate can save tens of thousands of dollars."
      ]}
      faqs={[
        { q: "What does PITI stand for?", a: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four components of a monthly mortgage payment." },
        { q: "Does this calculator include PMI?", a: "No, this version focuses on basic PITI. If your down payment is less than 20%, you should manually add approximately 0.5% to 1.5% of the loan amount annually for PMI." },
        { q: "Can I use this for refinancing?", a: "Yes! Simply enter your remaining loan balance as the 'Home Price' and set the down payment to zero." },
        { q: "How often should I calculate my mortgage?", a: "You should recalculate whenever interest rates change significantly or when you are planning a major life change like moving or a career shift." },
        { q: "Is property tax fixed?", a: "No, property taxes can vary by location and may increase over time as home values are reassessed by local governments." }
      ]}
    >
      <div className="p-8 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="calculator-label">Home Price</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400">$</span>
                <input 
                  type="number" 
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="calculator-input pl-8" 
                />
              </div>
            </div>

            <div>
              <label className="calculator-label">Down Payment</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400">$</span>
                <input 
                  type="number" 
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="calculator-input pl-8" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="calculator-label">Loan Term (Years)</label>
                <select 
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="calculator-input"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
              <div>
                <label className="calculator-label">Interest Rate</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="calculator-input pr-10" 
                  />
                  <span className="absolute right-4 top-3 text-gray-400">%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="calculator-label">Annual Taxes</label>
                <input 
                    type="number" 
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                    className="calculator-input" 
                />
              </div>
              <div>
                <label className="calculator-label">Annual Insurance</label>
                <input 
                    type="number" 
                    value={insurance}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                    className="calculator-input" 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div className="result-box text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] block mb-2">Estimated Monthly Payment</span>
              <div className="text-5xl lg:text-6xl font-black font-mono">{formatCurrency(monthlyPayment)}</div>
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-[10px] uppercase text-gray-300">Total Loan</p>
                  <p className="font-bold">{formatCurrency(homePrice - downPayment)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-300">Total Interest</p>
                  <p className="font-bold">{formatCurrency(totalInterest)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 italic text-sm text-gray-500">
              Disclaimer: This is an estimate based on current rates. Your actual payment may vary based on escrow, PMI, and lender fees.
            </div>
          </div>
        </div>

        {/* Amortization Table */}
        <div className="mt-12 space-y-6">
           <h3 className="text-xl font-bold text-primary flex items-center">
             <Calendar className="mr-2 text-accent" /> Amortization Schedule (Yearly)
           </h3>
           <div className="overflow-x-auto rounded-xl border border-gray-100">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                 <tr>
                   <th className="px-6 py-4">Year</th>
                   <th className="px-6 py-4">Principal Paid</th>
                   <th className="px-6 py-4">Interest Paid</th>
                   <th className="px-6 py-4">Ending Balance</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {amortization.map(item => (
                   <tr key={item.year} className="hover:bg-gray-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-primary">{item.year}</td>
                     <td className="px-6 py-4">{formatCurrency(item.principal)}</td>
                     <td className="px-6 py-4">{formatCurrency(item.interest)}</td>
                     <td className="px-6 py-4 font-mono font-medium">{formatCurrency(item.balance)}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
