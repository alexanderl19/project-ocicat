import React from "react";
import { VStack, Heading, Flex, Tooltip, Link } from "@chakra-ui/react";
import { ViewOffIcon } from "@chakra-ui/icons";

class Header extends React.Component {
  render() {
    return (
      <header>
        <VStack p="4" spacing="1" bgColor="black" textColor="white">
          <Heading as="h1" size="xs">
            Project Ocicat
          </Heading>
          <Flex align="center">
            <Tooltip label="Hidden Project">
              <ViewOffIcon w="4" mr="1.5" fill="white" />
            </Tooltip>
            <Link fontSize="sm" href="https://ocicat.cats.alexanderliu.com">
              ocicat.cats.alexanderliu.com
            </Link>
          </Flex>
        </VStack>
      </header>
    );
  }
}

export default Header;
