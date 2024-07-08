import { CalendarIcon, CloseIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the props for CustomInput including all props ReactDatePicker might pass
interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onChange?: (date: Date | null) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, onChange }, ref) => (
    <InputGroup size="md" ref={ref}>
      <Input
        style={{
          paddingLeft: "2rem",
        }}
        type="text"
        onFocus={onClick}
        value={value}
        readOnly
      />

      {value && onChange && (
        <InputRightElement>
          <IconButton
            variant="ghost"
            aria-label="Clear date"
            icon={<CloseIcon />}
            onClick={() => onChange(null)}
          />
        </InputRightElement>
      )}
    </InputGroup>
  )
);
CustomInput.displayName = "CustomInput"; // Set displayName for the forwardRef component

interface DatePickerProps {
  id: string;
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { id, label, selected, onChange } = props;

  return (
    <FormControl id={id} mb={4} flex="1">
      <FormLabel>{label}</FormLabel>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        customInput={<CustomInput />}
        showIcon
        icon={<CalendarIcon style={{ paddingTop: "12px" }} />}
      />
    </FormControl>
  );
}
