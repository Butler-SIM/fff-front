import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Textarea,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import Editor from "../common/CkEditor";
import { useState } from "react";
import axios, { AxiosError } from "axios"; // axios import 추가
import { useNavigate } from "react-router-dom";
import { axiosAuthApi } from "../../lib/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


export function EtcWritingComponent({ category, categoryWriting }: { category: string, categoryWriting:string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const handleContentChange = (data: string) => {
    setContent(data);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    const requestData = {
      title: title,
      content: content,
    };

    try {
      const response = await axiosAuthApi.post(
        `/etc-board/${categoryWriting}/`,
        requestData 
      );

      navigate(`/etc/${categoryWriting}/${response.data.id}`, { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // axios로 에러 처리 변경
        const err: AxiosError<any> = error; // AxiosError 타입에 대한 제네릭 추가
        if (err.response?.status === 401) {
          alert("회원만 글쓰기가 가능합니다");
        } else {
          alert("문제가 발생하였습니다. 잠시 후 다시 시도하세요.");
        }
      }
    }
  };

  return (
    <Box width="100%" height="100%" display="flex">
      <Container maxW={"5xl"} height="100%" padding={4}>
        <Box textAlign="left" mt={150} mb={20}>
          <Box height="40px" fontSize={30} fontWeight={"900"}>
            {category}
          </Box>
          <Input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            w="100%"
            h={50}
            mt={10}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Box mt={20}>
            <Editor onChange={handleContentChange} />
          </Box>

          <Button onClick={handleSubmit}>등록</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default function EtcWriting() {
  // lastUrlSegment에 따라 category 값 설정
  const lastUrlSegment = useSelector(
    (state: RootState) => state.url.lastSegment
  );

  let category = "";
  let categoryWriting = "";

  if (lastUrlSegment === "bug") {
    category = "버그 제보";
    categoryWriting = "bug";
  } else if (lastUrlSegment === "suggestions") {
    category = "문의/건의";
    categoryWriting = "suggestions";
    // 필요한 만큼 추가적인 조건을 여기에 추가할 수 있습니다.
    // else if (lastUrlSegment === '<another-segment>') { ... }
  } else {
    category = "";
    categoryWriting = "";
  }
  return (
    <Container maxW={"5xl"}>
      <Box mt={150} mb={20}>
        <EtcWritingComponent categoryWriting={categoryWriting} category={category}></EtcWritingComponent>
      </Box>
    </Container>
  );
}