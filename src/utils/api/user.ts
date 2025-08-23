import axiosInstance from "../axios";

const UserAPI = {
  async login(username: string, password: string) {
    return axiosInstance.post("/login", {
      username: username,
      password: password,
    });
  },

  async register(username: string, password: string) {
    return axiosInstance.post("/register", {
      username: username,
      password: password,
    });
  },

  async getById(id: number) {
    return axiosInstance.get(`/user/${id}`);
  },

  async getMyself() {
    return axiosInstance.get("/user");
  },

  async updateMyself(data) {
    return axiosInstance.put("/user", data);
  },

  async uploadAvatar(formData: FormData) {
    return axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 必须设置 multipart 格式
      },
    });
  },
};

export default UserAPI;
