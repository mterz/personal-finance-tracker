import { Box, Flex, Text } from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";

function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          Personal Finance Tracker
        </Text>
      </Flex>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="auto"
      >
        <NavbarLink to="/" text="Dashboard" />
        <NavbarLink to="summary" text="Summary" />
      </Box>
    </Flex>
  );
}

export default Navbar;
