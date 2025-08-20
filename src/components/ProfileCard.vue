<template>
  <div
    class="w-[300px] h-[500px] rounded-xl bg-white shadow-round text-center pt-8 flex flex-col space-y-6 items-center select-none"
  >
    <img class="w-40 h-40 rounded-full overflow-hidden shadow-round object-cover" :src="requestURL"></img>
    <span class="font-wdxl font-bold text-3xl text-slate-600">Kuraud0</span>

    <span class="font-roboto text-md text-slate-600">
      <i class="fa-solid fa-graduation-cap"></i>
      University of Shanghai <br>for Science and Technology
    </span>

    <span class="font-wdxl text-2xl text-slate-600">
      Find me:
    </span>

    <span class="flex flex-row text-3xl space-x-6 text-slate-600 content-center">
      <a href="https://github.com/Kuraud00" target="_blank" class="transition-all hover:text-slate-400">
        <i class="fa-brands fa-github"></i>
      </a>
      <a href="https://space.bilibili.com/481177373" target="_blank" class="transition-all hover:text-slate-400">
        <i class="fa-brands fa-bilibili"></i>
      </a>
      <a href="" target="_blank" class="transition-all hover:text-slate-400">
        <i class="fa-brands fa-qq"></i>
      </a>
    </span>
  </div>
</template>

<script setup>
// QQ号配置项
const qqValue = "2756345706";
const requestURL = `https://q1.qlogo.cn/g?b=qq&nk=${qqValue}&s=640`

</script>
