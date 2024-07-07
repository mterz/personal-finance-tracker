import { useAppSelector } from "../../store/hooks";
import CreateTransactionModal from "./CreateTransactionModal";
import { selectTransactions } from "./transactionsSlice";
import {
  Flex,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

function Dashboard() {
  const transactions = useAppSelector(selectTransactions);

  return (
    <Flex direction="column" align="center">
      <Container maxW="container.xl" p={0} my={4}>
        <CreateTransactionModal />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.description}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td
                  align="left"
                  isNumeric
                  color={
                    transaction.type === "income" ? "green.500" : "red.500"
                  }
                  fontWeight="bold"
                >
                  {transaction.amount}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </Flex>
  );
}

export default Dashboard;
