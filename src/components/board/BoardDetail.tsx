"use client";

import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { BoardListData } from "./BoardList";

const TextArea = () => {
  return (
    <Textarea
      id="temp-510410707"
      className="ed textarea"
      resize="none"
      overflow="hidden"
      overflowWrap="break-word"
      height="60px"
    />
  );
};

export default function BoardDetail() {
  return (
    <Box width="100%" height="100%" display="flex">
      <Container maxW={"5xl"} height="100%">
        <Box
          width={{ base: "100%", md: "100%" }}
          height={{ base: "100%", md: "100%" }}
          textAlign="left"
          mt={150}
        >
          {/* Title */}
          <Box height="40px" fontSize={23} fontWeight={"900"}>
            제목제목
          </Box>
          <Box
            height="40px"
            fontSize={15}
            bg={useColorModeValue("gray.100", "gray.600")}
            display="flex"
            alignItems="center"
            borderRadius={10}
          >
            <Text ml={3}>닉네임</Text>
          </Box>
          <Box height="100%" fontSize={16} mt={150}>
            컨텐츠 내용
            https://image.istarbucks.co.kr/upload/common/img/main/2023/autumn_img.png
            <Image
              rounded={"md"}
              alt={"product image"}
              src={
                "https://image.istarbucks.co.kr/upload/common/img/main/2023/autumn_img.png"
              }
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
            컨텐츠 내용222
            <Image
              rounded={"md"}
              alt={"product image"}
              src={
                "https://image.istarbucks.co.kr/upload/common/img/main/2023/autumn_img.png"
              }
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
            <Image
              rounded={"md"}
              alt={"product image"}
              src={
                "https://image.istarbucks.co.kr/upload/common/img/main/2023/autumn_img.png"
              }
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
            <Box
              height="50px"
              display="flex"
              mt={10}
              mb={10}
              justifyContent="center"
              alignItems="center"
            >
              <Button mr={10}>👍추천</Button>
              <Button>👎비추천</Button>
            </Box>
            {/* 댓글 위 */}
            <Box
              height="175px"
              borderBottom="1px solid rgba(0, 0, 0, 0.3)"
            ></Box>
            {/* 댓글 */}
            <Box mt={15}>
              <Box fontSize={21} fontWeight={700} height={50}>
                <ChatIcon />
                100개의 댓글
              </Box>
              <Box height={60} fontSize={14}>
                <Box
                  borderRadius={10}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  height={5}
                >
                  댓글 작성자 닉네임
                </Box>
                <Box mt={4} ml={3}>
                  댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용
                </Box>
              </Box>
              <Box height={80} mt={15}>
                <TextArea></TextArea>
                <Box
                  height="50px"
                  display="flex"
                  mt={5}
                  justifyContent={"right"}
                >
                  <Button mr={10}>댓글등록</Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            mt={150}
            mb={20}
            alignItems="center"
            justifyContent="center"
            border="1px "
          >
            <BoardListData></BoardListData>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
