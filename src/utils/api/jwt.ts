import axiosInstance from "../axios";

export async function isJwtAvaliable(jwt: string): Promise<boolean> {
  try {
    const response = await axiosInstance.post(`/check/${jwt}`);
    return response.data.code === 1;
  } catch (error) {
    return false;
  }
}
