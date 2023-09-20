import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Textarea,
  useColorModeValue,
  Input
} from "@chakra-ui/react";
import Editor from "../common/CkEditor";
import { useState } from "react";
import axios from "axios"; // axios import 추가
import { useNavigate } from "react-router-dom"; // useNavigate import 추가

export default function Writing() {
    const [title, setTitle] = useState(""); // title 상태 추가
    const [content, setContent] = useState(""); // content 상태 추가
    const navigate = useNavigate(); // navigate 변수 추가

    const handleContentChange = (data: string) => {
        setContent(data);
    };

   const handleSubmit = () => {

     if (!title || !content) { // title과 content가 비어있는지 확인
       alert('제목과 내용을 모두 입력해주세요.');
       return;
     }
     axios.post('http://localhost:8080/api/v0/post', {title, content})
     .then((res: any) => { // res의 타입을 any로 지정
       if (res.status === 200){
         navigate('/', {replace: true});
         return;
       } else{
         alert('업로드 실패');
         return;
       }
     })
   }

  return (
    <Box width="100%" height="100%" display="flex">
      <Container maxW={"5xl"} height="100%">
        <Box textAlign="left" mt={150} mb={20}>
          {/* Title */}
          <Box height="40px" fontSize={30} fontWeight={"900"}>
            제목제목
          </Box>
          <Input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            w="100%"
            h={50}
            mt={10}
            onChange={(e) => setTitle(e.target.value)} // title 상태 업데이트 추가
          />

          {/* Editor */}
          <Box>
              <Editor onChange={handleContentChange} />
          </Box>

           {/* Registration button */}
           <Button onClick={handleSubmit}>등록</Button>

        </Box>
      </Container>
    </Box>
  );
}
