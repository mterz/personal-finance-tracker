import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import TransactionForm, { TransactionFormFields } from "./TransactionForm";
import { CreateTransactionVO } from "./transactionsApi";
import { useAppDispatch } from "../../store/hooks";
import { createTransaction } from "./redux/transactionActions";

function formDataToTransactionVO(
  data: TransactionFormFields
): CreateTransactionVO {
  if (data.type === "" || Number.isNaN(Number(data.amount))) {
    throw new Error("Invalid form data");
  }

  return {
    type: data.type as "income" | "expense",
    category: data.category,
    amount: Number(data.amount),
    description: data.description,
  };
}

function CreateTransactionModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const onSubmit = (data: TransactionFormFields) => {
    dispatch(createTransaction(formDataToTransactionVO(data)));
    onClose();
  };

  return (
    <>
      <Flex justifyContent="flex-end" my={4}>
        <Button onClick={onOpen} colorScheme="teal" leftIcon={<AddIcon />}>
          Create Transaction
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <TransactionForm onCancel={onClose} onSubmit={onSubmit} />
      </Modal>
    </>
  );
}

export default CreateTransactionModal;
