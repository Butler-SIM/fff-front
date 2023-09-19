// LotteryBox.tsx

import React from "react";
import LotteryItem from "./LotteryItem";
import { LotteryBoxProps, LotteryBoxState } from "./lotto";
import { Flex, Box, Container, Button, Text } from "@chakra-ui/react";

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
          <Text mb={50} fontSize={40} fontWeight={800}>로또 번호 생성기</Text>
          <div id="numbers">
          {this.state.number.sort((a,b)=>a-b).map((num,index)=>{
                let color;
                if(num >=1 && num <=10){
                  color = "yellow ball"
                } else if(num >=11 && num <=20){
                  color = "blue ball"
                } else if(num >=21 && num <=30){
                  color = "red ball"
                } else if(num >=31 && num <=40){
                  color = "grey ball"
                } else if(num >=41 && num <=45){
                  color = "green ball"
                } else {
                  color = "grey ball"
                }
                
               return (
                 <LotteryItem
                   key={index}
                   index={index.toString()}
                   color={color}
                   number={num}
                   decrypting={this.state.effect}
                 />
               )
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
            </div>
            
          </Box>
      </Container>
    );
  }
}
