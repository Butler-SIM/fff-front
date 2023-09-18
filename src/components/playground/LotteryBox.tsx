// LotteryBox.tsx

import React from "react";
import LotteryItem from "./LotteryItem";
import { LotteryBoxProps, LotteryBoxState } from "./lotto";
import { Flex, Box, Container, Button } from "@chakra-ui/react";

const numbers = Array.from(Array(45), (_, i) => i + 1);

export default class LotteryBox extends React.Component<
  LotteryBoxProps,
  LotteryBoxState
> {
  constructor(props: LotteryBoxProps) {
    super(props);
    this.state = {
      number: [0, 0, 0, 0, 0, 0, 0],
      effect: false,
    };
  }

  randomize = () => {
    if (!this.state.effect) {
      const numberCopy = [...numbers];
      const arr = [];

      for (let i = 0; i < this.state.number.length; i++) {
        const randomIndex = Math.floor(Math.random() * numberCopy.length);
        const randomNumber = numberCopy.splice(randomIndex, 1)[0];
        arr.push(randomNumber);

        if (arr.length === this.state.number.length) break;
      }

      this.setState({ number: arr, effect: true });

      setTimeout(() => {
        this.setState({ effect: false });
      }, 1000);
    }
  };

  render() {
    return (
      <Container maxW={"5xl"}>
          <Box width={"100%"} height={"800px"} mt={200}>
            <div id="numbers">
              <LotteryItem
                index="0"
                color="blue ball"
                number={this.state.number[0]}
                decrypting={this.state.effect}
              />
              <LotteryItem
                index="1"
                color="blue ball"
                number={this.state.number[1]}
                decrypting={this.state.effect}
              />
              <LotteryItem
                index="2"
                color="blue ball"
                number={this.state.number[2]}
                decrypting={this.state.effect}
              />
              <LotteryItem
                index="3"
                color="red ball"
                number={this.state.number[3]}
                decrypting={this.state.effect}
              />
              <LotteryItem
                index="4"
                color="red ball"
                number={this.state.number[4]}
                decrypting={this.state.effect}
              />
              <LotteryItem
                index="5"
                color="grey ball"
                number={this.state.number[5]}
                decrypting={this.state.effect}
              />
            </div>
            <div>
              <Button
                id="btn"
                className={this.state.effect ? "hide" : ""}
                onClick={this.randomize}
              >
                번호 뽑기!
              </Button>
            </div>
          </Box>
      </Container>
    );
  }
}
