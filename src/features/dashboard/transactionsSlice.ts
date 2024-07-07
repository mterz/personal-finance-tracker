import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store/types'
import { Transaction } from './domain/Transaction'
import { fetchTransactions, createTransaction, updateTransaction, deleteTransaction } from './actions'

export interface TransactionsState {
  items: Transaction[]
}

const initialState: TransactionsState = {
  items: [],
}

export const selectTransactions = (state: RootState) => state.transactions.items;

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
      const newItems = state.items.filter((t) => t.id !== action.meta.arg.id);
      state.items = newItems;
    })
  }
})

export default transactionsSlice.reducer