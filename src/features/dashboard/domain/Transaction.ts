import uniq from "lodash/uniq";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string; // ISO date string 
}

export function getUniqCategories(transactions: Transaction[]): string[] {
  return uniq(transactions.map((t) => t.category))
}