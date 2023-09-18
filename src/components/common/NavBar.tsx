"use client";

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

interface Props {
  children: React.ReactNode;
}

const Links = ["베스트", "자유", "익명", "커뮤니티", "놀이터", "기타"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function CustomNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <ChakraLink as={ReactRouterLink} to="/board/BoardList">
                베스트
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/board/BoardList">
                자유
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/board/BoardList">
                익명
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/board/BoardList">
                커뮤니티
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/lotto">
                놀이터
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/board/BoardList">
                기타
              </ChakraLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ColorModeSwitcher></ColorModeSwitcher>
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
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
