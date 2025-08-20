import axios from "axios";

// 创建实体对象
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_token");

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const message = response.data.message;
    const code = response.data.code;
    if (message === "EXPIRED_TOKEN") {
      localStorage.removeItem("jwt_token");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
