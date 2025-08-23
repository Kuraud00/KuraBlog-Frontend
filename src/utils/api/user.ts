import { user } from "@/stores/User";
import axiosInstance from "../axios";

const UserAPI = {
  /**
   * 登录请求
   * @param username 用户名
   * @param password 密码
   * @returns axios请求
   */
  async login(username: string, password: string) {
    return axiosInstance.post("/login", {
      username: username,
      password: password,
    });
  },

  /**
   * 注册请求
   * @param username 用户名
   * @param password 密码
   * @returns axios请求
   */
  async register(username: string, password: string) {
    return axiosInstance.post("/register", {
      username: username,
      password: password,
    });
  },

  /**
   * 通过ID获取用户信息
   * @param id 用户ID
   * @returns axios请求
   */
  async getById(id: number) {
    return axiosInstance.get(`/user/${id}`);
  },

  /**
   * 获取自身信息
   * @returns axios请求
   */
  async getMyself() {
    return axiosInstance.get("/user");
  },

  /**
   * 更新自身信息
   * @param data 更新后的个人信息
   * @returns axios请求
   */
  async updateMyself(data: user) {
    return axiosInstance.put("/user", data);
  },

  /**
   * 上传头像
   * @param formData 文件信息
   * @returns axios请求
   */
  async uploadAvatar(formData: FormData) {
    return axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 必须设置 multipart 格式
      },
    });
  },
};

export default UserAPI;
