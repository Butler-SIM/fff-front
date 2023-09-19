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
} from "@chakra-ui/react";

export default function LoginComponent() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          height={350}
        >
          <Stack spacing={5}>
            {/* 카카오 로그인 버튼 */}
            <Flex align="center">
              <Button
                onClick={() => {
                  // 카카오 로그인 처리 로직 추가
                }}
                colorScheme="yellow"
                size="lg"
                leftIcon={<img src="/kakao_logo.png" alt="Kakao Logo" />}
              >
                카카오로 로그인하기
              </Button>
            </Flex>

            {/* 카카오 로그인 버튼 */}
            <Flex align="center">
              <Button
                onClick={() => {
                  // 카카오 로그인 처리 로직 추가
                }}
                colorScheme="yellow"
                size="lg"
                leftIcon={<img src="/kakao_logo.png" alt="Kakao Logo" />}
              >
                카카오로 로그인하기
              </Button>
            </Flex>
            {/* 기타 입력 필드 및 버튼들 */}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
