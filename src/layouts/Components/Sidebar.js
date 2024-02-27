import {
  Avatar,
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Icon } from "../../@uikit/Icon";
import { fetchUserData } from "../../redux/UserSlice";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavButton } from "../../@uikit/NavButton";

export default function Sidebar({ user }) {
  const [cookies, setCookie] = useCookies([]);
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.auth_token) {
      dispatch(fetchUserData(cookies.auth_token));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, cookies.auth_token]);

  const handleLogout = () => {
    setCookie("auth_token", "", { path: "/", maxAge: 0 });
    navigate("/login");
  };

  return (
    <Box
      h="100vh"
      px="0px"
      transition="all 0.3s linear"
      display="flex"
      bgImage="https://www.transparenttextures.com/patterns/clean-gray-paper.png"
      bgColor={process.env.REACT_APP_PRIMARY_COLOR}
      flexDirection="row"
    >
      <Box
        transition="all 0.3s linear"
        whiteSpace="nowrap"
        overflowX="hidden"
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" flexDirection="column" h="100%">
          <Box d="flex" flex="1" flexDirection="column">
            <Box p="1rem" py={3}>
              <Box pe={18} ps={1} pb={3}>
                <Text fontFamily="cursive" fontSize="3xl">
                  <Icon name="file-text-line" fontSize="3xl" /> Noted App
                </Text>
              </Box>
            </Box>
            <Flex flexDir="column">
              <NavButton
                color="black"
                to="/"
                icon="home-2-line"
                showIcon
                label="Home"
              />
              <NavButton
                color="black"
                to="/archives"
                icon="inbox-archive-line"
                showIcon
                label="Archives"
              />
            </Flex>
          </Box>

          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="flex-end"
            pb="5"
          >
            <Flex ps={3} gap={2}>
              <Menu placement="right-end" size="xs">
                <MenuButton borderRadius="100%">
                  <Flex ps={3} gap={2}>
                    <Avatar
                      size="md"
                      bgColor={process.env.REACT_APP_ACCENT_COLOR}
                      name={data?.firstName + " " + data?.lastName}
                      src={data?.picture}
                    />
                    <Box>
                      <Text fontSize="sm" textAlign="start" as="b">
                        {data?.firstName} {data?.lastName}
                      </Text>
                      <Text fontSize="sm" color="charcoal">
                        {data?.user}
                      </Text>
                    </Box>
                  </Flex>
                </MenuButton>
                <MenuList
                  size="sm"
                  shadow="lg"
                  rounded="0"
                  borderColor="gray.100"
                >
                  <Box px="5" py="2">
                    <Heading m={0} size="sm">
                      {data?.firstName} {data?.lastName}
                    </Heading>
                  </Box>
                  <MenuItem
                    fontSize="14px"
                    icon={<Icon name="user-edit-solid" />}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    fontSize="14px"
                    onClick={handleLogout}
                    icon={<Icon name="sign-out-alt-solid" />}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
