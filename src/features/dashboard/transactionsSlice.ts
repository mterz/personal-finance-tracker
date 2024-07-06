import { createSlice } from '@reduxjs/toolkit'
import { Transaction } from './domain/Transaction'
import { transactionsApi } from './transactionsApi'
import { createAsyncThunk, RootState } from '../../store/types'

export interface TransactionsState {
  items: Transaction[]
}

const initialState: TransactionsState = {
  items: [],
}

export const selectTransactions = (state: RootState) => state.transactions.items;

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

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.items = action.payload
    }).addCase(createTransaction.fulfilled, (state, action) => {
      state.items.push(action.payload)
    }).addCase(updateTransaction.fulfilled, (state, action) => {
      const updatedTransaction = action.payload
      const index = state.items.findIndex((t) => t.id === updatedTransaction.id)
      state.items[index] = updatedTransaction
    }).addCase(deleteTransaction.fulfilled, (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.meta.arg.id)
    })
  }
})

export default transactionsSlice.reducer