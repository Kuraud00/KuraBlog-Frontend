<template>
  <div class="bg-slate-200 w-screen h-screen flex md:flex-row overflow-y-auto">
    <SideNavigator class="hidden md:block" />
    <div class="px-14 py-10 flex-1">
      <RouterView v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
          enter-active-class="transition-opacity duration-300 ease-out"
          leave-active-class="transition-opacity duration-200 ease-in"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNavigator from "./components/SideNavigator.vue";
import HeadNavigator from "./components/HeadNavigator.vue";
import { useUserStore } from "./stores/User";
import { onMounted } from "vue";

onMounted(() => {
  const userStore = useUserStore();
  userStore.update();
});
</script>
