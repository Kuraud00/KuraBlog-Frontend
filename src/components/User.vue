<template>
  <div
    class="my-4 transition-all hover:bg-slate-500 rounded-xl flex flex-row justify-center items-center"
    @click="handleClick"
  >
    <img
      :src="userStore.avatar || 'block'"
      alt="avatar"
      class="object-cover rounded-full w-14 h-14 border-slate-200 border-4 shadow-md hover:-translate-y-1 transition-all"
    />
    <span v-if="isNavigatorOpen" class="m-4 text-lg">{{ userStore.username || "User" }}</span>
  </div>

  <UserDialog ref="userDialogRef" />
</template>

<script setup lang="ts">
import UserDialog from "./UserDialog.vue";
import { ref } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/User";
import { isJwtAvaliable } from "@/utils/api/jwt";

defineProps({
  isNavigatorOpen: Boolean,
});

const userDialogRef = ref();
const userStore = useUserStore();

const handleClick = async () => {
  const jwt = localStorage.getItem("jwt_token");
  const jwtAvaliable = await isJwtAvaliable(jwt);
  if (jwt && jwtAvaliable) {
    router.push("profile");
  } else {
    if (userDialogRef.value) {
      userDialogRef.value.openDialog();
    }
  }
};
</script>
