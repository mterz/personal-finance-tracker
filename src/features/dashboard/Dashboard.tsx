import { Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import CreateTransactionModal from "./CreateTransactionModal";
import { Filter } from "./domain/Filter";
import FilterContainer from "./FilterContainer";
import TransactionList from "./TransactionList";
import { selectTransactions } from "./transactionsSlice";
import { getFilteredTransactions } from "./utils/filter";
import { getUniqCategories } from "./domain/Transaction";

function Dashboard() {
  const transactions = useAppSelector(selectTransactions);
  const [filter, setFilter] = useState<Filter>({
    category: "",
    startDate: null,
    endDate: null,
  });

  const filteredTransactions = getFilteredTransactions(transactions, filter);

  function handleFilterChange(f: Filter) {
    setFilter(f);
  }

  return (
    <Flex direction="column" align="center">
      <Container maxW="container.xl" p={0} px={4} my={4}>
        <CreateTransactionModal />
        <FilterContainer
          filter={filter}
          categoryOptions={getUniqCategories(transactions)}
          onFilterChange={handleFilterChange}
        />
        <TransactionList transactions={filteredTransactions} />
      </Container>
    </Flex>
  );
}

export default Dashboard;
