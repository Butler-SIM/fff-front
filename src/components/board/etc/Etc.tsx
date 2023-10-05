// Etc.tsx

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

import { AuthContext } from "../../common/Auth/AuthContext";
import Paging from "../../common/paging/paging";
import { FreeBoardItem, FreeBoardResponse } from "../../../lib/api/FreeBoard";
import { EtcBoardItem } from "../../../lib/api/etc/EtcAPI";
import { RootState, useUpdateLastUrlSegment } from "../../../store";
import { useSelector } from "react-redux";

export function EtcBoardList(props: any) {
  const [data, setDataList] = useState<EtcBoardItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const { isLoggedIn } = useContext(AuthContext);

  useUpdateLastUrlSegment();

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      alert("회원만 글쓰기가 가능합니다");
      return false;
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/etc-board/${props.categoryWriting}?page=${page}`)
      .then((response) => {
        const responseData: FreeBoardResponse = response.data;
        setDataList(responseData.results);
        setTotalItemsCount(responseData.count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page, props.categoryWriting]);

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
          <ChakraLink as={ReactRouterLink} to="/etc-board/writing">
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
          </Tr>
        </Thead>

        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>
                <ChakraLink as={ReactRouterLink} to={`/etc/${props.categoryWriting}/${item.id}`}>
                  <Text>
                    {item.title}{" "}
                  </Text>
                </ChakraLink>
              </Td>
              <Td>{item.nickname}</Td>{" "}
              {/* 작성자 정보를 표시할 필요에 따라 수정해주세요 */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Paging
        activePage={page}
        totalItemsCount={totalItemsCount}
        onChange={(pageNumber) => setPage(pageNumber)}
      />
    </Box>
  );
}

export default function EtcBoard() {
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
        {/* title 속성을 사용하여 제목을 전달합니다 */}
        {/* title 속성이 없는 경우 기본값으로 '자유'를 사용합니다 */}
        {/* 필요에 따라 다른 속성도 추가하실 수 있습니다 */}
        <EtcBoardList
          title={category}
          category={category}
          categoryWriting={categoryWriting}
        ></EtcBoardList>
      </Box>
    </Container>
  );
}
