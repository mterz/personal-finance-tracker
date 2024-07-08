import {describe, expect, test} from "@jest/globals";
import { calculateTotal, calculateTotalIncome, calculateTotalExpense } from "./summary";
import { Transaction } from "../../dashboard/domain/Transaction";

const mockTransactions = [
  { id: 1, type: 'income', amount: 100 },
  { id: 2, type: 'expense', amount: -50 },
  { id: 3, type: 'income', amount: 150 },
  { id: 4, type: 'expense', amount: -30 },
] as Transaction[];

describe('Summary Calculations', () => {
  test('calculateTotal with empty transactions array should return 0', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('calculateTotal with mixed transactions', () => {
    expect(calculateTotal(mockTransactions)).toBe(170); // 100 - 50 + 150 - 30 = 170
  });

  test('calculateTotalIncome with all transactions being expenses', () => {
    const transactions = [
      { id: 1, type: 'expense', amount: 50 },
      { id: 2, type: 'expense', amount: 100 }
    ] as Transaction[];
    expect(calculateTotalIncome(transactions)).toBe(0);
  });

  test('calculateTotalIncome with mixed transactions', () => {
    expect(calculateTotalIncome(mockTransactions)).toBe(250); // 100 + 150 = 250
  });

  test('calculateTotalExpense with all transactions being income', () => {
    const transactions = [
      { id: 1, type: 'income', amount: 100 },
      { id: 2, type: 'income', amount: 200 }
    ] as Transaction[];
    expect(calculateTotalExpense(transactions)).toBe(0);
  });

  test('calculateTotalExpense with mixed transactions', () => {
    expect(calculateTotalExpense(mockTransactions)).toBe(-80); // -50 + (-30) = -80
  });

});
