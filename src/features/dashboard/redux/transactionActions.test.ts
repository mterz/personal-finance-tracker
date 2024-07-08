import { configureStore } from '@reduxjs/toolkit';
import { Transaction } from '../domain/Transaction';
import { createTransaction, deleteTransaction, fetchTransactions, updateTransaction } from './transactionActions';
import { transactionsApi } from '../transactionsApi';
import transactionsReducer from './transactionsSlice';
import { recordActionsMiddleware } from '../../../utils/test/recordActionsMiddleware';


jest.mock('../transactionsApi', () => ({
  transactionsApi: {
    fetchTransactions: jest.fn(),
    createTransaction: jest.fn().mockImplementation((transaction: Transaction) => Promise.resolve(transaction)),
    updateTransaction: jest.fn().mockImplementation((transaction: Transaction) => Promise.resolve(transaction)), 
    deleteTransaction: jest.fn()
  }
}));

describe('fetchTransactions action', () => {
  let api: jest.Mocked<typeof transactionsApi>;
  let store: ReturnType<typeof configureStore>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recordedActions: any[]; // This will be used to access the recorded actions

  beforeEach(() => {
    api = transactionsApi as jest.Mocked<typeof transactionsApi>;
    const { middleware, actions } = recordActionsMiddleware();
    recordedActions = actions; // Store reference to the actions array
    store = configureStore({
      reducer: {
        transactions: transactionsReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
    });
  });

  afterAll(() => {
    jest.unmock('../transactionsApi');
  });

  test('fetchTransactions action', async () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }] as Transaction[];
    api.fetchTransactions.mockResolvedValue(mockTransactions);

    // This is just to bypass TypeScript errors, not recommended for thunk actions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(fetchTransactions() as any);

    expect(recordedActions[0].type).toBe('transactions/fetchTransactions/pending');
    expect(recordedActions[1].type).toBe('transactions/fetchTransactions/fulfilled');
    expect(recordedActions[1].payload).toEqual(mockTransactions);
  });

  test('createTransaction action', async () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }] as Transaction[];
    api.fetchTransactions.mockResolvedValue(mockTransactions);

    // This is just to bypass TypeScript errors, not recommended for thunk actions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(createTransaction(mockTransactions[0]) as any);

    expect(recordedActions[0].type).toBe('transactions/createTransaction/pending');
    expect(recordedActions[1].type).toBe('transactions/createTransaction/fulfilled');
    expect(recordedActions[1].payload).toEqual(mockTransactions[0]);
  });

  test('updateTransaction action', async () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }] as Transaction[];
    api.fetchTransactions.mockResolvedValue(mockTransactions);

    // This is just to bypass TypeScript errors, not recommended for thunk actions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(updateTransaction(mockTransactions[0]) as any);

    expect(recordedActions[0].type).toBe('transactions/updateTransaction/pending');
    expect(recordedActions[1].type).toBe('transactions/updateTransaction/fulfilled');
    expect(recordedActions[1].payload).toEqual(mockTransactions[0]);
  });

  test('deleteTransaction action', async () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }] as Transaction[];
    api.fetchTransactions.mockResolvedValue(mockTransactions);

    // This is just to bypass TypeScript errors, not recommended for thunk actions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await store.dispatch(deleteTransaction(mockTransactions[0]) as any);

    expect(recordedActions[0].type).toBe('transactions/deleteTransaction/pending');
    expect(recordedActions[1].type).toBe('transactions/deleteTransaction/fulfilled');
    expect(recordedActions[1].payload).toEqual(mockTransactions[0]);
  });
});