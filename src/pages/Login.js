import {
  Box,
  Button,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "../@uikit/Icon";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginBg from "../LoginBg.jpg";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  /////////////ADD TOAST OF WELCOME IN SUBMIT FUNCTION TO TOAST WELCOME BEFORE NAVIGATE ON LOGIN & REG
  useEffect(() => {
    const authToken = cookies.auth_token;

    const verifyUser = async () => {
      if (!authToken) {
        navigate("/login");
      } else {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/`,
            { auth_token: authToken },
            { withCredentials: true }
          );
          if (!data.status) {
            removeCookie("auth_token");
            navigate("/login");
          } else {
            navigate("/");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const generateError = (error) => {
    toast({
      title: "Error",
      description: error,
      position: "top-right",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast({
      title: "Logging In",
      position: "top-right",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errors) {
          console.log(data.errors);
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          const token = data.jwt;
          console.log(data);
          setCookie("auth_token", token, { path: "/", maxAge: 172800 });
          toast({
            title: "Welcome",
            description: `${data.firstName}!`,
            position: "top-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
          minW="26rem"
          maxW="26rem"
          display={{ base: "none", md: "none", lg: "flex" }}
          minH="32.5rem"
          flexDir="column"
          bgImage="https://www.transparenttextures.com/patterns/clean-gray-paper.png"
          bgColor={process.env.REACT_APP_PRIMARY_COLOR}
          borderRadius="5px 0 0 5px"
          px="2rem"
          py="1.5rem"
        >
          <Box
            flex={3}
            px={6}
            py={5}
            flexDir="column"
            display="flex"
            justifyContent="flex-start"
            w="100%"
          >
            <Text fontSize="xl">Welcome to</Text>
            <Text fontFamily="cursive" fontSize="3xl" my="1rem">
              <Icon name="file-text-line" fontSize="3xl" /> Noted App
            </Text>
            <Text>
              Manage your notes effortlessly: Create, edit, and organize with
              customizable titles and texts. Seamlessly search, archive, and
              enhance productivity.
            </Text>
          </Box>
        </Box>
        <Box
          maxW={{ base: "20rem", md: "24rem", lg: "26rem" }}
          minH="32.5rem"
          maxH="32.5rem"
          display="flex"
          flexDir="column"
          py="2rem"
          flex={1}
          bg="white"
          borderRadius="0px 5px 5px 0"
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
            <Heading size="xl" mb="1rem">
              Log in
            </Heading>
            <Text fontSize="xs" mb="1.5rem">
              Enter to continue and explore within your grasp
            </Text>
            <form onSubmit={handleSubmit} id="login-form">
              <Stack direction="column">
                <FormLabel textTransform="uppercase" fontSize="12px">
                  Email ID
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon
                        color={process.env.REACT_APP_PRIMARY_COLOR}
                        fontSize={18}
                        name="mail-line"
                      />
                    }
                  />
                  <Input
                    type="email"
                    value={values.email}
                    name="email"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                    placeholder="e.g. john@email.com"
                  />
                </InputGroup>

                <FormLabel textTransform="uppercase" fontSize="12px" mt="1rem">
                  Password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <Icon
                        color={process.env.REACT_APP_PRIMARY_COLOR}
                        name="lock-password-line"
                      />
                    }
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      bg="transparent"
                      size="sm"
                      _hover={{ bg: "#ffffff" }}
                      icon={
                        showPassword ? (
                          <Icon
                            name="eye-off-line"
                            fontSize="xl"
                            color="gray"
                            onClick={handleShowPassword}
                          />
                        ) : (
                          <Icon
                            name="eye-line"
                            onClick={handleShowPassword}
                            fontSize="xl"
                            color="grey"
                          />
                        )
                      }
                    />
                  </InputRightElement>
                </InputGroup>

                <Stack
                  direction="row"
                  py="10px"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    color="#126dfc"
                    fontSize="sm"
                    variant="link"
                    as={Link}
                    to="/register"
                  >
                    Don't have an account?
                  </Text>
                  <Text
                    fontSize="sm"
                    variant="link"
                    color="#126dfc"
                    as={Link}
                    to="/forget-password"
                  >
                    Forget Password?
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  form="login-form"
                  bgColor={process.env.REACT_APP_PRIMARY_COLOR}
                  color="white"
                  _hover={{
                    background: process.env.REACT_APP_ACCENT_COLOR,
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
