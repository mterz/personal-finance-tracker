import { Accordion, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Transaction } from "./domain/Transaction";
import { deleteTransaction } from "./redux/transactionActions";
import TransactionListItem from "./TransactionListItem";

interface Props {
  transactions: Transaction[];
}

function TransactionList(props: Props) {
  const { transactions } = props;

  // We need to contol the expanded state of the Accordion component,
  // otherwise, the Accordion will not work as expected when deleting an item.
  const [expandedTransactions, setExpandedTransactions] = useState<number[]>(
    []
  );
  const dispatch = useAppDispatch();

  function handleDelete(transaction: Transaction) {
    return () => {
      dispatch(deleteTransaction(transaction));
      const relevantIndex = transactions.indexOf(transaction);
      setExpandedTransactions((prevOpenItems) => {
        const newOpenItems = prevOpenItems.filter((i) => i !== relevantIndex);
        // all items after the deleted item will have their index decreased by 1
        return newOpenItems.map((i) => (i > relevantIndex ? i - 1 : i));
      });
    };
  }

  if (transactions.length === 0) {
    return <Text>No transactions found</Text>;
  }

  return (
    <>
      <Grid
        templateColumns="1fr 1fr 1fr"
        gap={6}
        alignItems="center"
        width="full"
        mb={2}
      >
        <Text ml={4} fontWeight="bold">
          Category
        </Text>
        <Text fontWeight="bold">Date</Text>
        <Text mr={12} align="right" fontWeight="bold">
          Amount
        </Text>
      </Grid>
      <Accordion
        allowMultiple
        index={expandedTransactions as number[]}
        onChange={(indices) => {
          setExpandedTransactions(indices as number[]);
        }}
      >
        {transactions.map((transaction) => (
          <TransactionListItem
            key={transaction.id}
            transaction={transaction}
            onDelete={handleDelete(transaction)}
          />
        ))}
      </Accordion>
    </>
  );
}

export default TransactionList;
