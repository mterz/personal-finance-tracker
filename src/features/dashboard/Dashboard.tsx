import { Container, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import CreateTransactionModal from "./CreateTransactionModal";
import { getUniqCategories } from "./domain/Transaction";
import FilterContainer from "./FilterContainer";
import {
  selectTransactions,
  selectTransactionsFilter,
} from "./redux/transactionsSlice";
import TransactionList from "./TransactionList";
import { getFilteredTransactions } from "./utils/filter";

function Dashboard() {
  const transactions = useAppSelector(selectTransactions);
  const filter = useAppSelector(selectTransactionsFilter);

  const filteredTransactions = getFilteredTransactions(transactions, filter);

  return (
    <Flex direction="column" align="center">
      <Container maxW="container.xl" p={0} px={4} my={4}>
        <CreateTransactionModal />
        <FilterContainer categoryOptions={getUniqCategories(transactions)} />
        <TransactionList transactions={filteredTransactions} />
      </Container>
    </Flex>
  );
}

export default Dashboard;
