import { Transaction } from "./domain/Transaction";

export const transactionsApi = {
  fetchTransactions: async (): Promise<Transaction[]> => {
    const response = await fetch('localhost:8000/transactions');
    return response.json();
  },
  createTransaction: async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch('localhost:8000/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
    return response.json();
  },
  updateTransaction: async (transaction: Transaction): Promise<Transaction> => {
    const response = await fetch(`localhost:8000/transactions/${transaction.id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    });
    return response.json();
  },
  deleteTransaction: async (transaction: Transaction): Promise<void> => {
    const response = await fetch(`localhost:8000/transactions/${transaction.id}`, {
      method: 'DELETE',
    });
    return response.json();
  }
}