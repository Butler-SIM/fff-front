import * as React from "react";
import {
  ChakraProvider,
  Box,
  extendTheme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import CustomFooter from "./components/common/Footer";
import CustomNav from "./components/common/NavBar";
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import MainLayout from "./components/common/layout/MainLayOut";
import BoardList from "./components/board/BoardList";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

export const App = () => (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <CustomNav></CustomNav>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainLayout />} />
          {/* 게시판 목록 */}
          <Route path="/board/BoardList" element={<BoardList />} />
          
        </Routes>
        
        {/* 기타 컴포넌트들 */}
      </Box>

      <CustomFooter></CustomFooter>
    </ChakraProvider>
  </BrowserRouter>
);
