import { EditIcon } from "@chakra-ui/icons";
import { Button, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useAppDispatch } from "../../store/hooks";
import { updateTransaction } from "./actions";
import { Transaction } from "./domain/Transaction";
import TransactionForm, { TransactionFormFields } from "./TransactionForm";

interface Props {
  transaction: Transaction;
}

function EditTransactionModal(props: Props) {
  const { transaction } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  function formDataToTransaction(data: TransactionFormFields): Transaction {
    if (data.type === "" || Number.isNaN(Number(data.amount))) {
      throw new Error("Invalid form data");
    }

    return {
      id: transaction.id,
      date: transaction.date,
      type: data.type as "income" | "expense",
      category: data.category,
      amount: Number(data.amount),
      description: data.description,
    };
  }

  const onSubmit = (data: TransactionFormFields) => {
    dispatch(updateTransaction(formDataToTransaction(data)));
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" leftIcon={<EditIcon />}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <TransactionForm
          transaction={transaction}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
}

export default EditTransactionModal;
