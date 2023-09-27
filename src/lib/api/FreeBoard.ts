// FreeBoard.ts
import { AxiosError } from 'axios';
import { axiosAuthApi } from './api';


export interface FreeBoardItem {
  id: number;
  title: string;
  content: string;
  comment_count: string;
  views: number;
  recommend: number;
  not_recommend: number;
  user: {
    nickname: string,
    profile_image?: string
  };
  created_date?: Date | string; 
}

export interface FreeBoardResponse {
 count :number ;
 next ?:string ; 
 total_page :number ; 
 previous ?:string ;
 results :FreeBoardItem[] ;
}


export const createFreeBoardPost = async (params: FreeBoardItem) => {
  console.log("asdfafdsafdadf");
  return axiosAuthApi
    .post(`/localhost8000:/free-board/`, params)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};