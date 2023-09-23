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
import { useEffect, useState, } from "react";
import axios from "axios";
import { BoardListData } from "./BoardList";
import { useLocation } from "react-router-dom";
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

export default function FreeBoardDetail() {
  const [boardData, setBoardData] = useState<any>(null);
  const location = useLocation();
  const currentUrl = location.pathname;
  const splitted = currentUrl.split("/");
const lastElement = splitted[splitted.length - 1];

console.log(lastElement);
  useEffect(() => {

    console.log(currentUrl);
    const boardId = lastElement;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/free-board/${boardId}`
        );
        setBoardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!boardData) return null; // 데이터 로딩 중에는 null을 반환하여 아무것도 표시하지 않음

  const bgValue = boardData ? "gray.100" : "gray.600";

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
            {boardData.title}
          </Box>
          {boardData && (
            <Box
              height="40px"
              fontSize={15}
              bg={bgValue} // Use the bgValue variable here
              display="flex"
              alignItems="center"
              borderRadius={10}
            >
              <Text ml={3}>닉네임</Text>
            </Box>
          )}
          <Box height="100%" fontSize={16} mt={150}>
            {/* 내용 */}
            {boardData && (
              <Box
                dangerouslySetInnerHTML={{ __html: boardData.content }}
                mt={15}
                fontSize={16}
                whiteSpace="pre-wrap" // 줄바꿈을 위해 pre-wrap 스타일 적용
              ></Box>
            )}

            {/* 따봉 */}
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
                <Box borderRadius={10} height={5}>
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
          {/* 하단 글 리스트  */}
          <Box mt={100} mb={20}>
            <BoardListData></BoardListData>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
