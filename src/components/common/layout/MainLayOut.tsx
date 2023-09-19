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
  } from "@chakra-ui/react";
  import { useBreakpointValue } from "@chakra-ui/react";
  import { useState } from "react";
  import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
  import { Link as ReactRouterLink } from "react-router-dom";
  type DataItem = {
    title: string;
    comment: number;
  };
  
  function MainLayout(props : any) {
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
      <Box width={{ base: "100%", md: "550px" }} mr={10}>
        {props.title ? props.title : ""}
        <Table variant="simple">
          <Thead>
            {dataList.map((item) => (
              <Tr>
                  <Th><ChakraLink as={ReactRouterLink} to="/board/detail/:boardId">
                  {item.title}
              </ChakraLink></Th>
                  
                  <Th isNumeric>{item.comment}</Th>
              </Tr>
            ))}
          </Thead>
        </Table>
      </Box>
    );
  }
  
  export default function Main() {
    const displayFlex = useBreakpointValue({ base: "block", md: "flex" });
  
    return (
      <Container maxW={"5xl"}>
        <Box
          display={displayFlex}
          mt={35}
          alignItems="center"
          justifyContent="center"
        >
         <MainLayout title={"Today Best"}></MainLayout>
         <MainLayout title={"유머"}></MainLayout>
        </Box>
        <Box
          display={displayFlex}
          mt={35}
          alignItems="center"
          justifyContent="center"
        >
         <MainLayout title={"자유"}></MainLayout>
         <MainLayout title={"코인판"}></MainLayout>
        </Box>
        <Box
          display={displayFlex}
          mt={35}
          alignItems="center"
          justifyContent="center"
        >
         <MainLayout title={"익명"}></MainLayout>
         <MainLayout title={"주식/해외주식"}></MainLayout>
        </Box>
        <Box
          display={displayFlex}
          mt={35}
          mb={20}
          alignItems="center"
          justifyContent="center"
        >
         <MainLayout title={"스포츠"}></MainLayout>
         <MainLayout title={"공지사항"}></MainLayout>
        </Box>
      </Container>
    );
  }
  