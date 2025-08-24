import { error } from "console";
import axiosInstance from "../axios";

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
   * 暂时空函数
   * @returns
   */
  async refreshAccessToken(): Promise<string> {
    return;
  },
};
