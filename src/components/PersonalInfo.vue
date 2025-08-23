<template>
  <div class="profile-card bg-white rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- 头像区域 -->
    <div class="flex flex-col items-center md:border-r md:pr-8 border-gray-200">
      <div class="relative mb-8">
        <img
          :src="userStore.avatar || '#'"
          class="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <el-tooltip content="更换头像" placement="top">
          <el-upload
            class="avatar-upload absolute bottom-2 right-2"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <el-button type="primary" circle class="!w-10 !h-10">
              <i class="fa-solid fa-camera"></i>
            </el-button>
          </el-upload>
        </el-tooltip>
      </div>

      <h2 class="text-2xl font-bold text-gray-800 mb-2">
        {{ userStore.username || "未设置用户名" }}
      </h2>
      <p class="text-gray-600 text-sm">
        {{ userStore.description || "这个人很懒，什么都没有写～" }}
      </p>

      <div class="mt-6 flex space-x-4">
        <el-button type="primary" @click="handleClick">
          <i class="fa-solid fa-pencil mr-2"></i>编辑信息
        </el-button>
        <el-button type="danger" @click="handleLogout">
          <i class="fa-solid fa-right-from-bracket"></i>登出
        </el-button>
      </div>
    </div>

    <!-- 详细信息区域 -->
    <div class="md:col-span-2">
      <h3 class="text-xl font-semibold text-gray-700 mb-6 pb-2 border-b border-gray-200">
        个人详细信息
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <p class="text-sm text-gray-500">用户名</p>
          <p class="text-lg font-medium text-gray-800 flex items-center">
            <i class="fa-solid fa-user mr-2"></i>
            {{ userStore.username || "未设置" }}
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-sm text-gray-500">电子邮箱</p>
          <p class="text-lg font-medium text-gray-800 flex items-center">
            <i class="fa-solid fa-envelope mr-2"></i>
            {{ userStore.email || "未设置" }}
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-sm text-gray-500">生日</p>
          <p class="text-lg font-medium text-gray-800 flex items-center">
            <i class="fa-solid fa-cake-candles mr-2"></i>
            {{ formattedDate || "未设置" }}
          </p>
        </div>

        <div class="space-y-1">
          <p class="text-sm text-gray-500">注册时间</p>
          <p class="text-lg font-medium text-gray-800 flex items-center">
            <i class="fa-solid fa-calendar-days mr-2"></i>
            {{ formattedRegisterDate || "未设置" }}
          </p>
        </div>

        <div class="md:col-span-2 space-y-1">
          <p class="text-sm text-gray-500">个人简介</p>
          <p class="text-lg text-gray-800 leading-relaxed p-4 rounded-lg">
            {{ userStore.description || "暂无个人简介" }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <EditDialog ref="editDialogRef" />
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";
import { ref, computed } from "vue";
import router from "@/router";
import type { UploadProps } from "element-plus";
import EditDialog from "@/components/EditDialog.vue";

const userStore = useUserStore();
const editDialogRef = ref();

const handleClick = () => {
  editDialogRef.value.updateEditForm();
  editDialogRef.value.openDialog();
};

const handleLogout = () => {
  router.push("/home");
  userStore.logout();
};

// UTC时区转换
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formattedDate = computed(() => {
  return formatDate(userStore.birthday);
});

const formattedRegisterDate = computed(() => {
  return formatDate(userStore.registerTime);
});

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("头像必须是JPG格式的文件");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小不可大于2MB");
    return false;
  }
  return true;
};
</script>

<style scoped>
.profile-card {
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.15);
}
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
