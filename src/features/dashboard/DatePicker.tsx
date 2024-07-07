import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define the props for CustomInput including all props ReactDatePicker might pass
interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <Input type="text" onFocus={onClick} ref={ref} value={value} readOnly />
  )
);
CustomInput.displayName = "CustomInput"; // Set displayName for the forwardRef component

interface DatePickerProps {
  label: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

export function DatePicker(props: DatePickerProps) {
  const { label, selected, onChange } = props;

  return (
    <FormControl id="end-date-picker" mb={4} flex="1">
      <FormLabel>{label}</FormLabel>
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        customInput={<CustomInput />}
      />
    </FormControl>
  );
}
