import { Transaction } from "./domain/Transaction";

export type CreateTransactionVO = Omit<Transaction, "id" | "date">;
export type UpdateTransactionVO = Omit<Transaction, "date">;

export const transactionsApi = {
  fetchTransactions: async (): Promise<Transaction[]> => {
    const response = await fetch('http://localhost:8000/transactions');
    return response.json();
  },
  createTransaction: async (transaction: CreateTransactionVO): Promise<Transaction> => {
    const response = await fetch('http://localhost:8000/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  updateTransaction: async (transaction: UpdateTransactionVO): Promise<Transaction> => {
    const response = await fetch(`http://localhost:8000/transactions/${transaction.id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  deleteTransaction: async (transaction: Transaction): Promise<void> => {
    const response = await fetch(`http://localhost:8000/transactions/${transaction.id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
}