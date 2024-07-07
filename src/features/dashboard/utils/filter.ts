import { Transaction } from "../domain/Transaction"
import { Filter } from "../FilterContainer"

export function computeFilteredTransactions(transactions: Transaction[], filter: Filter): Transaction[] {
  return transactions.filter((transaction) => {
    if (filter.category && transaction.category !== filter.category) {
      return false;
    }

    if (filter.startDate && transaction.date < filter.startDate.toISOString()) {
      return false;
    }

    if (filter.endDate && transaction.date > filter.endDate.toISOString()) {
      return false;
    }

    return true;
  });

}
