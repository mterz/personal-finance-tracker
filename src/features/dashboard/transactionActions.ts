import { createAsyncThunk } from "../../store/types";
import { Transaction } from "./domain/Transaction";
import { CreateTransactionVO, transactionsApi } from "./transactionsApi";

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (): Promise<Transaction[]> => {
    const response = await transactionsApi.fetchTransactions();
    return response
  }
)

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transaction: CreateTransactionVO) => {
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
    await transactionsApi.deleteTransaction(transaction);
    return transaction;
  }
) 