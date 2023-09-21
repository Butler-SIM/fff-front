//FreeBoardList.tsx
import {
  Table,
  Thead,
  Tbody, Tr,
  Th,
  Td, Box,
  Container,
  Text,
  useColorModeValue,
  Button,
  Flex
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useEffect } from "react";
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

      <Button alignSelf="flex-end">
        <ChakraLink as={ReactRouterLink} to="/free-board/writing">글쓰기</ChakraLink>
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
            <Tr>
              <Td>
                <ChakraLink as={ReactRouterLink} to="/board/detail/:boardId">
                  <Text isTruncated maxWidth="130px">
                    {item.title}{" "}
                    <Text as="span" color="red">
                      ({item.comment_count})
                    </Text>
                  </Text>
                </ChakraLink>
              </Td>

              <Td>millimetres</Td>
              <Td>{item.recommend}</Td>
            </Tr>
          ))}

        </Tbody>
      </Table>
    </Box>
  );
}


export default function FreeBoard() {
  const displayFlex = useBreakpointValue({ base: "block" });

  return (
    <Container maxW={"5xl"}>
      <Box mt={150} mb={20}>
        <FreeBoardList title="자유"></FreeBoardList>
      </Box>
    </Container>
  );
}

