import {
  Flex,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Icon } from "../../@uikit/Icon";

export default function Header({
  loggedIn,
  data,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <>
      <Flex
        bgImage="https://www.transparenttextures.com/patterns/clean-gray-paper.png"
        bgColor={process.env.REACT_APP_PRIMARY_COLOR}
        p="0.5rem 1rem"
        boxShadow="md"
        justifyContent="center"
      >
        <Flex>
          <InputGroup>
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              w="lg"
              variant="filled"
              focusBorderColor={process.env.REACT_APP_ACCENT_COLOR}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement mx="0.5rem">
              {searchQuery ? (
                <Button
                  borderRadius="100%"
                  p="8px"
                  h="1.75rem"
                  borderColor="black"
                  size="sm"
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  <Icon name="close-fill" color="black" />
                </Button>
              ) : (
                ""
              )}
            </InputRightElement>
          </InputGroup>
        </Flex>
        <Stack>{loggedIn ? "" : ""}</Stack>
      </Flex>
    </>
  );
}
