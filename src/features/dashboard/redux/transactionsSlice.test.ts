import { UnknownAction } from '@reduxjs/toolkit';
import * as actions from './transactionActions';
import { Transaction } from '../domain/Transaction';
import transactionsReducer, { initialState } from './transactionsSlice';

const emptyFilter = { category: '', startDate: '', endDate: '' };

describe('transactionsReducer', () => {
  test('should return the initial state', () => {
    expect(transactionsReducer(undefined, {} as UnknownAction)).toEqual(initialState);
  });

  test('should handle fetchTransactions/fulfilled', () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }];
    const action = { type: actions.fetchTransactions.fulfilled.type, payload: mockTransactions };
    const expectedState = { ...initialState, items: mockTransactions };
    expect(transactionsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle createTransaction/fulfilled', () => {
    const mockTransaction = { id: 1, category: 'Food', amount: 100 };
    const action = { type: actions.createTransaction.fulfilled.type, payload: mockTransaction };
    const expectedState = { ...initialState, items: [mockTransaction] };
    expect(transactionsReducer(initialState, action)).toEqual(expectedState);
  });


  test('should handle updateTransaction/fulfilled', () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }] as Transaction[];
    const updatedTransaction = { id: 1, category: 'Groceries', amount: 200 } as Transaction;
    const action = { type: actions.updateTransaction.fulfilled.type, payload: updatedTransaction };
    const expectedState = { ...initialState, items: [updatedTransaction] };
    expect(transactionsReducer({items: mockTransactions, filter: emptyFilter}, action)).toEqual(expectedState);
  });

  test('should handle updateTransaction/fulfilled with missing transaction', () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }] as Transaction[];
    const updatedTransaction = { id: 2, category: 'Groceries', amount: 200 } as Transaction;
    const action = { type: actions.updateTransaction.fulfilled.type, payload: updatedTransaction };
    const expectedState = { ...initialState, items: mockTransactions };
    expect(transactionsReducer({items: mockTransactions, filter: emptyFilter}, action)).toEqual(expectedState);
  });


  test('should handle deleteTransaction/fulfilled', () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }];
    const action = { type: actions.deleteTransaction.fulfilled.type, payload: mockTransactions[0] };
    const expectedState = { ...initialState, items: [] };
    expect(transactionsReducer(initialState, action)).toEqual(expectedState);
  });

  
  test('should handle deleteTransaction/fulfilled with missing element', () => {
    const mockTransactions = [{ id: 1, category: 'Food', amount: 100 }] as Transaction[];
    const missingTransaction = { id: 2, category: 'Groceries', amount: 200 };
    const action = { type: actions.deleteTransaction.fulfilled.type, payload: missingTransaction };
    const expectedState = { ...initialState, items: mockTransactions };
    expect(transactionsReducer({items: mockTransactions, filter: emptyFilter}, action)).toEqual(expectedState);
  });
});