<template>
  <aside class="top-0 flex flex-row items-center">
    <!-- 侧边栏区域 -->
    <div
      class="font-bold text-2xl text-slate-50 h-screen hadow-xl bg-slate-600 py-2 select-none flex-col flex transition-all"
      :class="{ 'w-40': isNavigatorOpen, 'w-4': !isNavigatorOpen }"
    >
      <span
        class="h-20 text-center rounded-lg transition-colors overflow-hidden text-4xl content-center font-wdxl mb-8"
        v-if="isNavigatorOpen"
        to="/home"
      >
        KuraBlog
      </span>
      <RouterLink
        v-for="item in menuItems"
        class="text-center hover:bg-slate-500 rounded-lg transition-colors mx-2 font-roboto text-xl mb-4"
        :to="item.direction"
        v-if="isNavigatorOpen"
      >
        <i :class="item.icon"></i>
        {{ item.description }}
      </RouterLink>
    </div>
    <!-- 开关区域 -->
    <aside
      class="h-32 w-4 bg-slate-600 rounded-e-2xl transition-all hover:bg-slate-500 flex items-center"
      @click="toggleNavigator()"
    >
      <i
        class="fa-solid text-white"
        :class="{ 'fa-chevron-right': !isNavigatorOpen, 'fa-chevron-left': isNavigatorOpen }"
      ></i>
    </aside>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { menuItem } from "@/types/Navigator";

const isNavigatorOpen = ref(true);
const toggleNavigator = () => {
  isNavigatorOpen.value = !isNavigatorOpen.value;
};

const menuItems: menuItem[] = [
  { icon: "fa-solid fa-house", description: "Home", direction: "/home" },
  { icon: "fa-solid fa-address-card", description: "About", direction: "/about" },
];
</script>
