import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { JwtChecker } from "./api/jwt";

// 创建实体对象
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// 是否正在刷新令牌的Promise
let refreshTokenPromise: Promise<string> | null = null;

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("jwt_token");

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const message = response.data.message;
    const code = response.data.code;
    if (message === "EXPIRED_TOKEN") {
      localStorage.removeItem("jwt_token");
    }
    return response;
  },
  async (error: AxiosError) => {
    // 断言error.config为InternalAxiosRequestConfig类型并增添_retry属性
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 认证错误时，若从未更新令牌过，则重试
    // 具体来说，只有第一次遇到401错误时刷新令牌，若刷新后仍然返回401，则表明刷新令牌（refreshToken）也失效了，需要用户重新登陆来获取新的refreshToken和accessToken
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    // 开始重新获取令牌
    try {
      // 这里逻辑还没有完善，直接掐断
      throw error;

      // 若没有在获取令牌，则尝试获取令牌
      if (!refreshTokenPromise) {
        refreshTokenPromise = JwtChecker.refreshAccessToken();
      }

      const newAccessToken = await refreshTokenPromise;
      refreshTokenPromise = null;

      localStorage.setItem("jwt_token", newAccessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = newAccessToken;
      }

      // 根据修改过后的header重新发送一模一样的请求
      return axiosInstance(originalRequest);
    } catch (error) {
      // 刷新令牌失败，清除存储并跳转到登录页
      localStorage.removeItem("jwt_token");
      // localStorage.removeItem("refreshToken");
      // window.location.href = "/login";
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
