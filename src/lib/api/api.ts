//api.ts
import axios, { AxiosError, AxiosRequestHeaders } from "axios";

// 기본 api
export const axiosApi = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: API_URL,
});

// auth 적용된 api
export const axiosAuthApi = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: API_URL,
});


axiosAuthApi.defaults.headers.post["Content-Type"] = "application/json";
axiosApi.defaults.headers.post["Content-Type"] = "application/json";

axiosAuthApi.interceptors.request.use((config) => {
  const overideConfig = { ...config };
  const token = JSON.parse(
    window.localStorage.getItem("userInfo") || "{}"
  )?.token;
  console.log("Token:", token);
  if (token) {
    overideConfig.headers = {
      ...overideConfig.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }

  return overideConfig;
});

const clearUserInfo = () => {
  localStorage.removeItem("userInfo");
  window.location.reload();
};

let isRefresh = false;
axiosAuthApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      const originalRequest = error.config;

      const errorCode = (error.response?.data as { code?: string })?.code || "";

      if (
        (errorCode === "token_not_valid" || errorCode === "user_not_found") &&
        !isRefresh &&
        originalRequest && // originalRequest가 정의되었는지 확인
        originalRequest.url !== "/accounts/token/refresh/"
      ) {
        isRefresh = true;
        const userInfo =
          JSON.parse(localStorage.getItem("userInfo") || "{}") ?? {};

        if (userInfo.refresh && userInfo.refresh.length > 0) {
          // token 재발급
          try {
            const res = await axiosAuthApi.post<{
              access: string;
              refresh: string;
              access_token_expiration: true;
            }>("/accounts/token/refresh/", {
              refresh: userInfo.refresh,
            });

            if (res?.data) {
              const newUserInfo = {
                ...userInfo,
                token: res.data.access,
                refresh: res.data.refresh,
              };

              localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
              window.location.reload();
            } else {
              clearUserInfo();
            }
          } catch (error) {
            clearUserInfo();
          }
        }

        clearUserInfo();
      }
    }

    return Promise.reject(error);
  }
);

export default {
  axiosAuthApi,
  axiosApi,
};
