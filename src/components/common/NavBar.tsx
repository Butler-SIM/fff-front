"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { AuthContext, useAuth } from "./Auth/AuthContext";
import { AxiosError } from "axios";
import { axiosAuthApi } from "../../lib/api/api";
import { getUserInfoByToken } from "../../lib/api/userApi";

interface Props {
  link: String;
}
interface UserInfo {
  id: number;
  nickname: string;
  profile_image: string;
}

const NavLink = (props: any) => {
  return (
    <ChakraLink
      as={ReactRouterLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={props.link}
    >
      {props.name}
    </ChakraLink>
  );
};

export default function CustomNav() {
  const authCtx = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {}, [authCtx.isLoggedIn]);

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    authCtx.setIsLoggedIn(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 유저 정보 가져오기
    getUserInfoByToken().then(({ res }) => {
      if (res?.status === 200) {
        setUserInfo(res.data);
      }
    });
  }, [authCtx.isLoggedIn]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={300} alignItems={"center"}>
            <Box>
              <ChakraLink as={ReactRouterLink} to="/">
                UcoPia
              </ChakraLink>
            </Box>
            <HStack
              as={"nav"}
              spacing={15}
              display={{ base: "none", md: "flex" }}
              ml={30}
              fontSize={17}
            >
              <NavLink name={"베스트"} link={"/board-list"}></NavLink>
              <NavLink name={"자유"} link={"/free-board"}></NavLink>
              <NavLink name={"익명"} link={"dd"}></NavLink>
              <NavLink name={"커뮤니티"} link={"dd"}></NavLink>
              <NavLink name={"놀이터"} link={"/lotto"}></NavLink>
              <NavLink name={"기타"} link={"dd"}></NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ColorModeSwitcher></ColorModeSwitcher>

            {!authCtx.isLoggedIn ? ( // Not logged in
              <Button as={"a"} fontSize={"sm"} fontWeight={400}>
                <ChakraLink as={ReactRouterLink} to="/login">
                  로그인
                </ChakraLink>
              </Button>
            ) : (
              // Logged in
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={userInfo?.profile_image || "public/no_profile.png"} // 프로필 이미지가 없을 경우 기본 이미지 사용
                  />
                </MenuButton>
                <MenuList fontSize={16}>
                  {/* 닉네임 */}
                  <MenuItem fontSize={13}>{userInfo?.nickname}</MenuItem>{" "}
                  <MenuItem fontWeight={600}> <NavLink name={"마이페이지"} link={"/mypage"}></NavLink></MenuItem>
                  <MenuDivider />
                  <MenuItem fontWeight={600} onClick={handleLogout}>
                    로그아웃
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink name={"베스트"} link={"/board-list"}></NavLink>
              <NavLink name={"자유"} link={"/free-board"}></NavLink>
              <NavLink name={"익명"} link={"dd"}></NavLink>
              <NavLink name={"커뮤니티"} link={"dd"}></NavLink>
              <NavLink name={"놀이터"} link={"/lotto"}></NavLink>
              <NavLink name={"기타"} link={"dd"}></NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
