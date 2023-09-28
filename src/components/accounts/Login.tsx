// Login.tsx
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import userApi from "../../lib/api/userApi";
import appUtils from "../../lib/appUtils";
import { AuthContext } from "../common/Auth/AuthContext";

export default function LoginComponent() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async () => {
    
    localStorage.removeItem("userInfo");
    setIsLoading(true); // 로딩 시작
    const { res, err } = await userApi.login({
      email,
      password,
    });
    try {
      if (res?.status === 200) {
        appUtils.setUserInfoLocalStorage(res.data, "email");
        toast({
          position: "top",
          title: "로그인 성공",
          description: "",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      } else if (err?.status === 400) {
        toast({
          position: "top",
          title: "이메일 혹은 비밀번호가 잘못되었습니다 ",
          description: "",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "오류가 발생했습니다 잠시 후 다시 시도 해주세요",
          description: "계속 발생하면 관리자에게 문의해주세요",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} w={350}>
          <Heading fontSize={"4xl"}>유코피아</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              {/* Bind state variable and setter */}
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              {/* Bind state variable and setter */}
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10} fontSize={15}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <ChakraLink as={ReactRouterLink} to="/signUp">
                  <Text color={"blue.400"}>회원가입</Text>
                </ChakraLink>
                <Text color={"blue.400"}>비밀번호 찾기</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
                isLoading={isLoading} // 버튼의 loading 속성 설정
              >
                로그인
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
