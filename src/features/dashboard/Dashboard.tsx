import { Container, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import CreateTransactionModal from "./CreateTransactionModal";
import TransactionList from "./TransactionList";
import { selectTransactions } from "./transactionsSlice";
import FilterContainer, { Filter } from "./FilterContainer";
import { useState } from "react";
import _ from "lodash";
import { computeFilteredTransactions } from "./utils/filter";

function Dashboard() {
  const transactions = useAppSelector(selectTransactions);
  const [filter, setFilter] = useState<Filter>({
    category: "",
    startDate: null,
    endDate: null,
  });

  const filteredTransactions = computeFilteredTransactions(
    transactions,
    filter
  );

  function handleFilterChange(f: Filter) {
    setFilter(f);
  }

  return (
    <Flex direction="column" align="center">
      <Container maxW="container.xl" p={0} px={4} my={4}>
        <CreateTransactionModal />
        <FilterContainer
          filter={filter}
          categoryOptions={_.uniq(transactions.map((t) => t.category))}
          onFilterChange={handleFilterChange}
        />
        <TransactionList transactions={filteredTransactions} />
      </Container>
    </Flex>
  );
}

export default Dashboard;
