
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function PasswordGenerator() {
  const metadata = CALCULATORS.find(c => c.id === 'password-generator')!;
  const [length, setLength] = useState(16);
  const [chars, setChars] = useState({ upper: true, lower: true, nums: true, syms: true });
  const [pass, setPass] = useState('');

  const generate = () => {
    let pool = '';
    if (chars.upper) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.lower) pool += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.nums) pool += '0123456789';
    if (chars.syms) pool += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let res = '';
    for (let i = 0; i < length; i++) {
        res += pool.charAt(Math.floor(Math.random() * pool.length));
    }
    setPass(res);
  };

  useEffect(generate, [length, chars]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Security begins with complexity. Our Password Generator creates random, high-entropy strings locally in your browser, ensuring no one—not even us—sees your credentials."
    >
      <div className="p-8 lg:p-12 space-y-8">
        <div className="block bg-gray-900 p-8 rounded-3xl text-center shadow-2xl">
             <div className="text-2xl md:text-4xl font-mono text-accent break-all mb-6">{pass || 'Generating...'}</div>
             <button onClick={generate} className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors uppercase text-sm tracking-widest">New Password</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
             <div><label className="calculator-label">Length: {length}</label><input type="range" min="8" max="64" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-accent" /></div>
             <div className="flex items-center space-x-2"><input type="checkbox" checked={chars.upper} onChange={e => setChars({...chars, upper: e.target.checked})} /> <label className="text-sm font-bold">ABC</label></div>
             <div className="flex items-center space-x-2"><input type="checkbox" checked={chars.lower} onChange={e => setChars({...chars, lower: e.target.checked})} /> <label className="text-sm font-bold">abc</label></div>
             <div className="flex items-center space-x-2"><input type="checkbox" checked={chars.nums} onChange={e => setChars({...chars, nums: e.target.checked})} /> <label className="text-sm font-bold">123</label></div>
             <div className="flex items-center space-x-2"><input type="checkbox" checked={chars.syms} onChange={e => setChars({...chars, syms: e.target.checked})} /> <label className="text-sm font-bold">!#@</label></div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
