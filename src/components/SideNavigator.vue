<template>
  <aside class="top-0 flex flex-row items-center">
    <!-- 侧边栏区域 -->
    <div
      class="font-bold text-2xl text-slate-50 h-screen hadow-xl bg-slate-600 py-2 select-none flex-col flex transition-all"
      :class="{ 'w-56': isNavigatorOpen, 'w-16': !isNavigatorOpen }"
    >
      <span
        class="h-20 text-center rounded-lg transition-colors overflow-hidden text-4xl content-center font-wdxl mb-6"
        v-if="isNavigatorOpen"
        to="/home"
      >
        KuraBlog
      </span>

      <div class="bg-slate-400 w-full h-0.5 mb-4" v-if="isNavigatorOpen"></div>

      <RouterLink
        v-for="item in menuItems"
        class="text-center hover:bg-slate-500 rounded-lg transition-colors mx-2 font-roboto text-xl mb-4 py-3"
        :to="item.direction"
      >
        <i :class="item.icon"></i>
        <span class="pl-4" v-if="isNavigatorOpen">{{ item.description }}</span>
      </RouterLink>

      <div class="mt-auto text-center">
        <i
          class="fa-solid fa-down-left-and-up-right-to-center transition-colors hover:bg-slate-500 p-4 rounded-lg"
          @click="toggleNavigator"
          v-if="isNavigatorOpen"
        ></i>
        <i
          class="fa-solid fa-maximize transition-colors hover:bg-slate-500 p-4 rounded-lg"
          @click="toggleNavigator"
          v-else-if="!isNavigatorOpen"
        ></i>
      </div>
    </div>
    <!-- 开关区域
    <aside
      class="h-32 w-4 bg-slate-600 rounded-e-2xl transition-all hover:bg-slate-500 flex items-center"
      @click="toggleNavigator()"
    >
      <i
        class="fa-solid text-white"
        :class="{ 'fa-chevron-right': !isNavigatorOpen, 'fa-chevron-left': isNavigatorOpen }"
      ></i>
    </aside> -->
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
  { icon: "fa-solid fa-blog", description: "Blog", direction: "/blog" },
  { icon: "fa-solid fa-sheet-plastic", description: "Project", direction: "/project" },
];
</script>
