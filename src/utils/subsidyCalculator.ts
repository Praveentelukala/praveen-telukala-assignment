import { SubsidyBracket } from '../types';

export const subsidyBrackets: SubsidyBracket[] = [
  { minIncome: 0, maxIncome: 0, percentage: 50, label: 'Nil income' },
  { minIncome: 1, maxIncome: 25000, percentage: 40, label: 'Income up to ₹25,000' },
  { minIncome: 25001, maxIncome: 50000, percentage: 30, label: 'Income up to ₹50,000' },
  { minIncome: 50001, maxIncome: 75000, percentage: 20, label: 'Income up to ₹75,000' },
  { minIncome: 75001, maxIncome: 100000, percentage: 10, label: 'Income up to ₹1,00,000' },
];

export const calculateSubsidy = (income: number): { percentage: number; amount: number } => {
  const baseCost = 3000; // Base cost of LPG connection in INR
  
  for (const bracket of subsidyBrackets) {
    if (income >= bracket.minIncome && income <= bracket.maxIncome) {
      const amount = (baseCost * bracket.percentage) / 100;
      return { percentage: bracket.percentage, amount };
    }
  }
  
  return { percentage: 0, amount: 0 };
};

export const isEligible = (income: number): boolean => {
  return income <= 100000;
};