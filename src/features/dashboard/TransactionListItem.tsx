import { DeleteIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import EditTransactionModal from "./EditTransactionModal";
import { Transaction } from "./domain/Transaction";
import { formatDate } from "./utils/date";

interface Props {
  transaction: Transaction;
  onDelete: () => void;
}

function TransactionListItem(props: Props) {
  const { transaction, onDelete } = props;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton as={Box}>
          <Grid templateColumns="1fr 1fr 1fr" gap={6} width="full">
            <Text>{transaction.category}</Text>
            <Text>{formatDate(transaction.date)}</Text>
            <Text
              color={transaction.type === "income" ? "green.500" : "red.500"}
              fontWeight="bold"
              mr={4}
              align="right"
            >
              {transaction.type === "expense" && "-"}
              {transaction.amount}
            </Text>
          </Grid>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex align="flex-end" justify="space-between">
          <VStack align="start">
            <Text>Description: {transaction.description}</Text>
            <Text>Type: {transaction.type}</Text>
            <Text>Category: {transaction.category}</Text>
            <Text>
              Amount: {transaction.type === "expense" && "-"}
              {transaction.amount}
            </Text>
            <Text>Date: {formatDate(transaction.date)}</Text>
          </VStack>
          <Flex gap={2}>
            <EditTransactionModal transaction={transaction} />
            <Button
              colorScheme="red"
              mr={2}
              onClick={onDelete}
              leftIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default TransactionListItem;
