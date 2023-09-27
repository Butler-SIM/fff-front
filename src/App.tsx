import * as React from "react";
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import CustomFooter from "./components/common/Footer";
import CustomNav from "./components/common/NavBar";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/common/layout/MainLayOut";
import BoardList from "./components/board/BoardList";
import BoardDetail from "./components/board/BoardDetail";
import LotteryBox from "./components/playground/LotteryBox";
import { AuthProvider } from "./components/common/Auth/AuthContext";
import LoginComponent from "./components/accounts/Login";
import Writing from "./components/writing/Writing";
import FreeBoard from "./components/board/FreeBoardList";
import FreeBoardDetail from "./components/board/FreeBoardDetail";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignupCard from "./components/accounts/SignUp";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    body: '"Noto Sans",sans-serif',
    heading: '"Noto Sans", sans-serif',
  },
});

export const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Box textAlign="center" fontSize="xl">
          <CustomNav></CustomNav>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainLayout />} />
            {/* 게시판 목록 */}
            <Route path="/board-list" element={<BoardList />} />
            {/* 게시판 상세 */}
            <Route path="/board/detail/:boardId" element={<BoardDetail />} />
            {/* 자유 게시판 */}
            <Route path="/free-board" element={<FreeBoard />} />
            {/* 자유 게시판 상세 */}
            <Route
              path="/free-board/detail/:Id"
              element={<FreeBoardDetail />}
            />
            {/* 글쓰기 */}
            <Route
              path="/free-board/writing"
              element={<Writing category="자유" />}
            />
            {/* 놀이터 */}
            <Route path="/lotto" element={<LotteryBox />} />
            {/* 로그인 */}
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signUp" element={<SignupCard />} />
          </Routes>

          {/* 기타 컴포넌트들 */}
        </Box>
      </AuthProvider>
      <CustomFooter></CustomFooter>
    </ChakraProvider>
  </BrowserRouter>
);
