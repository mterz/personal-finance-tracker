import _ from "lodash";

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string; // ISO date string 
}

export function formatAmount(transaction: Transaction): string {
  return transaction.type === 'expense' ? `-${transaction.amount}` : `${transaction.amount}`
}

export function getUniqCategories(transactions: Transaction[]): string[] {
  return _.uniq(transactions.map((t) => t.category))
}