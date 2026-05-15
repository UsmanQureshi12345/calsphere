
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function WeatherCalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'wind-chill-heat-index')!;
  const [temp, setTemp] = useState(25);
  const [wind, setWind] = useState(10);
  const [humidity, setHumidity] = useState(50);
  const [feelsLike, setFeelsLike] = useState(0);

  useEffect(() => {
    // Simplified feels-like (Heat index for hot, Wind chill for cold)
    if (temp >= 15) {
       // Heat Index approx
       setFeelsLike(temp + (0.55 * ( (humidity/100) * (temp - 14.5) )));
    } else {
       // Wind Chill approx
       setFeelsLike(13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16));
    }
  }, [temp, wind, humidity]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="The thermometer doesn't always tell the whole story. Our Weather Calculator computes Wind Chill for cold days and Heat Index for hot ones to tell you what the temperature actually 'feels like' to the human body."
    >
      <div className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div><label className="calculator-label">Air Temperature (°C)</label><input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} className="calculator-input" /></div>
          <div className="grid grid-cols-2 gap-4">
               <div><label className="calculator-label">Wind Speed (km/h)</label><input type="number" value={wind} onChange={e => setWind(Number(e.target.value))} className="calculator-input" /></div>
               <div><label className="calculator-label">Humidity (%)</label><input type="number" value={humidity} onChange={e => setHumidity(Number(e.target.value))} className="calculator-input" /></div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className={`result-box text-center ${temp > 20 ? 'bg-orange-600' : 'bg-sky-600'}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-[#f8f9fa] opacity-60 mb-2">Feels Like</p>
                <div className="text-7xl font-black text-white">{feelsLike.toFixed(1)}°C</div>
            </div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
