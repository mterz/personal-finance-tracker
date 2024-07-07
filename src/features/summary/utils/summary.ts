import { Transaction } from "../../dashboard/domain/Transaction";

export function calculateTotal(transactions: Transaction[]): number {
  return transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
  }, 0);
}

export function calculateTotalByCategory(
  transactions: Transaction[],
  category: string
): number {
  return transactions
    .filter((transaction) => transaction.category === category)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
}

export function calculateTotalIncome(transactions: Transaction[]): number {
  return calculateTotal(transactions.filter((transaction) => transaction.type === 'income'))}

export function calculateTotalExpense(transactions: Transaction[]): number {
  return calculateTotal(transactions.filter((transaction) => transaction.type === 'expense'))}