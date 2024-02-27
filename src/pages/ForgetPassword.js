import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "../@uikit/Icon";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginBg from "../LoginBg.jpg";
import axios from "axios";

export default function ForgetPassword() {
  const [state, setState] = useState({ email: "" });
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password`,
        { ...state },
        { withCredentials: true }
      );
      if (data) {
        if (data.created === false) {
          console.log(data.errors);
        } else {
          toast({
            description: "Check Your Email For Password Reset link",
            position: "top-right",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
          console.log(data.message);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Box
        display="flex"
        minH="100vh"
        py="2rem"
        flex={1}
        alignItems="center"
        bgImage={LoginBg}
        backgroundPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        justifyContent="center"
      >
        <Box
          maxW={{ base: "20rem", md: "24rem", lg: "26rem" }}
          minH="32.5rem"
          maxH="32.5rem"
          display="flex"
          flexDir="column"
          py="2rem"
          flex={1}
          bg="white"
          borderRadius="5px"
          px="2rem"
        >
          <Box
            flex={3}
            px={6}
            py={5}
            my="auto"
            flexDir="column"
            display="flex"
            justifyContent="flex-start"
            w="100%"
          >
            <Stack mb="1rem" direction="row">
              <Text fontFamily="cursive" fontSize="3xl" my="1rem">
                <Icon name="file-text-line" fontSize="3xl" /> Noted App
              </Text>
            </Stack>

            <Heading size="lg" mb="1rem">
              Trouble Logging In?
            </Heading>
            <Text fontSize="sm" mb="1.5rem">
              Enter your Email Address and we will send you a link to reset your
              password
            </Text>
            <form onSubmit={handleSubmit} id="password-reset-form">
              <Stack direction="column">
                <FormLabel textTransform="uppercase" fontSize="12px">
                  Email ID
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon color="#126dfc" fontSize={18} name="mail-line" />
                    }
                  />
                  <Input
                    type="email"
                    value={state.email}
                    name="email"
                    onChange={(e) =>
                      setState({ ...state, [e.target.name]: e.target.value })
                    }
                    placeholder="e.g. john@email.com"
                  />
                </InputGroup>
                <Stack pt="1rem">
                  <Text
                    color="#126dfc"
                    fontSize="sm"
                    variant="link"
                    as={Link}
                    to="/login"
                  >
                    <Icon name="arrow-left-line" />
                    Go Back
                  </Text>
                  <Button
                    type="submit"
                    form="login-form"
                    bgColor="#126dfc"
                    color="white"
                    _hover={{
                      background: "#024dc2",
                    }}
                  >
                    Continue
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
