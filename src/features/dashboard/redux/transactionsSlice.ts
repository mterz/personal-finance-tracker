import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../store/types'
import { Transaction } from '../domain/Transaction'
import { fetchTransactions, createTransaction, updateTransaction, deleteTransaction } from './transactionActions'
import { Filter } from '../domain/Filter'

export interface TransactionsState {
  items: Transaction[]
  filter: Filter
}

export const initialState: TransactionsState = {
  items: [],
  filter: {
    category: '',
    startDate: '',
    endDate: ''
  }
}

export const selectTransactionsFilter = (state: RootState) => state.transactions.filter;  
export const selectTransactions = (state: RootState) => state.transactions.items;

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    changeCategoryFilter: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload
    },
    changeStartDateFilter: (state, action: PayloadAction<string>) => {
      state.filter.startDate = action.payload
    },
    changeEndDateFilter: (state, action: PayloadAction<string>) => {
      state.filter.endDate = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.items = action.payload
    }).addCase(createTransaction.fulfilled, (state, action) => {
      state.items.push(action.payload)
    }).addCase(updateTransaction.fulfilled, (state, action) => {
      const updatedTransaction = action.payload
      const index = state.items.findIndex((t) => t.id === updatedTransaction.id)
      if (index !== -1) {
        state.items[index] = updatedTransaction
      }
    }).addCase(deleteTransaction.fulfilled, (state, action) => {
      const newItems = state.items.filter((t) => t.id !== action.payload.id);
      state.items = newItems;
    })
  }
})

export const { changeCategoryFilter, changeStartDateFilter, changeEndDateFilter } = transactionsSlice.actions

export default transactionsSlice.reducer