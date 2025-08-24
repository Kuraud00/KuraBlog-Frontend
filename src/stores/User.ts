import { defineStore } from "pinia";
import { ref } from "vue";
import UserAPI from "@/utils/api/user";

export interface user {
  username?: string;
  description?: string;
  avatar?: string;
  birthday?: string;
  email?: string;
}

export const useUserStore = defineStore("User", () => {
  const username = ref(null);
  const description = ref(null);
  const avatar = ref(null);
  const birthday = ref(null);
  const email = ref(null);
  const registerTime = ref(null);

  async function refresh() {
    try {
      const response = await UserAPI.getMyself();
      username.value = response.data.data.username;
      description.value = response.data.data.description;
      avatar.value = response.data.data.avatar;
      birthday.value = response.data.data.birthday;
      email.value = response.data.data.email;
      registerTime.value = response.data.data.registerTime;
    } catch (error) {
      ElMessage.error(error.message || "刷新失败");
    }
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    username.value = null;
    description.value = null;
    avatar.value = null;
    birthday.value = null;
    email.value = null;
    registerTime.value = null;
  }

  async function update(data: user) {
    try {
      await UserAPI.updateMyself(data);
      await this.refresh();
      ElMessage.success("更新完成");
    } catch (error) {
      ElMessage.error(error.message || "更新失败");
    }
  }

  async function uploadAvatar(formData: FormData) {
    try {
      const response = await UserAPI.uploadAvatar(formData);
      avatar.value = response.data.data;
      ElMessage.success("上传成功");
    } catch (error) {
      ElMessage.error(error.message || "上传失败");
    }
  }

  return {
    username,
    description,
    avatar,
    birthday,
    email,
    registerTime,
    refresh,
    logout,
    update,
    uploadAvatar,
  };
});
