// lotto.ts

export interface LotteryBoxProps {}

export interface LotteryBoxState {
    number: number[];
    excludedNumbers: string[]; // Update this line
    effect: boolean;
    isExcludeModalOpen: boolean;
}




export interface LotteryItemProps {
    index: string;
    number: number;
    decrypting: boolean;
    color: string;
}

export interface LotteryItemState {
    decryptingDone: string;
    number: number | string;
}