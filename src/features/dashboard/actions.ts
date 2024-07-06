import { createAsyncThunk } from "../../store/store";
import { Transaction } from "./domain/Transaction";
import { transactionsApi } from "./transactionsApi";

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (): Promise<Transaction[]> => {
    const response = await transactionsApi.fetchTransactions();
    return response
  }
)

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction: Transaction) => {
    const response = await transactionsApi.createTransaction(transaction);
    return response
  }
)

export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async (transaction: Transaction) => {
    const response = await transactionsApi.updateTransaction(transaction);
    return response
  }
)

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transaction: Transaction) => {
    const response = await transactionsApi.deleteTransaction(transaction);
    return response
  }
) 