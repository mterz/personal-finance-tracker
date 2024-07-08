import {
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  Button,
  ModalFooter,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Transaction } from "./domain/Transaction";

export type TransactionFormFields = {
  type: "income" | "expense" | "";
  category: string;
  amount: string;
  description: string;
};

interface Props {
  transaction?: Transaction;
  onCancel: () => void;
  onSubmit: (data: TransactionFormFields) => void;
}

/**
 * Modal form containing four inputs: type, category, amount, and description.
 * Used both for creating and updating transactions.
 */
function TransactionForm(props: Props) {
  const { transaction, onCancel, onSubmit } = props;

  const defaultValues: TransactionFormFields = {
    type: transaction?.type || "",
    category: transaction?.category || "",
    amount: transaction?.amount.toString() || "",
    description: transaction?.description || "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TransactionFormFields>({
    defaultValues,
  });

  function validateAmount(value: string, otherFields: TransactionFormFields) {
    if (otherFields.type === "income") {
      return Number(value) > 0 || "Amount must be positive";
    }
    if (otherFields.type === "expense") {
      return Number(value) < 0 || "Amount must be negative";
    }
    return true;
  }

  return (
    <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader>{transaction ? "Update" : "Create"} Transaction</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <FormControl isInvalid={Boolean(errors.type)}>
          <FormLabel htmlFor="type">Type</FormLabel>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <Select
                id="type"
                placeholder="Select transaction type"
                {...field}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
            )}
          />
          <FormErrorMessage>
            {errors.type && errors.type.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={Boolean(errors.category)}>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Input id="category" type="text" {...field} />
            )}
          />
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={Boolean(errors.amount)}>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              validate: validateAmount,
            }}
            render={({ field }) => (
              <Input id="amount" type="number" {...field} />
            )}
          />
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input id="description" type="text" {...field} />
            )}
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" type="submit">
          {transaction ? "Update Transaction" : "Create Transaction"}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default TransactionForm;
