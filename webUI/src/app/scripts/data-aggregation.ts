import { isThisWeek } from 'date-fns';
import { CompanyTitle } from '../model/CompanyTitle';
import { Employee } from '../model/Employee';

/**
 * Should calculate number of occurances of a given property's value in an employee. For example:
 * One can see how many employees work at 'amazon'
 * calculateBasicDistribution(employees, 'company')
 * @param array of employees
 * @param property key of employee
 * @returns labels: ['Amazon', 'Google'], rawData: [5, 3]
 */
export function calculateBasicDistribution<T extends keyof Employee>(
  employees: Employee[],
  property: T
): GraphData {
  let freqMap = new Map<string | number | Date, number>();
  employees.forEach((employee) => {
    let val = employee[property];
    let count = freqMap.get(val) ?? 0;
    freqMap.set(val, count + 1);
  });
  let data: GraphData = {
    labels: Array.from(freqMap.keys()),
    rawData: Array.from(freqMap.values()),
  };
  return data;
}

/**
 * Calculates employees age and totals the number of people per age group
 * @param employees[]
 * @returns labels: ['<25', '25-34', '35-44', '45+'], rawData: [5, 3, 8, 1]
 */

export function calculateAgeDistribution(employees: Employee[]): GraphData {
  let frequencyMap = new Map<string, number>();

  employees.forEach((employee) => {
    let age = calculateAge(employee.dateOfBirth);
    if (age < 25) {
      frequencyMap.set('<25', (frequencyMap.get('<25') ?? 0) + 1);
    } else if (age >= 25 && age < 35) {
      frequencyMap.set('25-34', (frequencyMap.get('25-34') ?? 0) + 1);
    } else if (age >= 35 && age < 45) {
      frequencyMap.set('35-44', (frequencyMap.get('35-44') ?? 0) + 1);
    } else {
      frequencyMap.set('45+', (frequencyMap.get('45+') ?? 0) + 1);
    }
  });
  let data: GraphData = {
    labels: Array.from(frequencyMap.keys()),
    rawData: Array.from(frequencyMap.values()),
  };
  return data;
}

function calculateAge(dob: Date): number {
  let dobDate = new Date(dob);
  let yrs = dobDate.getFullYear();
  let today = new Date();
  let todayYears = today.getFullYear();
  let age = todayYears - yrs;
  return today.getMonth() < dobDate.getMonth() ? age - 1 : age;
}

/**
 * Provides distribution of employees by years of experience
 * @param employees
 * @returns labels: ['<2', '2-4', '5-9', '10+'], rawData: [5, 3, 8, 1]
 */
export function calculateYearsOfExperienceDistribution(
  employees: Employee[]
): GraphData {
  const experienceBrackets = [
    { label: '<2', test: (exp: number) => exp < 2 },
    { label: '2-4', test: (exp: number) => exp >= 2 && exp < 5 },
    { label: '5-9', test: (exp: number) => exp >= 5 && exp < 10 },
    { label: '10+', test: (exp: number) => exp >= 10 },
  ];

  const frequencyMap = new Map<string, number>();
  // Initialize all brackets with 0
  experienceBrackets.forEach((bracket) => frequencyMap.set(bracket.label, 0));

  employees.forEach((employee) => {
    const bracket = experienceBrackets.find((b) =>
      b.test(employee.yearsOfExperience)
    );
    if (bracket) {
      frequencyMap.set(
        bracket.label,
        (frequencyMap.get(bracket.label) ?? 0) + 1
      );
    }
  });

  let data: GraphData = {
    labels: Array.from(frequencyMap.keys()),
    rawData: Array.from(frequencyMap.values()),
  };
  return data;
}

/**
 * Provides distribution of employees by salary
 * @param employees
 * @returns \{labels: rawData:}
 */
export function calculateSalaryDistribution(employees: Employee[]): GraphData {
  const experienceBrackets = [
    { label: '<40,000', test: (exp: number) => exp < 40000 },
    {
      label: '40,000-60,000',
      test: (exp: number) => exp >= 40000 && exp < 60000,
    },
    {
      label: '60,000-100,000',
      test: (exp: number) => exp >= 60000 && exp < 100000,
    },
    {
      label: '100,000-200,000',
      test: (exp: number) => exp >= 100000 && exp < 200000,
    },
    { label: '200,000+', test: (exp: number) => exp >= 200000 },
  ];

  const frequencyMap = new Map<string, number>();
  // Initialize all brackets with 0
  experienceBrackets.forEach((bracket) => frequencyMap.set(bracket.label, 0));

  employees.forEach((employee) => {
    const bracket = experienceBrackets.find((b) => b.test(employee.salary));
    if (bracket) {
      frequencyMap.set(
        bracket.label,
        (frequencyMap.get(bracket.label) ?? 0) + 1
      );
    }
  });

  let data: GraphData = {
    labels: Array.from(frequencyMap.keys()),
    rawData: Array.from(frequencyMap.values()),
  };

  return data;
}

/**
 * Ranks companies by Property
 */
function rankCompaniesByProperty(
  employees: Employee[],
  property: keyof Employee,
  roundTo: number = 100
): AggregateInfo[] {
  // Reduce the employees array to a salary map (mapping compnay by total salary and num employees)
  const salaryMap = employees.reduce((map, currEmployee) => {
    const current = map.get(currEmployee.company) ?? {
      total: 0,
      count: 0,
    };
    map.set(currEmployee.company, {
      total: current.total + (currEmployee[property] as number),
      count: current.count + 1,
    });
    return map;
  }, new Map<CompanyTitle, { total: number; count: number }>());

  // iterate through map and extract averages
  return Array.from(salaryMap)
    .map(([company, { total: totalSalary, count }]): AggregateInfo => {
      return {
        company: company,
        average: Math.round(totalSalary / count / roundTo) * roundTo, // rounded to nearest 100
      };
    })
    .sort((a, b) => b.average - a.average); // sort the average salaries in descending order
}

export function rankCompaniesBySalary(employees: Employee[]): AggregateInfo[] {
  return rankCompaniesByProperty(employees, 'salary', 100);
}

export function rankCompaniesByExperience(
  employees: Employee[]
): AggregateInfo[] {
  return rankCompaniesByProperty(employees, 'yearsOfExperience', 1);
}

/**
 * Gets a list of employees who's birthdays fall within the provided time period
 * @param employees
 * @param timePeriod
 * @returns list of employees
 */
export function findBirthdaysThisTimePeriod(
  employees: Employee[],
  timePeriod: TimePeriod
): Employee[] {
  let today = new Date();
  switch (timePeriod) {
    case 'DAY':
      return employees.filter((e) => {
        let eDob = new Date(e.dateOfBirth);
        return (
          eDob.getDate() === today.getDate() &&
          eDob.getMonth() === today.getMonth()
        );
      });
    case 'WEEK':
      return employees.filter((e) => {
        let eDob = new Date(e.dateOfBirth);
        return isThisWeek(
          new Date(today.getFullYear(), eDob.getMonth(), eDob.getDate())
        );
      });
    case 'MONTH':
      return employees.filter((e) => {
        let eDob = new Date(e.dateOfBirth);
        return eDob.getMonth() === today.getMonth();
      });
    default:
      throw new Error(`Unsupported time period: ${timePeriod}`);
  }
}

export interface GraphData {
  labels: (string | number | Date)[];
  rawData: number[];
}

export type TimePeriod = 'DAY' | 'WEEK' | 'MONTH';

export type AggregateInfo = {
  company: CompanyTitle;
  average: number;
};
