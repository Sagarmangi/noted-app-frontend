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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../@uikit/Icon";
import LoginBg from "../LoginBg.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({ password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const [recievedToken] = useState(queryParameters.get("token"));

  useEffect(() => {
    const checkToken = () => {
      if (!recievedToken) {
        navigate("/forget-password");
      }
    };
    checkToken();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/change-password`,
        {
          ...state,
          recievedToken,
        }
      );
      if (data) {
        if (data.created === false) {
          console.log(data.errors);
        } else {
          console.log(data);
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
            Reset Your Password
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack direction="column">
              <FormLabel textTransform="uppercase" fontSize="12px" mt="1rem">
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="#126dfc" name="lock-password-line" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={state.password}
                  name="password"
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
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
              <FormLabel textTransform="uppercase" fontSize="12px" mt="1rem">
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon color="#126dfc" name="lock-password-line" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
  );
}
