import React, { useEffect } from "react";
import { Routes as Switch, Route, useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { Box } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Home from "../pages/Home";
import { fetchUserData } from "../redux/UserSlice";
import Archives from "../pages/Archives";

function DashboardLayout() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([]);

  useEffect(() => {
    // console.log(data); try to see if data.status is true stay on page if false redirect (Add if else statement in first if else)
    if (cookies.auth_token) {
      dispatch(fetchUserData(cookies.auth_token));
      if (data?.status === false) {
        setCookie("auth_token", "", { path: "/", maxAge: 0 });
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, cookies.auth_token, data, setCookie]);

  return (
    <>
      <Box display="flex" bg="#f6fafc" h="100%" overflow="hidden">
        <Sidebar />
        <Box
          overscrollX="none"
          overflowY="auto"
          display="flex"
          flexDirection="column"
          transition="all 0.3s linear"
          flex={1}
        >
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/archives" element={<Archives />} />
          </Switch>
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;
