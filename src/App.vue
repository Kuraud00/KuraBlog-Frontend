<template>
  <div class="bg-slate-200 w-screen h-screen flex flex-row">
    <SideNavigator />
    <div class="px-14 py-10">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideNavigator from "./components/SideNavigator.vue";
import HeadNavigator from "./components/HeadNavigator.vue";
</script>
