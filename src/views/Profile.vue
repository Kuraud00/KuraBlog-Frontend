<template>
  <div id="app" class="container mx-auto max-w-6xl">
    <PersonalInfo />
  </div>
</template>

<script setup lang="ts">
import PersonalInfo from "@/components/PersonalInfo.vue";
</script>

<style scoped>
.avatar-upload .el-upload {
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-upload .el-upload:hover {
  border-color: #409eff;
}
</style>
