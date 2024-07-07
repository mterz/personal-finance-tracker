import { Box, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { DatePicker } from "./DatePicker";

export interface Filter {
  category: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface Props {
  filter: Filter;
  categoryOptions: string[];
  onFilterChange: (filter: Filter) => void;
}

function FilterContainer(props: Props) {
  const { filter, categoryOptions, onFilterChange } = props;

  function setFilterProperty<K extends keyof Filter>(key: K, value: Filter[K]) {
    onFilterChange({ ...filter, [key]: value });
  }

  return (
    <Flex gap={8} direction="row" justifyContent="flex-start" wrap="wrap">
      <Box w="250px">
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            value={filter.category}
            onChange={(e) => setFilterProperty("category", e.target.value)}
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
          label="Start Date"
          selected={filter.startDate}
          onChange={(date) => setFilterProperty("startDate", date)}
        />

        <DatePicker
          label="End Date"
          selected={filter.endDate}
          onChange={(date) => setFilterProperty("endDate", date)}
        />
      </Flex>
    </Flex>
  );
}

export default FilterContainer;
