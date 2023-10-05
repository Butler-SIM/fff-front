"use client";
import Cookies from "js-cookie";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Text, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { AxiosError } from 'axios';
import { useLocation } from "react-router-dom";
import FreeBoard from "./FreeBoardList";
import { timeFromNow } from "../../common";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosApi, axiosAuthApi } from "../../lib/api/api";
import HumorBoard from "./HumorBoardList";
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

export function HumorBoardDetailItem() {
  const [boardData, setBoardData] = useState<any>(null);
  const location = useLocation();
  const currentUrl = location.pathname;
  const splitted = currentUrl.split("/");
  const lastElement = splitted[splitted.length - 1];

  const handleLike = async () => {
    const cookieKey = `recommend-${boardData.id}`;
    if (Cookies.get(cookieKey)) {
      alert("이미 추천하였습니다.");
      return;
    }
    
    try {
      await axiosAuthApi.put(`http://localhost:8000/humor-board/${boardData.id}/recommend`);
      await setBoardData((prevState: any) => ({
        ...prevState,
        recommend: prevState.recommend + 1,
      }));
      Cookies.set(cookieKey, "true");
      alert("추천!");
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        const err: AxiosError = error;
        if (err.response?.status === 401 || err.response?.status === 403) {
          alert("회원만 가능합니다");
        }
        
        // handle other errors as needed
      }
      
    }
  };
  
  const handleDislike = async () => {
  
     const cookieKey = `not_recommend-${boardData.id}`;
     if (Cookies.get(cookieKey)) {
       alert("이미 비추천하였습니다.");
       return;
     }
  
     try{
       await axiosAuthApi.put(`http://localhost:8000/humor-board/${boardData.id}/not-recommend`);
       await setBoardData((prevState: any) => ({
         ...prevState,
         not_recommend: prevState.not_recommend + 1,
       }));
       Cookies.set(cookieKey, "true");
       alert("비추!");
       
     }catch(error){
       
       if(axios.isAxiosError(error)){
         const err : AxiosError = error;
  
         if(err.response?.status ===401 || err.response?.status ===403){
          alert("회원만 가능합니다");
         }
  
         // handle other errors as needed 
       }
  
     }
  };


  useEffect(() => {
    const boardId = lastElement;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/humor-board/${boardId}`
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

        {/* 따봉 */}
        <Box
          height="50px"
          display="flex"
          mt={10}
          mb={10}
          justifyContent="center"
          alignItems="center"
        >
          <Button mr={10} onClick={handleLike}>
            👍추천{" "}
            <Text ml={2} fontWeight={800}>
              {boardData.recommend}{" "}
            </Text>
          </Button>
          <Button onClick={handleDislike}>
            👎비추천
            <Text ml={2} fontWeight={800}>
              {boardData.not_recommend}{" "}
            </Text>
          </Button>
        </Box>
        {/* 댓글 위 */}
        <Box height="175px" borderBottom="1px solid rgba(0, 0, 0, 0.3)"></Box>
        {/* 댓글 */}
        <Box fontSize={21} fontWeight={700} height={50}>
          <ChatIcon mr={2} />
          {boardData.comment_count} 개의 댓글
        </Box>
      </Box>
    </Box>
  );
}

export function HumorBoardDetailComment() {
  const [commentText, setCommentText] = useState(""); // 댓글 입력값 상태 관리
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태 관리
  const location = useLocation();
  const currentUrl = location.pathname;
  const splitted = currentUrl.split("/");
  const lastElement = splitted[splitted.length - 1];
  const boardId = lastElement;

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // 입력값 변경 처리 함수
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async () => {
    // 댓글 등록 처리 함수
    try {
      await axiosAuthApi.post(`http://localhost:8000/humor-board/comments/`, {
        humor_board: boardId,
        comment: commentText,
      });
      setCommentText(""); // 폼 초기화
      fetchComments();
    } catch (error: any) {
      // here we assert the type of error as 'any'
      console.error(error);

      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            alert("회원만 댓글 작성이 가능합니다.");
            break;
          case 500:
            alert("문제가 생겼습니다 잠시 후 다시 시도하세요");
            break;
          default:
            // For all other status codes
            alert(`An error occurred: ${error.message}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        alert("문제가 생겼습니다 잠시 후 다시 시도하세요");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("문제가 생겼습니다 잠시 후 다시 시도하세요");
      }
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosApi.get(
        `http://localhost:8000/humor-board/comments/?humor_board_id=${boardId}`
      );
      setComments(response.data.results || []); // results 가 없으면 빈 배열 설정
    } catch (error) {
      console.error(error);
      
      setComments([]); // 에러 발생 시에도 comments를 빈 배열로 설정a
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 처음으로 댓글 목록 가져오기
    fetchComments();
  }, [location.pathname]);
  return (
    <Box mt={15} textAlign={"left"}>
      {comments.map((comment) => (
        <Box
          key={comment.id}
          fontSize={14}
          mb={5}
          borderBottom="1px solid #EAEDF0"
        >
          <Box height={5} fontWeight={800} fontSize={17} mb={2}>
            {comment.user.nickname}
          </Box>
          <Box ml={4}>{comment.comment}</Box>
        </Box>
      ))}
      <Box height={80} mt={15}>
        <TextArea
          value={commentText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleCommentChange(e)
          }
        />

        <Box height="50px" display="flex" mt={5} justifyContent={"right"}>
          <Button mr={10} onClick={handleCommentSubmit}>
            댓글등록
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default function HumorBoardDetail() {
  return (
    <Container maxW={"5xl"}>
      <Box mt={150} mb={20}>
        <HumorBoardDetailItem></HumorBoardDetailItem>
        <HumorBoardDetailComment></HumorBoardDetailComment>
      </Box>
      {/* 하단 글 리스트  */}
      <Box mt={100} mb={20}>
        <HumorBoard></HumorBoard>
      </Box>
    </Container>
  );
}
