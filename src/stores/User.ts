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

  async function update() {
    let response = await UserAPI.getMyself();
    console.log(response.data);
    username.value = response.data.data.username;
    description.value = response.data.data.description;
    avatar.value = response.data.data.avatar;
    birthday.value = response.data.data.birthday;
    email.value = response.data.data.email;
  }

  function logout() {
    localStorage.removeItem("jwt_token");
    username.value = null;
    description.value = null;
    avatar.value = null;
    birthday.value = null;
    email.value = null;
  }

  async function edit(data: user) {
    await UserAPI.updateMyself(data);
    await this.update();
  }

  return { username, description, avatar, birthday, email, update, logout, edit };
});
