import { Container, Flex, Text } from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";

function Navbar() {
  return (
    <Flex as="nav" bg="teal.500" color="white">
      <Container maxW="container.xl" p={0} px={4}>
        <Flex align="center" justify="space-between" wrap="wrap" py="6">
          <Flex align="center">
            <Text fontSize="xl" fontWeight="bold">
              Personal Finance Tracker
            </Text>
          </Flex>

          <Flex align="center" justify="space-between">
            <NavbarLink to="/" text="Dashboard" />
            <NavbarLink to="summary" text="Summary" />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Navbar;
