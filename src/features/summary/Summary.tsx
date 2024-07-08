import {
  Box,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Container,
} from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import { selectTransactions } from "../dashboard/redux/transactionsSlice";
import {
  calculateTotal,
  calculateTotalExpense,
  calculateTotalIncome,
} from "./utils/summary";

function Summary() {
  const transactions = useAppSelector(selectTransactions);

  const total = calculateTotal(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);

  return (
    <Container maxW="container.xl" p={0} px={4} my={4}>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <Text fontSize="xl" mb={4} fontWeight="bold">
          Summary
        </Text>
        <StatGroup>
          <Stat>
            <StatLabel>Total Income</StatLabel>
            <StatNumber color="green.500">{totalIncome}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Expense</StatLabel>
            <StatNumber color="red.500">{totalExpense}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Balance</StatLabel>
            <StatNumber>{total}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Container>
  );
}

export default Summary;
