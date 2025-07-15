<template>
  <div class="h-full w-full flex flex-row space-x-20 mr-24 overflow-hidden">
    <ProfileCard></ProfileCard>
    <div class="h-full flex-1 overflow-y-auto space-y-10 px-8">
      <WelcomeCard></WelcomeCard>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from "@/components/ProfileCard.vue";
import WelcomeCard from "@/components/WelcomeCard.vue";
</script>
