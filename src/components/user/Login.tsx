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
  useColorModeValue
} from "@chakra-ui/react";
import axios from "axios";

const handleLogin = async () => {
   try {
      const response = await axios.post("http://localhost:8000/accounts/login", {
         email: "test1@example.com",
         password: "qwer1234"
      });

      const { access_token } = response.data;

      // access_token을 localStorage에 저장
      localStorage.setItem("access_token", access_token);

      // API 요청 시 헤더에 Bearer 토큰 자동 포함 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

   } catch (error) {
      console.error(error);
   }
};

export default function LoginComponent() {
   // 로그인 상태 확인
   const isLoggedIn = !!localStorage.getItem("access_token");

   return (
     <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
       <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
         <Stack align={"center"}>
           <Heading fontSize={"4xl"}>Sign in to your account</Heading>
           <Text fontSize={"lg"} color={"gray.600"}>
             ✌️
           </Text>
         </Stack>
         <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8} height={350}>
           <Stack spacing={5}>
             {/* 카카오 로그인 버튼 */}
             {/* ... */}
             {/* 기타 입력 필드 및 버튼들 */}
             {isLoggedIn ? (
               // 로그인한 상태인 경우
               <Flex align="center">
                 {/* 프로필 메뉴 등 로그인한 사용자에게 보여줄 컨텐츠 */}
                 {/* ... */}
               </Flex>
             ) : (
               // 로그인하지 않은 상태인 경우
               <Flex align="center">
                 {/* 로그인 버튼 */}
                 <Button onClick={handleLogin} size="lg">
                   로그인
                 </Button>
               </Flex>
             )}
           </Stack>
         </Box>
       </Stack>
     </Flex>
   );
}
