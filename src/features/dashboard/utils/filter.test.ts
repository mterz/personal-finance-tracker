import { Filter } from '../domain/Filter';
import { Transaction } from "../domain/Transaction";
import { getFilteredTransactions } from './filter';

describe('getFilteredTransactions', () => {
  const transactions: Transaction[] = [
    { id: 1, category: 'Food', date: '2023-04-01', amount: 100, description: '', type: 'expense'},
    { id: 2, category: 'Transport', date: '2023-04-05', amount: 50, description: '', type: 'expense' },
    { id: 3, category: 'Food', date: '2023-04-10', amount: 150,  description: '', type: 'expense' },
    { id: 4, category: 'Utilities', date: '2023-04-15', amount: 75, description: '', type: 'expense' },
  ];

  test('filters transactions by category', () => {
    const filter: Filter = { category: 'Food', startDate: '', endDate: ''};
    const filteredTransactions = getFilteredTransactions(transactions, filter);
    expect(filteredTransactions.length).toBe(2);
    expect(filteredTransactions.every(t => t.category === 'Food')).toBeTruthy();
  });

  test('filters transactions by start date', () => {
    const filter = { startDate: '2023-04-05', endDate: '', category: ''};
    const filteredTransactions = getFilteredTransactions(transactions, filter);
    expect(filteredTransactions.length).toBe(3);
    expect(filteredTransactions.every(t => t.date >= filter.startDate)).toBeTruthy();
  });

  test('filters transactions by end date', () => {
    const filter = { endDate: '2023-04-10', startDate: '', category: ''};
    const filteredTransactions = getFilteredTransactions(transactions, filter);
    expect(filteredTransactions.length).toBe(3);
    expect(filteredTransactions.every(t => t.date <= filter.endDate)).toBeTruthy();
  });

  test('combines multiple filters', () => {
    const filter = {
      category: 'Food',
      startDate: '2023-04-01',
      endDate: '2023-04-10'
    };
    const filteredTransactions = getFilteredTransactions(transactions, filter);
    expect(filteredTransactions.length).toBe(2);
    expect(filteredTransactions.every(t => t.category === 'Food' && t.date >= filter.startDate && t.date <= filter.endDate)).toBeTruthy();
  });

  test('returns all transactions when no filter is applied', () => {
    const filter = { category: '', startDate: '', endDate: '' };
    const filteredTransactions = getFilteredTransactions(transactions, filter);
    expect(filteredTransactions.length).toBe(transactions.length);
  });
});