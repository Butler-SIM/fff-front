// FreeBoardList.tsx

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
  Text,
  useColorModeValue,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import axios from "axios";
import { FreeBoardItem, FreeBoardResponse } from "../../lib/api/FreeBoard";
import Paging from "../common/paging/paging";
import { AuthContext } from "../common/Auth/AuthContext";

export function FreeBoardList(props: any) {
  const [data, setDataList] = useState<FreeBoardItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);
  const handleButtonClick = () => {
    if (!isLoggedIn) {
      alert("회원만 글쓰기가 가능합니다");
      return false;
    }
  };

  useEffect(() => {
      axios.get(`http://localhost:8000/free-board/?page=${page}`)
        .then(response => {
          const responseData : FreeBoardResponse = response.data;
          setDataList(responseData.results);
          setTotalItemsCount(responseData.count);
        })
        .catch(error => {
          console.error(error);
        });
  }, [page]);

    return (
      <Box>
         <Flex
        direction="column"
        justifyContent="space-between"
        height="100%" // Adjust as needed
      >
        <Box>
          <Box bg={useColorModeValue("gray.100", "gray.900")}>
            {props.title ? props.title : ""}
          </Box>

          <Table
            variant="simple"
            fontSize={useBreakpointValue({ base: "10px", md: "13px" })}
            mt={20}
          >
            {/* ... */}
          </Table>
        </Box>

        <Button alignSelf="flex-end" onClick={handleButtonClick}>
          <ChakraLink as={ReactRouterLink} to="/free-board/writing">
            글쓰기
          </ChakraLink>
        </Button>
      </Flex>
      
        <Table
          variant="simple"
          fontSize={useBreakpointValue({ base: "10px", md: "13px" })}
        >
          
          <Thead>
            <Tr>
              <Th width={useBreakpointValue({ base: "180px", md: "550px" })}>
                제목
              </Th>
              <Th width={useBreakpointValue({ base: "10px", md: "100px" })}>
                작성자
              </Th>
              <Th
                width={useBreakpointValue({ base: "8px", md: "30px" })}
                whiteSpace="nowrap"
              >
                추천수
              </Th>
            </Tr>
          </Thead>
          
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <ChakraLink as={ReactRouterLink} to={`/free-board/detail/${item.id}`}>
                    <Text>
                      {item.title}{" "}
                      <Text as="span" color="red">
                        ({item.comment_count})
                      </Text>
                    </Text>
                  </ChakraLink>
                </Td>

                <Td>{item.nickname}</Td> {/* 작성자 정보를 표시할 필요에 따라 수정해주세요 */}
                <Td>{item.recommend}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Paging 
           activePage={page} 
           totalItemsCount={totalItemsCount} 
           onChange={(pageNumber) => setPage(pageNumber)} />
      </Box>
    );
}

export default function FreeBoard() {

  return (
    <Container maxW={"5xl"}>
      <Box mt={150} mb={20}>
        {/* title 속성을 사용하여 제목을 전달합니다 */}
        {/* title 속성이 없는 경우 기본값으로 '자유'를 사용합니다 */}
        {/* 필요에 따라 다른 속성도 추가하실 수 있습니다 */}
        <FreeBoardList title="자유"></FreeBoardList> 
        
      </Box>
    </Container >
  );
}
