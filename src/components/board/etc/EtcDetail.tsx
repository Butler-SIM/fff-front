"use client";
import Cookies from "js-cookie";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Text, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { AxiosError } from 'axios';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { timeFromNow } from "../../../common";
import { axiosAuthApi, axiosApi } from "../../../lib/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// Call it once in your app. At the root of your app is the best place

const TextArea = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <Textarea
      id="temp-510410707"
      className="ed textarea"
      resize="none"
      overflow="hidden"
      overflowWrap="break-word"
      height="60px"
      value={value}
      onChange={onChange}
    />
  );
};

type Comment = {
  id: number;
  comment: string;
  state: string;
  comment_replies: string;
  reply_count: number;
  user: {
    nickname: string;
    profile_image: string;
  };
  created_date: string;
};

export function EtcDetailItem() {
  const [boardData, setBoardData] = useState<any>(null);
  const location = useLocation();
  const currentUrl = location.pathname;
  const splitted = currentUrl.split("/");
  const lastElement = splitted[splitted.length - 1];

  const lastUrlSegment = useSelector(
    (state: RootState) => state.url.lastSegment
  );


  useEffect(() => {
    const boardId = lastElement;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/etc-board/${lastUrlSegment}/${boardId}`
        );
        setBoardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.pathname]);

  if (!boardData) return null; // 데이터 로딩 중에는 null을 반환하여 아무것도 표시하지 않음

  const bgValue = boardData ? "gray.100" : "gray.600";

  return (
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
      {/* 작성자, 생성시간, 조회수 */}
      {boardData && (
        <Box
          height="40px"
          fontSize={15}
          bg={bgValue} // Use the bgValue variable here
          display="flex"
          alignItems="center"
          justifyContent="space-between" // Add this line
          borderRadius={10}
        >
          <Text ml={3}>{boardData.nickname}</Text>
          <Text mr={2} fontSize={13}>
            {timeFromNow(boardData.created_date)}
          </Text>
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




      </Box>
    </Box>
  );
}


export default function EtcDetail() {
  return (
    <Container maxW={"5xl"}>
      <Box mt={150} mb={20}>
        <EtcDetailItem></EtcDetailItem>
      </Box>
    </Container>
  );
}
