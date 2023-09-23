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
    super(props);
    this.state = {
      number: [0, 0, 0, 0, 0, 0],
      effect: false,

      // Change this line
      excludedNumbers: [],

      isExcludeModalOpen: false,

      // Add this line
      selectedExcludeCount: null,
    };
  }

  randomize = () => {
    if (!this.state.effect) {
      const excludedSet = new Set(this.state.excludedNumbers.map(Number)); // Exclude numbers in Set form
      const availableNumbers = numbers.filter((num) => !excludedSet.has(num)); // Available numbers excluding the excluded ones

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

          {/* Excluded Numbers */}
          <Box
            id="excludedNumbers"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            alignItems="center"
            justifyContent="left"
            mb={10}
          >
            <Box>
              <Text>
                제외된 숫자 : ({this.state.excludedNumbers.length}개){" "}
              </Text>
            </Box>

            {this.state.excludedNumbers
              .slice()
              .sort((a, b) => Number(a) - Number(b))
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
                  <Checkbox
                    key={index}
                    value={num.toString()}
                    isChecked={this.state.excludedNumbers.includes(
                      num.toString()
                    )}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        // Add the number to excludedNumbers array
                        this.setState((prevState) => ({
                          excludedNumbers: [
                            ...prevState.excludedNumbers,
                            num.toString(),
                          ],
                        }));
                      } else {
                        // Remove the number from excludedNumbers array
                        this.setState((prevState) => ({
                          excludedNumbers: prevState.excludedNumbers.filter(
                            (n) => n !== num.toString()
                          ),
                        }));
                      }
                    }}
                  >
                    <Text className="smallBall" bg={bgColor}>
                      {num}
                    </Text>
                  </Checkbox>
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

            {/* Exclude Number Button */}
            <Button
              colorScheme="red"
              onClick={() => this.setState({ isExcludeModalOpen: true })}
              mt={25}
              ml={10}
            >
              숫자 제외하기
            </Button>

            {/* Exclude Number Modal */}
            <Modal
              isOpen={this.state.isExcludeModalOpen}
              onClose={() => this.setState({ isExcludeModalOpen: false })}
            >
              <ModalOverlay />
              <ModalContent width={400}>
                <ModalHeader>제외할 숫자 선택</ModalHeader>
                <ModalBody>
                  {/* Checkbox group showing all numbers */}
                  {/* Update excludedNumbers every time the checkbox changes */}
                  <CheckboxGroup
                    value={this.state.excludedNumbers.map((num) =>
                      Number(num) < 10 ? `0${num}` : num.toString()
                    )}
                    onChange={(values: string[]) => {
                      // Add type annotation here
                      if (values.length > 30) {
                        alert("30개까지만 제외 가능합니다.");
                        return;
                      }

                      // Change this line
                      this.setState({ excludedNumbers: values });
                    }}
                  >
                    {numbers.map((num) => {
                      // Add two spaces in front of the number if it is a single digit
                      const displayNum = num < 10 ? `0${num}` : num.toString();

                      return (
                        // Each checkbox has its own number as its value
                        // Passes the key prop to allow React to identify each element
                        // Uses the displayNum value for display
                        <Checkbox value={displayNum} key={num} mr={1.5}>
                          {displayNum}
                        </Checkbox>
                      );
                    })}
                  </CheckboxGroup>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                  <Button
                    colorScheme="red"
                    mr={3}
                    onClick={() => {
                      const excludeCount =
                        Number(this.state.selectedExcludeCount) ?? null;

                      if (
                        excludeCount === null ||
                        excludeCount + this.state.excludedNumbers.length > 30
                      ) {
                        alert("30개까지 제외할 수 있습니다.");
                        return;
                      }

                      let availableNumbers = numbers.filter(
                        (num) =>
                          !this.state.excludedNumbers.includes(num.toString())
                      );

                      for (let i = 0; i < excludeCount; i++) {
                        if (availableNumbers.length === i) {
                          break;
                        }

                        const randomIndex = Math.floor(
                          Math.random() * availableNumbers.length
                        );

                        const randomNumber = availableNumbers.splice(
                          randomIndex,
                          1
                        )[0];

                        // Update the state directly in the loop instead of after the loop finishes.
                        this.setState((prevState) => ({
                          excludedNumbers: [
                            ...prevState.excludedNumbers,
                            randomNumber.toString(),
                          ],
                        }));
                      }
                    }}
                  >
                    랜덤 숫자 제외하기
                  </Button>

                  <div>
                    <select
                      onChange={(e) => {
                        this.setState({
                          selectedExcludeCount: Number(e.target.value),
                        });
                      }}
                      defaultValue=""
                    >
                      {/* Add an empty option for default value */}
                      <option value="" disabled hidden>
                        0
                      </option>

                      {Array.from({ length: 30 }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        )
                      )}
                    </select>

                    <Button
                      colorScheme="teal"
                      ml={15}
                      onClick={() => {
                        this.setState({
                          excludedNumbers: [],
                          selectedExcludeCount: null,
                        });
                      }}
                    >
                      초기화
                    </Button>
                  </div>

                  <Button
                    colorScheme="blue"
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
