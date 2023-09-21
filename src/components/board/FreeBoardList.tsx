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
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import axios from "axios";
import { FreeBoardItem } from "../../lib/api/FreeBoard";

export function FreeBoardList(props: any) {
    const [data, setDataList] = useState<FreeBoardItem[]>([]);

    useEffect(() => {
        // API 요청
        axios.get("http://localhost:8000/free-board/")
          .then(response => {
            setDataList(response.data.results);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    return (
      <Box>
        <Box bg={useColorModeValue("gray.100", "gray.900")}>
          {props.title ? props.title : ""}
        </Box>

        <Table
          variant="simple"
          fontSize={useBreakpointValue({ base: "10px", md: "13px" })}
          mt={20}
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
                    <Text isTruncated maxWidth="130px">
                      {item.title}{" "}
                      <Text as="span" color="red">
                        ({item.comment_count})
                      </Text>
                    </Text>
                  </ChakraLink>
                </Td>

                <Td>작성자 정보</Td> {/* 작성자 정보를 표시할 필요에 따라 수정해주세요 */}
                <Td>{item.recommend}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button alignSelf="flex-end">
          <ChakraLink as={ReactRouterLink} to="/free-board/writing">
            글쓰기
          </ChakraLink>
        </Button>

      </Box>
    );
}

export default function FreeBoard() {
  const displayFlex = useBreakpointValue({ base: "block" });

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
