import { Box, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { DatePicker } from "./DatePicker";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changeCategoryFilter,
  changeEndDateFilter,
  changeStartDateFilter,
  selectTransactionsFilter,
} from "./redux/transactionsSlice";

interface Props {
  categoryOptions: string[];
}

function FilterContainer(props: Props) {
  const { categoryOptions } = props;
  const filter = useAppSelector(selectTransactionsFilter);
  const dispatch = useAppDispatch();

  return (
    <Flex gap={4} direction="row" justifyContent="flex-start" wrap="wrap">
      <Box w="220px">
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            value={filter.category}
            onChange={(e) => dispatch(changeCategoryFilter(e.target.value))}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Flex gap={4}>
        <DatePicker
          id="start-date"
          label="Start Date"
          selected={filter.startDate ? new Date(filter.startDate) : null}
          onChange={(date) =>
            dispatch(changeStartDateFilter(date?.toISOString() ?? ""))
          }
        />

        <DatePicker
          id="end-date"
          label="End Date"
          selected={filter.endDate ? new Date(filter.endDate) : null}
          onChange={(date) =>
            dispatch(changeEndDateFilter(date?.toISOString() ?? ""))
          }
        />
      </Flex>
    </Flex>
  );
}

export default FilterContainer;
