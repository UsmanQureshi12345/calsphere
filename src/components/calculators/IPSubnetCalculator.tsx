
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function IPSubnetCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'ip-subnet')!;
  const [ip, setIp] = useState('192.168.1.1');
  const [mask, setMask] = useState(24);
  const [result, setResult] = useState({ network: '', hosts: 0 });

  useEffect(() => {
    // Very simplified CIDR calculation for UI display
    const hostCount = Math.pow(2, 32 - mask) - 2;
    setResult({ network: `${ip}/${mask}`, hosts: Math.max(0, hostCount) });
  }, [ip, mask]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Design and troubleshoot networks with ease. Our IP Subnet Calculator helps IT professionals determine network boundaries and host capacities based on CIDR notation."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">IP Address</label><input type="text" value={ip} onChange={e => setIp(e.target.value)} className="calculator-input font-mono" /></div>
          <div><label className="calculator-label">Subnet Mask (CIDR /n)</label><input type="number" min="0" max="32" value={mask} onChange={e => setMask(Number(e.target.value))} className="calculator-input" /></div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="result-box bg-slate-800 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Available Hosts</p>
                <div className="text-6xl font-black text-white">{result.hosts.toLocaleString()}</div>
                <p className="text-gray-400 mt-2 font-mono">{result.network}</p>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
