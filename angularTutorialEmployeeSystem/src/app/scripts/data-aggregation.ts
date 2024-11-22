import { Employee } from '../model/Employee';

export interface GraphData {
  labels: (string | number | Date)[];
  rawData: number[];
}

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
  console.dir(data);
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
