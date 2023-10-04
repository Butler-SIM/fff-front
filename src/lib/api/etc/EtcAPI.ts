// FreeBoard.ts
import { AxiosError } from "axios";
import { axiosAuthApi } from "../api";


export interface EtcBoardItem {
  id: number;
  title: string;
  content: string;
  nickname: string;
  created_date?: Date | string;
}

export interface FreeBoardResponse {
  count: number;
  next?: string;
  total_page: number;
  previous?: string;
  results: EtcBoardItem[];
}

export const createEtcBoard = async (params: EtcBoardItem, path:string) => {
  return axiosAuthApi
    .post(`/localhost8000:/etc-board/${path}`, params)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};
