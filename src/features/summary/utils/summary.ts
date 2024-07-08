import { Transaction } from "../../dashboard/domain/Transaction";

export function calculateTotal(transactions: Transaction[]): number {
  return transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
}

export function calculateTotalIncome(transactions: Transaction[]): number {
  return calculateTotal(transactions.filter((transaction) => transaction.type === 'income'))}

export function calculateTotalExpense(transactions: Transaction[]): number {
  return calculateTotal(transactions.filter((transaction) => transaction.type === 'expense'))}