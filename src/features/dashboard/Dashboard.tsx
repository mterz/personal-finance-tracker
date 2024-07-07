import { Container, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import CreateTransactionModal from "./CreateTransactionModal";
import TransactionList from "./TransactionList";
import { selectTransactions } from "./transactionsSlice";

function Dashboard() {
  const transactions = useAppSelector(selectTransactions);

  return (
    <Flex direction="column" align="center">
      <Container maxW="container.xl" p={0} px={4} my={4}>
        <CreateTransactionModal />
        <TransactionList transactions={transactions} />
      </Container>
    </Flex>
  );
}

export default Dashboard;
