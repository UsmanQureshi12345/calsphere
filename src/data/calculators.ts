
export interface CalculatorMetadata {
  id: string;
  name: string;
  category: string;
  description: string;
  keywords: string[];
  path: string;
}

export const CATEGORIES = [
  { id: 'financial', name: 'Financial', icon: 'DollarSign' },
  { id: 'fitness', name: 'Fitness & Health', icon: 'Activity' },
  { id: 'math', name: 'Math', icon: 'Percent' },
  { id: 'datetime', name: 'Date & Time', icon: 'Clock' },
  { id: 'everyday', name: 'Everyday Tools', icon: 'Tool' },
  { id: 'science', name: 'Science & Engineering', icon: 'Zap' },
];

export const CALCULATORS: CalculatorMetadata[] = [
  // FINANCIAL
  { id: 'mortgage', name: 'Mortgage Calculator', category: 'financial', description: 'Calculate monthly mortgage payments, including interest, taxes, and amortization schedules.', keywords: ['mortgage', 'payment', 'loans'], path: '/financial/mortgage' },
  { id: 'loan', name: 'Loan Calculator', category: 'financial', description: 'Estimate monthly payments and total interest for personal or general loans.', keywords: ['loan', 'interest', 'payments'], path: '/financial/loan' },
  { id: 'auto-loan', name: 'Auto Loan Calculator', category: 'financial', description: 'Determine car financing costs with down payments, trade-ins, and tax rates.', keywords: ['car loan', 'auto financing'], path: '/financial/auto-loan' },
  { id: 'compound-interest', name: 'Compound Interest Calculator', category: 'financial', description: 'Calculate growth over time with daily, monthly, or annual compounding frequencies.', keywords: ['compound', 'interest', 'savings'], path: '/financial/compound-interest' },
  { id: 'simple-interest', name: 'Simple Interest Calculator', category: 'financial', description: 'Quickly calculate interest earned or paid on a principal amount.', keywords: ['simple', 'interest'], path: '/financial/simple-interest' },
  { id: 'investment', name: 'Investment Calculator', category: 'financial', description: 'Project the future value of your investments with regular contributions.', keywords: ['investment', 'roi', 'future value'], path: '/financial/investment' },
  { id: 'retirement', name: 'Retirement Calculator', category: 'financial', description: 'Plan your retirement savings goal and estimate monthly withdrawals.', keywords: ['retirement', '401k', 'pension'], path: '/financial/retirement' },
  { id: 'savings', name: 'Savings Calculator', category: 'financial', description: 'Create a goal-based savings plan to reach your financial milestones.', keywords: ['savings', 'goal', 'budget'], path: '/financial/savings' },
  { id: 'inflation', name: 'Inflation Calculator', category: 'financial', description: 'See how purchasing power changes over time based on inflation rates.', keywords: ['inflation', 'cpi', 'purchasing power'], path: '/financial/inflation' },
  { id: 'salary', name: 'Salary Calculator', category: 'financial', description: 'Convert between hourly, weekly, monthly, and annual salary rates.', keywords: ['salary', 'wages', 'income'], path: '/financial/salary' },
  { id: 'sales-tax', name: 'Sales Tax Calculator', category: 'financial', description: 'Add or remove sales tax from any price with custom rate options.', keywords: ['tax', 'sales tax', 'vat'], path: '/financial/sales-tax' },
  { id: 'income-tax', name: 'Income Tax Estimator', category: 'financial', description: 'Estimate your US federal income tax based on current tax brackets.', keywords: ['income tax', 'irs', 'brackets'], path: '/financial/income-tax' },
  { id: 'tip', name: 'Tip Calculator', category: 'financial', description: 'Quickly split bills and calculate tips for groups or individuals.', keywords: ['tip', 'bill split', 'restaurant'], path: '/financial/tip' },
  { id: 'currency', name: 'Currency Converter', category: 'financial', description: 'Convert between major world currencies (static historical rates).', keywords: ['exchange rate', 'forex', 'money'], path: '/financial/currency' },
  { id: 'roi', name: 'ROI Calculator', category: 'financial', description: 'Calculate the return on investment for any business or personal project.', keywords: ['roi', 'profit', 'margin'], path: '/financial/roi' },

  // FITNESS
  { id: 'bmi', name: 'BMI Calculator', category: 'fitness', description: 'Calculate Body Mass Index using metric or imperial units.', keywords: ['bmi', 'weight', 'health'], path: '/fitness/bmi' },
  { id: 'calorie', name: 'Calorie Calculator', category: 'fitness', description: 'Estimate daily calorie needs based on activity and goals.', keywords: ['calories', 'tdee', 'diet'], path: '/fitness/calorie' },
  { id: 'body-fat', name: 'Body Fat Calculator', category: 'fitness', description: 'Estimate body fat percentage using US Navy measurements.', keywords: ['body fat', 'navy method'], path: '/fitness/body-fat' },
  { id: 'bmr', name: 'BMR Calculator', category: 'fitness', description: 'Calculate Basal Metabolic Rate using precision formulas.', keywords: ['bmr', 'metabolism'], path: '/fitness/bmr' },
  { id: 'ideal-weight', name: 'Ideal Weight Calculator', category: 'fitness', description: 'Find your target weight range based on multiple medical formulas.', keywords: ['ideal weight', 'target weight'], path: '/fitness/ideal-weight' },
  { id: 'pace', name: 'Pace Calculator', category: 'fitness', description: 'Calculate running pace, race times, and distance splits.', keywords: ['running', 'pace', 'marathon'], path: '/fitness/pace' },
  { id: 'due-date', name: 'Due Date Calculator', category: 'fitness', description: 'Estimate pregnancy due date using Naegele’s rule.', keywords: ['pregnancy', 'due date', 'baby'], path: '/fitness/due-date' },
  { id: 'pregnancy-week', name: 'Pregnancy Week Calculator', category: 'fitness', description: 'Track pregnancy progress week-by-week from LMP.', keywords: ['pregnancy tracker', 'weeks'], path: '/fitness/pregnancy-week' },
  { id: 'ovulation', name: 'Ovulation Calculator', category: 'fitness', description: 'Predict fertile windows and ovulation dates.', keywords: ['ovulation', 'fertility'], path: '/fitness/ovulation' },
  { id: 'water', name: 'Water Intake Calculator', category: 'fitness', description: 'Determine daily hydration needs based on weight and activity.', keywords: ['water', 'hydration'], path: '/fitness/water' },

  // MATH
  { id: 'scientific', name: 'Scientific Calculator', category: 'math', description: 'Full-featured calculator with trig, log, and advanced functions.', keywords: ['scientific', 'math', 'sin cos tan'], path: '/math/scientific' },
  { id: 'fraction', name: 'Fraction Calculator', category: 'math', description: 'Add, subtract, multiply, and divide fractions easily.', keywords: ['fractions', 'math'], path: '/math/fraction' },
  { id: 'percentage', name: 'Percentage Calculator', category: 'math', description: 'Calculate percentages, % change, and proportion values.', keywords: ['percent', 'math'], path: '/math/percentage' },
  { id: 'std-dev', name: 'Standard Deviation Calculator', category: 'math', description: 'Calculate mean, variance, and standard deviation for datasets.', keywords: ['statistics', 'std dev'], path: '/math/std-dev' },
  { id: 'triangle', name: 'Triangle Calculator', category: 'math', description: 'Solve sides, angles, and area for any triangle.', keywords: ['geometry', 'triangle'], path: '/math/triangle' },
  { id: 'random', name: 'Random Number Generator', category: 'math', description: 'Generate true random numbers within custom ranges.', keywords: ['random', 'numbers'], path: '/math/random' },
  { id: 'gcd-lcm', name: 'GCD / LCM Calculator', category: 'math', description: 'Find greatest common divisor and least common multiple.', keywords: ['gcd', 'lcm'], path: '/math/gcd-lcm' },
  { id: 'prime', name: 'Prime Factorization Calculator', category: 'math', description: 'Break down any number into its prime factors.', keywords: ['prime', 'factors'], path: '/math/prime' },
  { id: 'quadratic', name: 'Quadratic Equation Solver', category: 'math', description: 'Solve for x in quadratic equations ax² + bx + c = 0.', keywords: ['algebra', 'quadratic'], path: '/math/quadratic' },
  { id: 'matrix', name: 'Matrix Calculator', category: 'math', description: 'Perform matrix addition, multiplication, and determinants.', keywords: ['matrix', 'linear algebra'], path: '/math/matrix' },
  { id: 'probability', name: 'Probability Calculator', category: 'math', description: 'Calculate odds, combinations, and permutations.', keywords: ['probability', 'odds'], path: '/math/probability' },
  { id: 'base-converter', name: 'Number Base Converter', category: 'math', description: 'Convert between decimal, binary, hex, and octal.', keywords: ['binary', 'hex', 'base'], path: '/math/base-converter' },

  // DATE & TIME
  { id: 'age', name: 'Age Calculator', category: 'datetime', description: 'Calculate exact age in years, months, and days.', keywords: ['age', 'birthday'], path: '/datetime/age' },
  { id: 'date-diff', name: 'Date Difference Calculator', category: 'datetime', description: 'Calculate time duration between two specific dates.', keywords: ['date difference', 'days between'], path: '/datetime/date-diff' },
  { id: 'date-add', name: 'Date Add/Subtract Calculator', category: 'datetime', description: 'Add or subtract days, weeks, or months from a date.', keywords: ['date calculator', 'add days'], path: '/datetime/date-add' },
  { id: 'time', name: 'Time Calculator', category: 'datetime', description: 'Add or subtract hours, minutes, and seconds.', keywords: ['time add', 'duration'], path: '/datetime/time' },
  { id: 'hours', name: 'Hours Calculator', category: 'datetime', description: 'Calculate work hours with lunch break deductions.', keywords: ['hours worked', 'timesheet'], path: '/datetime/hours' },
  { id: 'countdown', name: 'Countdown Timer', category: 'datetime', description: 'Create a live countdown to any future date or event.', keywords: ['countdown', 'timer'], path: '/datetime/countdown' },
  { id: 'day-of-week', name: 'Day of Week Calculator', category: 'datetime', description: 'Find out what day of the week a date was or will be.', keywords: ['day of week', 'calendar'], path: '/datetime/day-of-week' },
  { id: 'work-days', name: 'Work Days Calculator', category: 'datetime', description: 'Count business days excluding weekends and holidays.', keywords: ['business days', 'working days'], path: '/datetime/work-days' },

  // EVERYDAY
  { id: 'unit-converter', name: 'Unit Conversion Calculator', category: 'everyday', description: 'Convert between length, weight, volume, and more.', keywords: ['units', 'conversion'], path: '/everyday/unit-converter' },
  { id: 'gpa', name: 'GPA Calculator', category: 'everyday', description: 'Calculate semester and cumulative balance GPA.', keywords: ['gpa', 'grades'], path: '/everyday/gpa' },
  { id: 'grade', name: 'Grade Calculator', category: 'everyday', description: 'Calculate weighted grades and final exam requirements.', keywords: ['grade', 'test score'], path: '/everyday/grade' },
  { id: 'concrete', name: 'Concrete Calculator', category: 'everyday', description: 'Estimate concrete volume for slabs, footings, and columns.', keywords: ['concrete', 'construction'], path: '/everyday/concrete' },
  { id: 'tile', name: 'Tile / Flooring Calculator', category: 'everyday', description: 'Calculate required flooring materials with waste margins.', keywords: ['tile', 'flooring'], path: '/everyday/tile' },
  { id: 'paint', name: 'Paint Calculator', category: 'everyday', description: 'Estimate paint needed for a room based on area.', keywords: ['paint', 'renovation'], path: '/everyday/paint' },
  { id: 'fuel', name: 'Fuel Cost Calculator', category: 'everyday', description: 'Calculate trip fuel costs and vehicle economy.', keywords: ['fuel', 'gas cost'], path: '/everyday/fuel' },
  { id: 'password', name: 'Password Generator', category: 'everyday', description: 'Generate secure, random passwords with custom rules.', keywords: ['password', 'security'], path: '/everyday/password' },

  // SCIENCE
  { id: 'subnet', name: 'IP Subnet Calculator', category: 'science', description: 'Calculate CIDR, subnet masks, and IP ranges.', keywords: ['subnet', 'networking', 'ip'], path: '/science/subnet' },
  { id: 'ohm', name: 'Ohm’s Law Calculator', category: 'science', description: 'Solve for voltage, current, resistance, and power.', keywords: ['ohms law', 'electricity'], path: '/science/ohm' },
  { id: 'half-life', name: 'Half-Life Calculator', category: 'science', description: 'Calculate radioactive decay and isotope remaining life.', keywords: ['half life', 'decay'], path: '/science/half-life' },
  { id: 'speed-distance-time', name: 'Speed / Distance / Time Calculator', category: 'science', description: 'Calculate motion parameters for any trip.', keywords: ['physics', 'speed'], path: '/science/speed-distance-time' },
  { id: 'force', name: 'Force / Mass / Acceleration Calculator', category: 'science', description: 'Apply Newton’s 2nd Law (F = ma).', keywords: ['physics', 'force'], path: '/science/force' },
  { id: 'energy', name: 'Energy / Power Calculator', category: 'science', description: 'Convert between watts, joules, and kWh.', keywords: ['energy', 'power'], path: '/science/energy' },
  { id: 'weather', name: 'Wind Chill / Heat Index Calculator', category: 'science', description: 'Calculate perceived temperature based on humidity or wind.', keywords: ['weather', 'heat index', 'wind chill'], path: '/science/weather' },
];
