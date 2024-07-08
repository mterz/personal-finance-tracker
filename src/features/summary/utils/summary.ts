import { Transaction } from "../../dashboard/domain/Transaction";

/**
 * Adds up all the transactions. The `expense` transactions are subtracted from the total.
 */
export function calculateTotal(transactions: Transaction[]): number {
  return transactions.reduce((acc, transaction) => {
    return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
  }, 0);
}

export function calculateTotalIncome(transactions: Transaction[]): number {
  return calculateTotal(transactions.filter((transaction) => transaction.type === 'income'))}

export function calculateTotalExpense(transactions: Transaction[]): number {
  return calculateTotal(transactions.filter((transaction) => transaction.type === 'expense'))}