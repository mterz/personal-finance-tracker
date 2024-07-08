import { Filter } from "../domain/Filter";
import { Transaction } from "../domain/Transaction";

export function getFilteredTransactions(transactions: Transaction[], filter: Filter): Transaction[] {
  return transactions.filter((transaction) => {
    if (filter.category !== '' && transaction.category !== filter.category) {
      return false;
    }
    
    if (filter.startDate && transaction.date < filter.startDate) {
      return false;
    }

    if (filter.endDate && transaction.date > filter.endDate) {
      return false;
    }

    return true;
  });
}
