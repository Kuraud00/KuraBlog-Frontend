<template>
  <div id="app" class="container mx-auto max-w-6xl">
    <!-- 主内容区 -->
    <div class="p-6 mb-8">
      <!-- 个人信息卡片 -->
      <div
        class="profile-card bg-white rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
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
    </div>

    <!-- 统计数据区域 -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-xl p-6 shadow flex items-center">
        <div class="bg-blue-100 p-4 rounded-full mr-4">
          <el-icon class="text-blue-500 text-2xl"><document /></el-icon>
        </div>
        <div>
          <p class="text-gray-500 text-sm">文章数</p>
          <p class="text-2xl font-bold text-gray-800">24</p>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow flex items-center">
        <div class="bg-green-100 p-4 rounded-full mr-4">
          <el-icon class="text-green-500 text-2xl"><chat-dot-round /></el-icon>
        </div>
        <div>
          <p class="text-gray-500 text-sm">评论数</p>
          <p class="text-2xl font-bold text-gray-800">128</p>
        </div>
      </div>

      <div class="bg-white rounded-xl p-6 shadow flex items-center">
        <div class="bg-purple-100 p-4 rounded-full mr-4">
          <el-icon class="text-purple-500 text-2xl"><star /></el-icon>
        </div>
        <div>
          <p class="text-gray-500 text-sm">获赞数</p>
          <p class="text-2xl font-bold text-gray-800">356</p>
        </div>
      </div>
    </div> -->

    <!-- 编辑对话框 -->
    <el-dialog title="编辑个人信息" v-model="showEditDialog" width="500px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="editForm.birthday"
            type="date"
            placeholder="选择生日"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            v-model="editForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入个人简介"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="saveUserInfo">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/User";
import { ref, computed } from "vue";
import router from "@/router";
import { user } from "@/stores/User";

const userStore = useUserStore();
const showEditDialog = ref(false);

const editForm = ref({
  username: userStore.username,
  description: userStore.description,
  birthday: userStore.birthday,
  email: userStore.email,
});

const updateEditForm = () => {
  editForm.value.username = userStore.username;
  editForm.value.description = userStore.description;
  editForm.value.birthday = userStore.birthday;
  editForm.value.email = userStore.email;
};

const handleClick = () => {
  updateEditForm();
  showEditDialog.value = true;
};

const handleLogout = () => {
  router.push("/home");
  userStore.logout();
};

const saveUserInfo = async () => {
  let user: user = {
    username: editForm.value.username,
    description: editForm.value.description,
    birthday: editForm.value.birthday,
    email: editForm.value.email,
  };
  await userStore.update(user);
  showEditDialog.value = false;
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
