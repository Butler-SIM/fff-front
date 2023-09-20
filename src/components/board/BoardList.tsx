import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Container,
  Text,
  useColorModeValue,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

type DataItem = {
  title: string;
  comment: number;
};

export function BoardListData(props: any) {
  const [dataList, setDataList] = useState<DataItem[]>([
    { title: "t1adfadsfda", comment: 1 },
    { title: "taadsfadsf2", comment: 2 },
    { title: "tgsfggffsdgfgsdgsfdgsfd3", comment: 3 },
    { title: "t4sgsgfdfgsdfgsdgfsd", comment: 4 },
    { title: "t4sgsgfdfgsdfgsdgfsd", comment: 5 },
    { title: "t4sgsgfdfgsdfgsdgfsd", comment: 6 },
    { title: "t4sgsgfdfgsdfgsdgfsd", comment: 7 },
    { title: "t4sgsgfdfgsdfgsdgfsd", comment: 8 },
    { title: "t4sgsgfdfgsdfgsdgfsd", comment: 9 },
    { title: "t4sgsgfdfgsdfgsdgfsd", comment: 10 },
  ]);

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
        <ChakraLink as={ReactRouterLink} to="/free/writing">글쓰기</ChakraLink>
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
          {dataList.map((item) => (
            <Tr>
              <Td>
                <ChakraLink as={ReactRouterLink} to="/board/detail/:boardId">
                  <Text isTruncated maxWidth="130px">
                    {item.title}{" "}
                    <Text as="span" color="red">
                      ({item.comment})
                    </Text>
                  </Text>
                </ChakraLink>
              </Td>

              <Td>millimetres</Td>
              <Td>5</Td>
            </Tr>
          ))}
          <Tr>
            <Td>
              <Text isTruncated maxWidth="130px">
                inchㄴㄹadsafddfasadfsadfsdfdffad
              </Text>
            </Td>
            <Td>millimetres</Td>
            <Td>254</Td>
          </Tr>
          <Tr>
            <Td>
              <Text isTruncated maxWidth="130px">
                inchㄴㄹadsafddfasadfsadfsdfdffad
              </Text>
            </Td>
            <Td>centimetres</Td>
            <Td>3048</Td>
          </Tr>
          <Tr>
            <Td>
              <Text isTruncated maxWidth="130px">
                inchㄴㄹadsafddfasadfsadfsdfdffad
              </Text>
            </Td>
            <Td>metres</Td>
            <Td>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

export default function Main() {
  const displayFlex = useBreakpointValue({ base: "block" });

  return (
    <Container maxW={"5xl"}>
      <Box
        mt={150}
        mb={20}
      >
        <BoardListData title={"Today Best"}></BoardListData>
      </Box>
    </Container>
  );
}
