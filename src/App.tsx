import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";
import CustomFooter from "./components/common/Footer";
import CustomNav from "./components/common/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import MyPage from "./components/accounts/MyPage";
import PasswordFind from "./components/accounts/PasswordFind";
import EtcWriting from "./components/writing/EtcWriting";
import BugBoard from "./components/board/etc/Etc";
import EtcDetail from "./components/board/etc/EtcDetail";
import store from "./store";
import { Provider } from 'react-redux';
import EtcBoard from "./components/board/etc/Etc";

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
    <Provider store={store}>
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
              <Route
                path="/etc-board/writing"
                element={<EtcWriting/>}
              />
              {/* 놀이터 */}
              <Route path="/lotto" element={<LotteryBox />} />
              {/* accounts */}
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signUp" element={<SignupCard />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/passwordFind" element={<PasswordFind />} />

              {/* 기타 */}
              {/* 버그 제보 */}
              <Route path="/etc/bug" element={<EtcBoard />} />
              <Route path="/etc/bug/:Id" element={<EtcDetail />} />
              {/* 문의/건의 */}
              <Route path="/etc/suggestions" element={<EtcBoard />} />
              <Route path="/etc/suggestions/:Id" element={<EtcDetail />} />

            </Routes>

            {/* 기타 컴포넌트들 */}
          </Box>
        </AuthProvider>
        <CustomFooter></CustomFooter>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);
