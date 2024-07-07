import { Link } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

interface Props {
  to: string;
  text: string;
}

function NavbarLink(props: Props) {
  const { to, text } = props;

  return (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      mx={1}
      rounded={"md"}
      _hover={{ bg: "teal.600" }}
      _activeLink={{ bg: "teal.700" }}
    >
      {text}
    </Link>
  );
}

export default NavbarLink;
