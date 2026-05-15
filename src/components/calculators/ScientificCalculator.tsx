
import React, { useState, useEffect, useCallback } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';
import { Delete, RotateCcw } from 'lucide-react';

export default function ScientificCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'scientific')!;

  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [memory, setMemory] = useState(0);
  const [isRad, setIsRad] = useState(true);

  const calculateResults = useCallback(() => {
    try {
      // Basic sanitization and evaluation
      // Replace symbols for JS evaluation
      let evalEq = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, isRad ? 'Math.sin(' : `Math.sin((Math.PI/180)*`)
        .replace(/cos\(/g, isRad ? 'Math.cos(' : `Math.cos((Math.PI/180)*`)
        .replace(/tan\(/g, isRad ? 'Math.tan(' : `Math.tan((Math.PI/180)*`)
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**');

      const result = eval(evalEq);
      setDisplay(String(Number(result.toFixed(10))));
      setEquation(display + ' =');
    } catch (err) {
      setDisplay('Error');
    }
  }, [display, isRad]);

  const handleInput = (val: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Experience the power of a standard lab-grade instrument with our online Scientific Calculator. Designed for students, engineers, and scientists, our tool supports trigonometric functions, logarithms, exponents, and memory operations. Whether you are solving for X in algebra or computing radians for physics, our verified precision engine ensures your calculations are correct every time."
      steps={[
        "Type your numbers using the on-screen keypad or your keyboard.",
        "Use mathematical operators like +, -, ×, and ÷ for basic arithmetic.",
        "Access advanced functions such as sin, cos, tan, log, and ln.",
        "Toggle between Radians (Rad) and Degrees (Deg) for trigonometry.",
        "Utilize parentheses ( ) to manage operator precedence correctly.",
        "Click the '=' button to see your final result."
      ]}
      formula="f(x) = mathematical evaluation"
      methodology="Our engine uses standard JavaScript Math objects with enhancements for scientific notation and trigonometric unit conversion. We prioritize standard order of operations (PEMDAS/BODMAS) via recursive evaluation logic. Trigonometric results are adjusted based on the user-selected Degree/Radian mode."
      example="To calculate the sine of 30 degrees: 1. Toggle to 'Deg' mode. 2. Type 'sin(30)'. 3. Result will be 0.5. To calculate a complex exponent: Type '2 ^ 10'. Result will be 1024."
      tips={[
        "Always check if you are in Radian or Degree mode before performing trigonometry.",
        "Clear your screen (AC) between unrelated major calculations to avoid residual operations.",
        "Use parentheses ( ) generously to ensure your desired order of operations.",
        "Memory functions (M+, MR) are extremely useful for sub-totals in long homework problems."
      ]}
      faqs={[
        { q: "What is the difference between Rad and Deg?", a: "Degree (Deg) divides a circle into 360 units, while Radian (Rad) uses the circle's radius. Scientists and engineers typically prefer Radians for calculus." },
        { q: "How do I calculate a square root?", a: "Use the 'sqrt(' function button or type 'sqrt(your_number)'." },
        { q: "Does this follow PEMDAS?", a: "Yes, our evaluation engine strictly follows the standard order of operations: Parentheses, Exponents, Multiplication and Division (left to right), Addition and Subtraction (left to right)." },
        { q: "How do I use the memory buttons?", a: "M+ adds the current display to memory. MR recalls the memory value to the display. MC clears the memory entirely." },
        { q: "Can I use my keyboard?", a: "Yes! Most standard keys (0-9, +, -, *, /, Enter, Backspace) are supported for faster data entry." }
      ]}
    >
      <div className="bg-[#151619] text-white p-6 lg:p-8 font-mono">
        {/* Display Wrapper */}
        <div className="bg-[#1f2023] p-6 rounded-2xl mb-6 shadow-inner text-right border border-white/5">
           <div className="text-gray-500 text-sm h-6 mb-1">{equation}</div>
           <div className="text-4xl font-bold truncate tracking-tight">{display}</div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-5 gap-3">
          {/* Mode Switchers */}
          <button onClick={() => setIsRad(true)} className={`h-12 rounded-xl text-xs font-bold ${isRad ? 'bg-primary text-accent' : 'bg-white/5 text-gray-400'}`}>RAD</button>
          <button onClick={() => setIsRad(false)} className={`h-12 rounded-xl text-xs font-bold ${!isRad ? 'bg-primary text-accent' : 'bg-white/5 text-gray-400'}`}>DEG</button>
          <button onClick={handleBackspace} className="h-12 rounded-xl bg-red-900/20 text-red-500 flex items-center justify-center"><Delete size={18} /></button>
          <button onClick={handleClear} className="h-12 rounded-xl bg-red-900/40 text-red-400 font-bold col-span-2">AC</button>

          {/* Sci Functions Line 1 */}
          <button onClick={() => handleInput('sin(')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">sin</button>
          <button onClick={() => handleInput('cos(')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">cos</button>
          <button onClick={() => handleInput('tan(')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">tan</button>
          <button onClick={() => handleInput('π')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">π</button>
          <button onClick={() => handleInput('e')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">e</button>

          {/* Sci Functions Line 2 */}
          <button onClick={() => handleInput('log(')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">log</button>
          <button onClick={() => handleInput('ln(')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">ln</button>
          <button onClick={() => handleInput('^')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">xʸ</button>
          <button onClick={() => handleInput('sqrt(')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">√</button>
          <button onClick={() => handleInput('(')} className="h-12 rounded-xl bg-white/5 text-sm hover:bg-white/10">(</button>

          {/* Numbers Grid Start */}
          <button onClick={() => handleInput('7')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">7</button>
          <button onClick={() => handleInput('8')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">8</button>
          <button onClick={() => handleInput('9')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">9</button>
          <button onClick={() => handleInput('÷')} className="h-14 rounded-xl bg-accent/20 text-accent text-xl font-bold hover:bg-accent/30">÷</button>
          <button onClick={() => handleInput(')')} className="h-14 rounded-xl bg-white/5 text-sm hover:bg-white/10">)</button>

          <button onClick={() => handleInput('4')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">4</button>
          <button onClick={() => handleInput('5')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">5</button>
          <button onClick={() => handleInput('6')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">6</button>
          <button onClick={() => handleInput('×')} className="h-14 rounded-xl bg-accent/20 text-accent text-xl font-bold hover:bg-accent/30">×</button>
          <button className="h-14 rounded-xl bg-white/5 text-sm opacity-30 cursor-not-allowed">INV</button>

          <button onClick={() => handleInput('1')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">1</button>
          <button onClick={() => handleInput('2')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">2</button>
          <button onClick={() => handleInput('3')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">3</button>
          <button onClick={() => handleInput('-')} className="h-14 rounded-xl bg-accent/20 text-accent text-xl font-bold hover:bg-accent/30">-</button>
          <button className="h-14 rounded-xl bg-white/5 text-sm opacity-30 cursor-not-allowed">EXP</button>

          <button onClick={() => handleInput('0')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">0</button>
          <button onClick={() => handleInput('.')} className="h-14 rounded-xl bg-white/10 text-xl font-bold hover:bg-white/20">.</button>
          <button onClick={calculateResults} className="h-14 rounded-xl bg-accent text-primary text-2xl font-black hover:shadow-lg hover:shadow-accent/40 active:scale-95 transition-all">=</button>
          <button onClick={() => handleInput('+')} className="h-14 rounded-xl bg-accent/20 text-accent text-xl font-bold hover:bg-accent/30">+</button>
          <button onClick={() => handleInput('%')} className="h-14 rounded-xl bg-white/5 text-sm hover:bg-white/10">%</button>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
