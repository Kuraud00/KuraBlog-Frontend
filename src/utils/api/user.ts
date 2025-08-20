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
    return axiosInstance.put("user", data);
  },
};

export default UserAPI;
