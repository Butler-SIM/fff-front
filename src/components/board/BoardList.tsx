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
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

type DataItem = {
  title: string;
  comment: number;
};

function BoardListData(props: any) {
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
    <Box width={{ base: "100%", md: "1200px" }}>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        width={useBreakpointValue({ base: "385px", md: "800px" })}
      >
        {props.title ? props.title : ""}
        65t
      </Box>

      <Table
        variant="simple"
        width={useBreakpointValue({ base: "385px", md: "800px" })}
        fontSize={useBreakpointValue({ base: "10px", md: "13px" })}
        mt={20}
      >
        <Thead>
          <Tr>
            <Th width={useBreakpointValue({ base: "130px", md: "550px" })}>
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
        width={{ base: "100%", md: "1200px" }}
        mt={150}
        mb={20}
        alignItems="center"
        justifyContent="center"
      >
        <BoardListData title={"Today Best"}></BoardListData>
      </Box>
    </Container>
  );
}
