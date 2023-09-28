//userApi.ts
import { AxiosError } from 'axios';
import { axiosAuthApi, axiosApi } from './api';


const userInfoData = {
  id: 367,
  marketing_check: '0',
  date_of_birth: null,
  date_joined: '2022-05-23T15:35:29.172959',
  nickname: 'superfine_conf797625',
  profile_image: null,
  sns_profile_image: null,
  first_name: '',
  email: 'testsim13@naver.com',
  description: '나를 한마디로 소개해주세요',
  preference: [],
  statistics: {
    posts_count: 0,
    follower_count: 0,
    following_count: 0,
  },
  check: null,
  is_staff: false,
  name: '심완우2',
  phone_number: '01054154689',
  gender: '남자',
  birth_year: '1995',
  birth_day: '0818',
  is_bag_deposit: false,
  main_delivery_info: {
    address: '123',
    delivery_type: '123' || null,
  },
};

export type UserInfo = typeof userInfoData;
export const getUserInfo = async (userId: number | string) => {
  return axiosAuthApi
    .get<UserInfo>(`/user/${userId}`)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const getUserInfoByToken = async () => {
  // 토큰으로 현재 유저 정보 조회
  return axiosAuthApi
    .get('/accounts/user')
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export interface GetUserListReq {
  page?: number;
  search?: string;
  start_date?: string;
  end_date?: string;
  group?: string;
}

export const USER_LIST_GROUP_FILTER = [
  { id: 'FILTER01', name: '미구매' },
  { id: 'FILTER02', name: '첫 구매 후 2주 이상 미구매' },
  { id: 'FILTER03', name: '2회 이하 구매' },
  { id: 'FILTER04', name: '3회 이상 구매' },
];

export interface GetUserListRes {
  list: UserInfo[];
}

export const getUserList = async (params: GetUserListReq) => {
  return axiosAuthApi
    .get<GetUserListRes>(`/user`, { params })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export interface LoginUserInfo {
  access_token: string;
  refresh_token: string;
  user: UserInfo;
}

export interface UpdateUserInfoByTokenReq {
  nickname?: string;
  description?: string;
  birth_year?: string;
  birth_day?: string;
  the_age_group?: string;
  phone_number?: string;
  name?: string;
  gender?: string;
}

export const updateUserInfoByToken = async (params: UpdateUserInfoByTokenReq) => {
  const paramsFilter = { ...params };
  if (paramsFilter.phone_number) paramsFilter.phone_number = paramsFilter.phone_number.replaceAll('-', '');

  return axiosAuthApi
    .put<UserInfo>('/accounts/user_info', { params: paramsFilter })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

interface LoginReqParams {
  email: string;
  password: string;
}

export const login = async (params: LoginReqParams) => {

  return axiosApi
    .post<LoginUserInfo>(`/accounts/login`, params)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

interface SignUpReqParams {
  email: string;
  password1: string;
  password2: string;
  nickname: string;
  code: string;
}


export const signUp = async (params: SignUpReqParams) => {
  return axiosAuthApi
    .post<{ data: SignUpReqParams }>(`/accounts/signup`, params)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const checkAdminByEmail = async (email: string) => {
  return axiosAuthApi
    .get(`/user/admin/check/${email}`)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const checkAdminByToken = async () => {
  return axiosAuthApi
    .get(`/user/admin/by_token/check`)
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const kakaoLogin = async (access_token: string) => {
  return axiosAuthApi
    .post<LoginUserInfo>('/social/kakao/login', { access_token })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export interface KakaoTokenReq {
  redirection_uri: string;
  code: string;
}

export interface KakaoTokenRes {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export const getKakaoToken = async ({ code, redirection_uri }: KakaoTokenReq) => {
  return axiosAuthApi
    .get<KakaoTokenRes>('https://kauth.kakao.com/oauth/token', {
      params: {
        grant_type: 'authorization_code',
        client_id: '80087b6e7ff6d1252e9f6fb8c5b55eb8',
        code,
        redirection_uri,
      },
    })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const checkExistUser = async (email: string) => {
  return axiosAuthApi
    .get<{ member: 'True' | 'False' }>('/user/member_check', {
      params: { email },
    })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

const kakaoInfoData = {
  profile_nickname_needs_agreement: false,
  profile_image_needs_agreement: false,
  profile: {
    nickname: '심완우',
    thumbnail_image_url: 'http://k.kakaocdn.net/dn/SWOe2/btry8OSydca/ABeBiK0MvJ1yxHaaLP0ojK/img_110x110.jpg',
    profile_image_url: 'http://k.kakaocdn.net/dn/SWOe2/btry8OSydca/ABeBiK0MvJ1yxHaaLP0ojK/img_640x640.jpg',
    is_default_image: false,
  },
  name_needs_agreement: false,
  name: '심완우',
  has_email: true,
  email_needs_agreement: false,
  is_email_valid: true,
  is_email_verified: true,
  email: 'dhksdn4689@naver.com',
  has_phone_number: true,
  phone_number_needs_agreement: false,
  phone_number: '+82 10-5415-4689',
  has_age_range: true,
  age_range_needs_agreement: false,
  age_range: '20~29',
  has_birthyear: true,
  birthyear_needs_agreement: false,
  birthyear: '1995',
  has_birthday: true,
  birthday_needs_agreement: false,
  birthday: '0818',
  birthday_type: 'SOLAR',
  has_gender: true,
  gender_needs_agreement: false,
  gender: 'male',
};

export type KakaoInfo = typeof kakaoInfoData;
export const getKakaoInfo = async (kakao_access_token: string) => {
  return axiosAuthApi
    .get<KakaoInfo>('/social/kakao_info', { params: { kakao_access_token } })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const certificateEmail = async (email: string) => {
  return axiosAuthApi
    .get('/emails/send/reset_password', { params: { email } })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const refreshToken = async (email: string) => {
  return axiosAuthApi
    .post('/accounts/token/refresh/', { params: { email } })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};


export const deleteUsers = async (ids: number[]) => {
  return axiosAuthApi
    .delete(`/user/delete`, { data: { user: ids } })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export interface SendResetPasswordRes {
  id: 1;
  subject: '슈퍼파인 인증 코드 발송';
  message: '인증번호 : 602656';
  code: 602656;
  type: 'reset_password';
  created_date: '2022-05-24T13:11:22.664304';
  updated_date: '2022-05-24T13:11:22.695310';
  is_used: false;
  user: 356;
}

export const sendResetPasswordCode = async (email: string) => {
  return axiosAuthApi
    .post<SendResetPasswordRes>(`/emails/send/reset_password`, { email })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const sendJoinEmailCode = async (email: string) => {
  return axiosAuthApi
    .post<SendResetPasswordRes>(`/emails/send/join_email_certified`, { email })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const verificationResetPasswordCode = async (code: string, email: string) => {
  return axiosAuthApi
    .put<{
      message?: 'verified';
      detail?: 'Not found.';
    }>(`/emails/code/verification`, { code, email })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const verificationJoinEmailCode = async (code: string, email: string) => {
  return axiosAuthApi
    .put<{
      message: 'verified' | 'The code is different.' | 'already used';
    }>(`/emails/check/join_email_code`, { code, email })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};

export const updateResetPassword = async (email: string, password1: string, password2: string) => {
  return axiosAuthApi
    .put(`/user/password_reset`, { email, password1, password2 })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};


export interface NickNameValidate {
  nickname: string;
}

export const nickNameValidateReq = async (nickname: string) => {
  return axiosAuthApi
    .post<NickNameValidate>(`/accounts/nickname-validation`, { nickname })
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};


export interface SenEmailCode {
  type:string;
  email: string;
}

export const sendEmailCode = async (params: SenEmailCode) => {
  return axiosAuthApi
    .post<any>(`/accounts/email/send`, params) 
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};


export interface EmailCodeVerification {
  code:string;
  email: string;
}

export const emailCodeVerification = async (params: EmailCodeVerification) => {
  return axiosAuthApi
    .post<any>(`/accounts/email/verify`, params) 
    .then((res) => ({ res, err: null }))
    .catch((err: AxiosError) => ({ res: null, err }));
};


export default {
  getUserInfo,
  getUserInfoByToken,
  updateUserInfoByToken,
  login,
  signUp,
  checkAdminByEmail,
  checkAdminByToken,
  getKakaoToken,
  kakaoLogin,
  getKakaoInfo,
  certificateEmail,
  deleteUsers,
  sendResetPasswordCode,
  verificationResetPasswordCode,
  sendJoinEmailCode,
  verificationJoinEmailCode,
  updateResetPassword,
  checkExistUser,
  getUserList,
  nickNameValidateReq,
  sendEmailCode,
  emailCodeVerification,
};
