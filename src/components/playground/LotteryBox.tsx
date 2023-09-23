import React from "react";
import LotteryItem from "./LotteryItem";
import { LotteryBoxProps, LotteryBoxState } from "./lotto";
import {
  Flex,
  Box,
  Container,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

const numbers = Array.from(Array(45), (_, i) => i + 1);

export default class LotteryBox extends React.Component<
  LotteryBoxProps,
  LotteryBoxState
> {
  constructor(props: LotteryBoxProps) {
    console.log("몇번?")
    super(props);
    this.state = {
      number: [0, 0, 0, 0, 0, 0],
      effect: false,
      excludedNumbers: [],
      isExcludeModalOpen: false,
    };
  }
  
  randomize = () => {
    if (!this.state.effect) {
      const excludedSet = new Set(this.state.excludedNumbers.map(Number)); // 제외할 숫자를 숫자 형태의 Set으로 변환
      const availableNumbers = numbers.filter((num) => !excludedSet.has(num)); // 제외된 숫자를 제외한 사용 가능한 번호들
      const arr = [];
      for (let i = 0; i < this.state.number.length; i++) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const randomNumber = availableNumbers.splice(randomIndex, 1)[0];
        arr.push(randomNumber);

        if (arr.length === this.state.number.length) break;
      }

      this.setState({ number: arr.sort((a, b) => a - b), effect: true });

      setTimeout(() => {
        this.setState({ effect: false });
      }, 1000);
    }
  };

  render() {
    return (
      <Container maxW={"5xl"}>
        <Box width={"100%"} height={"800px"} mt={200}>
          <Text mb={50} fontSize={40} fontWeight={800}>
            로또 번호 생성기
          </Text>

          {/* 제외된 숫자  */}
          <Box
            id="excludedNumbers"
            display="flex"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            alignItems="center"
            justifyContent="left"
            mb={10}
          >
            <Text>제외된 숫자 : </Text>
            {this.state.excludedNumbers
              .slice() // 원본 배열을 수정하지 않기 위해 복사한 후 정렬합니다.
              .sort((a, b) => Number(a) - Number(b)) // 낮은 순서로 정렬합니다.
              .map((numStr: string, index: number) => {
                let bgColor;
                const num = Number(numStr);
                if (num >= 1 && num <= 10) {
                  bgColor = "#d5dc0a";
                } else if (num >= 11 && num <= 20) {
                  bgColor = "#69c8f2";
                } else if (num >= 21 && num <= 30) {
                  bgColor = "#ff7272";
                } else if (num >= 31 && num <= 40) {
                  bgColor = "#aaa";
                } else if (num >= 41 && num <= 45) {
                  bgColor = "#17b63a";
                }

                return (
                  <Text
                    key={index}
                    className="smallBall"
                    bg={bgColor}
                  >
                    {num}
                  </Text>
                );
              })}
          </Box>

          {/* Add this line */}
          <div id="numbers">
            {this.state.number.map((num, index) => {
              let color;
              if (num >= 1 && num <= 10) {
                color = "yellow ball";
              } else if (num >= 11 && num <= 20) {
                color = "blue ball";
              } else if (num >= 21 && num <= 30) {
                color = "red ball";
              } else if (num >= 31 && num <= 40) {
                color = "grey ball";
              } else if (num >= 41 && num <= 45) {
                color = "green ball";
              } else {
                color = "grey ball";
              }

              return (
                <LotteryItem
                  key={index}
                  index={index.toString()}
                  color={color}
                  number={num}
                  decrypting={this.state.effect}
                />
              );
            })}
          </div>
          <div>
            <Button
              id="btn"
              className={this.state.effect ? "hide" : ""}
              onClick={this.randomize}
              mt={25}
            >
              번호 뽑기!
            </Button>

            {/* 숫자 제외 버튼 추가 */}
            <Button
              colorScheme="red"
              onClick={() => this.setState({ isExcludeModalOpen: true })}
              mt={25}
              ml={10}
            >
              숫자 제외하기
            </Button>

            {/* 숫자 제외 모달 창 */}
            <Modal
              isOpen={this.state.isExcludeModalOpen}
              onClose={() => this.setState({ isExcludeModalOpen: false })}
            >
              <ModalOverlay />
              <ModalContent width={400}>
                <ModalHeader>제외할 숫자 선택</ModalHeader>
                <ModalBody>
                  {/* 체크박스 그룹으로 모든 숫자 표시 */}
                  {/* 체크박스가 변경될 때마다 excludedNumbers 업데이트 */}
                  <CheckboxGroup
                    value={this.state.excludedNumbers}
                    onChange={(values: string[]) => {
                      // Add type annotation here
                      if (values.length > 25) {
                        alert("25개까지만 제외 가능합니다.");
                        return;
                      }
                      this.setState({ excludedNumbers: values }); // Save as strings
                    }}
                  >
                    {numbers.map((num) => {
                      // num이 한 자리 수인 경우 앞에 공백 두 개를 추가
                      const displayNum = num < 10 ? `0${num}` : num.toString();

                      return (
                        // 각 체크박스는 해당 숫자를 value로 가짐
                        // key prop으로 num을 전달하여 리액트가 각 요소를 식별할 수 있게 함
                        // displayNum 값을 사용하여 표시
                        <Checkbox value={displayNum} key={num} mr={1.5}>
                          {displayNum}
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => this.setState({ isExcludeModalOpen: false })}
                  >
                    닫기
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </Box>
      </Container>
    );
  }
}
