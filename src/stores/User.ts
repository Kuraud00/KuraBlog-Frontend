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
    let response = await UserAPI.getMyself();
    console.log(response.data);
    username.value = response.data.data.username;
    description.value = response.data.data.description;
    avatar.value = response.data.data.avatar;
    birthday.value = response.data.data.birthday;
    email.value = response.data.data.email;
    registerTime.value = response.data.data.registerTime;
  }

  function logout() {
    localStorage.removeItem("jwt_token");
    username.value = null;
    description.value = null;
    avatar.value = null;
    birthday.value = null;
    email.value = null;
    registerTime.value = null;
  }

  async function update(data: user) {
    await UserAPI.updateMyself(data);
    await this.refresh();
  }

  return { username, description, avatar, birthday, email, registerTime, refresh, logout, update };
});
