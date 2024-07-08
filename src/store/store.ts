import { configureStore,  } from '@reduxjs/toolkit'
import transactionsReducer from '../features/dashboard/redux/transactionsSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
})

