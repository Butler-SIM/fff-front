"use client";

import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { validateEmail } from "./SignUp";
import userApi, { ValidationError } from "../../lib/api/userApi";

type ForgotPasswordFormInputs = {
  email: string;
};

export default function PasswordFind() {
  const type = "PASSWORD_CHANGE";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  // 이메일 인증 코드
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();

  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleSendEmailCode = async () => {
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
      setShowVerificationCodeInput(true); // 인증 코드 전송 후 인증 코드 입력 필드 보이기
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

  const handleVerifyCode = async () => {
    // TODO : 인증코드 검증 로직 구현
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
      setIsVerified(true);
      setShowPasswordFields(true);
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

  const handleChangePassword = async () => {
    const { res, err } = await userApi.updateResetPassword(
      email,
      code,
      password,
      confirmPassword,
      
    );

    if (res?.status === 200) {
      toast({
        position: "top",
        title: "비밀번호가 변경 되었습니다.",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login", { replace: true });
    } else if (err) {
      const errorData = err?.response?.data as ValidationError;

      if (err?.response?.status === 400) {
        toast({
          position: "top",
          title: errorData.message || errorData.error || "비밀번호를 확인해주세요",
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

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          비밀번호 찾기
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          회원 가입시 사용한 이메일을 입력 해주세요
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled={isVerified}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{ bg: "blue.500" }}
            onClick={() => {
              if (validateEmail(email)) {
                handleSendEmailCode();
              } else {
                alert("유효한 이메일 주소를 입력해주세요.");
              }
            }}
          >
            인증코드 받기
          </Button>

          {showVerificationCodeInput && (
            <>
              <FormControl id="verification-code">
                <Input
                  placeholder="인증코드"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={isVerified}
                />
              </FormControl>

              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={handleVerifyCode}
              >
                코드 확인하기
              </Button>
            </>
          )}

          {showPasswordFields && (
            <>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                비밀번호 변경
              </Heading>

              <Text align={"left"} fontSize={{ base: "sm", sm: "md" }}>
                비밀번호 :
              </Text>
              <FormControl id="password">
                <Input
                  placeholder="6~12자 영문,숫자,특수문자 2가지이상 조합"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Text align={"left"} fontSize={{ base: "sm", sm: "md" }}>
                비밀번호 확인 :
              </Text>
              <FormControl id="confirm-password">
                <Input
                  placeholder="6~12자 영문,숫자,특수문자 2가지이상 조합"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>

              {/* TODO : 비밀번호 변경 로직 구현 */}
              {/* 아래 버튼 클릭 시 비밀번호 변경 로직을 수행하도록 수정하세요 */}

              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleChangePassword}
              >
                비밀번호 변경하기
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
}
