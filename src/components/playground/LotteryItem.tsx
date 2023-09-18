import React from "react";
import { LotteryItemProps, LotteryItemState } from "./lotto";

export default class LotteryItem extends React.Component<
    LotteryItemProps,
    LotteryItemState
> {
    timer?: NodeJS.Timeout;

    constructor(props: LotteryItemProps) {
        super(props);
        this.state = {
            number: "?",
            decryptingDone: "",
        };
    }

    decryptEffect() {
        this.setState({ decryptingDone: "" });
        this.timer = setInterval(() => {
            this.randomNumber();
        }, 10);
        setTimeout(() => {
            this.setState({
                decryptingDone: "done",
                number: this.props.number,
            });

            this.timer && clearInterval(this.timer);
        }, 100 * +this.props.index + 100);
    }

    randomNumber() {
        this.setState({ number: Math.round(Math.random() * 44) + 1 });
    }

    componentDidUpdate(nextProps: LotteryItemProps) {
        const { decrypting } = this.props;
        if (nextProps.decrypting !== decrypting) {
            if (decrypting) {
                this.decryptEffect();
            }
        }
    }

    render() {
        return (
            <div
                className={`ball ${this.props.color} ${this.state.decryptingDone}`}
            >
                {this.state.number}
            </div>
        );
    }
}
