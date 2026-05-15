
import React, { useState, useEffect } from 'react';
import CalculatorTemplate from '../CalculatorTemplate';
import { CALCULATORS } from '../../data/calculators';

export default function GPACalculator() {
  const metadata = CALCULATORS.find(c => c.id === 'gpa')!;
  const [courses, setCourses] = useState([{ grade: 4, credits: 3 }, { grade: 3, credits: 3 }]);
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
    const totalPoints = courses.reduce((sum, c) => sum + (c.grade * c.credits), 0);
    setGpa(totalCredits > 0 ? totalPoints / totalCredits : 0);
  }, [courses]);

  return (
    <CalculatorTemplate
      metadata={metadata}
      introduction="Track your academic success. Our GPA calculator makes it easy to see where you stand, whether you're using a standard 4.0 scale or specific weighted credits."
    >
      <div className="p-8 lg:p-12 space-y-6">
        {courses.map((c, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 items-end">
             <div><label className="calculator-label">Grade (0-4)</label><input type="number" step="0.1" value={c.grade} onChange={e => {
                 const newC = [...courses];
                 newC[i].grade = Number(e.target.value);
                 setCourses(newC);
             }} className="calculator-input" /></div>
             <div><label className="calculator-label">Credits</label><input type="number" value={c.credits} onChange={e => {
                 const newC = [...courses];
                 newC[i].credits = Number(e.target.value);
                 setCourses(newC);
             }} className="calculator-input" /></div>
          </div>
        ))}
        <button className="text-accent font-bold uppercase text-sm" onClick={() => setCourses([...courses, { grade: 4, credits: 3 }])}>+ Add Course</button>
        <div className="result-box bg-primary text-center">
             <p className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf] mb-2">Calculated GPA</p>
             <div className="text-6xl font-black">{gpa.toFixed(2)}</div>
        </div>
      </div>
    </CalculatorTemplate>
  );
}
