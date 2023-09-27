//appUtils.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

import { LoginUserInfo } from "./api/userApi";

const kakaoChannelOpen = () => {
  if (navigator.userAgent.toLowerCase().indexOf("mobileapp") !== -1) {
    window.open(`https://pf.kakao.com/_ELRxmb/friend?api_ver=1.1`);
  } else {
    window.open(
      `https://pf.kakao.com/_ELRxmb/friend?api_ver=1.1`,
      "kakao",
      "width=350,height=509"
    );
  }
};

const setUserInfoLocalStorage = (
  data: LoginUserInfo,
  type?: "email" | "kakao"
) => {
  

  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      token: data.access_token,
      userId: data.user.id,
      email: data.user.email,
      is_staff: data.user.is_staff,
    })
  );
};

export default {
  kakaoChannelOpen,
  setUserInfoLocalStorage,
};
