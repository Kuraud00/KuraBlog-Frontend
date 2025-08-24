import { AxiosResponse } from "axios";
import axiosInstance from "../axios";

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
}

export const JwtChecker = {
  /**
   * 判断JWT是否有效
   *
   * @param jwt
   * @returns Jwt有效:true  Jwt无效:false
   */
  async isJwtAvaliable(jwt: string): Promise<boolean> {
    try {
      const response = await axiosInstance.post(`/check/${jwt}`);
      return response.data.code === 1;
    } catch (error) {
      return false;
    }
  },

  /**
   * 尝试通过RefrshToken获取新的AccessToken
   * @returns
   */
  async refreshAccessToken(): Promise<JwtResponse> {
    const refreshToken = localStorage.getItem("refreshToken");
    return axiosInstance.get(`/auth/refresh/${refreshToken}`);
  },
};
