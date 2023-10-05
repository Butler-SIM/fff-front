"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import userApi, { ValidationError } from "../../lib/api/accounts/userApi";
import { useNavigate, useLocation } from 'react-router-dom';

export function validateEmail(email: string) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

export default function SignupCard() {
  const type = "JOIN";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  // 이메일 인증 코드
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);
  const [nickname, setNickname] = useState("");
  const [nicknameDuplicationCheck, setNicknameDuplicationCheck] =
    useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    nickname: "",
    code: "",
  });

  const handleSendEmailCode = async () => {
    //회원가입 이메일 인증코드 발송

    const { res, err } = await userApi.sendEmailCode({ type, email });

    if (res?.status === 201) {
      toast({
        position: "top",
        title: "이메일을 확인해주세요",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setShowVerificationCodeInput(true);
    } else if (err) {
      if (err?.response?.status === 400) {
        toast({
          position: "top",
          title: "이메일 주소를 확인해주세요",
          description: "",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "오류가 발생했습니다 잠시 후 다시 시도 해주세요.",
          description: "계속 발생하면 관리자에게 문의해주세요.",
          duration: 1000,
        });
      }
    }
  };

  const EmailCodVerification = async () => {
    const { res, err } = await userApi.emailCodeVerification({ code, email });

    if (res?.status === 200) {
      toast({
        position: "top",
        title: "인증 완료되었습니다",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsVerified(true); // Add this line.
      setShowVerificationCodeInput(true);
    } else if (err) {
      if (err?.response?.status === 400) {
        toast({
          position: "top",
          title: "인증코드를 확인해주세요",
          description: "",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "오류가 발생했습니다 잠시 후 다시 시도 해주세요.",
          description: "계속 발생하면 관리자에게 문의해주세요.",
          duration: 1000,
        });
      }
    }
  };

  
  const handleNicknameDuplicationCheck = async () => {
    const { res, err } = await userApi.nickNameValidateReq(nickname);

    if (res?.status === 200) {
      toast({
        position: "top",
        title: "사용 가능한 닉네임입니다",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setNicknameDuplicationCheck(true);
    } else if (err) {
      const errorData = err?.response?.data as ValidationError;

      if (err?.response?.status === 400) {
        toast({
          position: "top",
          title: errorData.validation_fail ,
          description: "",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top",
          title: "오류가 발생했습니다 잠시 후 다시 시도 해주세요.",
          description: "계속 발생하면 관리자에게 문의해주세요.",
          duration: 1000,
        });
      }
    }
  };

  const handleSignUp = async () => {
    const { email, nickname, password1, password2, code } = formData;
    const { res, err } = await userApi.signUp({
      email,
      password1,
      password2,
      nickname,
      code,
    });
    

    if (res?.status === 201) {
        toast({
          position: "top",
          title: "회원 가입을 축하드립니다!",
          description: "",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate('/', { replace: true });
      } else if (err) {
        const errorData = err?.response?.data as ValidationError;
  
        if (err?.response?.status === 400) {
          toast({
            position: "top",
            title: errorData.error || "비밀번호를 확인해주세요",
            description: "",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            title: "오류가 발생했습니다 잠시 후 다시 시도 해주세요.",
            description: "계속 발생하면 관리자에게 문의해주세요.",
            duration: 1000,
          });
        }
      };
    
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            회원가입
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={350}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>이메일</FormLabel>

              <HStack spacing="2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </HStack>
            </FormControl>
            <FormControl id="email" isRequired>
              <HStack spacing="2">
                <Button
                  onClick={() => {
                    if (validateEmail(email)) {
                      handleSendEmailCode();
                    } else {
                      alert("유효한 이메일 주소를 입력해주세요.");
                    }
                  }}
                  hidden={showVerificationCodeInput}
                >
                  이메일 인증 코드 받기
                </Button>

                {showVerificationCodeInput && (
                  <Input
                    type="text"
                    placeholder="이메일 인증 코드 입력"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setFormData({ ...formData, code: e.target.value }); // Add this line.
                    }}
                  />
                )}
                {showVerificationCodeInput && (
                  <Button onClick={EmailCodVerification}>확인</Button>
                )}
              </HStack>
            </FormControl>
            <FormControl id="nickname" isRequired>
              <FormLabel>닉네임</FormLabel>

              <HStack spacing="2">
                <Input
                  type="text"
                  value={nickname}
                  fontSize={13}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setFormData({ ...formData, nickname: e.target.value });
                  }}
                  placeholder="2~8자 숫자, 영문, 한글만 가능"
                />
                <Button onClick={handleNicknameDuplicationCheck}>
                  중복확인
                </Button>
              </HStack>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormData({ ...formData, password1: e.target.value });
                  }}
                  fontSize={13}
                  placeholder="6~12자 영문,숫자,특수문자 2가지이상 조합"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword" isRequired mt={"5"}>
              <FormLabel>비밀번호 확인</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setFormData({ ...formData, password2: e.target.value });
                  }}
                  fontSize={13}
                  placeholder="6~12자 영문,숫자,특수문자 2가지이상 조합"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSignUp} // Add this line.
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                회원가입
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
