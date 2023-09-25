// FreeBoard.ts
import { AxiosError } from 'axios';
import { axiosAuthApi } from './api';

export type FreeBoardItem = {
  id: number;
  title: string;
  nickname: string;
  comment_count: number;
  recommend: number;
  user: {
    nickname:string;
  };
};

export const createFreeBoardPost = async (params: FreeBoardItem) => {
  console.log("asdfafdsafdadf");
  return axiosAuthApi
    .post(`/localhost8000:/free-board/`, params)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};