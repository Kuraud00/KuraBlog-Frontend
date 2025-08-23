import axiosInstance from "../axios";

/**
 * 判断JWT是否有效
 *
 * @param jwt
 * @returns Jwt有效:true  Jwt无效:false
 */
export async function isJwtAvaliable(jwt: string): Promise<boolean> {
  try {
    const response = await axiosInstance.post(`/check/${jwt}`);
    return response.data.code === 1;
  } catch (error) {
    return false;
  }
}
