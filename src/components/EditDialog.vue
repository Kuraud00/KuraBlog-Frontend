<template>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { user } from "@/stores/User";
import { useUserStore } from "@/stores/User";

// 向上暴露openDialog，updateEditForm方法
const showEditDialog = ref(false);
const openDialog = () => {
  showEditDialog.value = true;
};
const updateEditForm = () => {
  editForm.value.username = userStore.username;
  editForm.value.description = userStore.description;
  editForm.value.birthday = userStore.birthday;
  editForm.value.email = userStore.email;
};
defineExpose({ openDialog, updateEditForm });

const userStore = useUserStore();

const editForm = ref({
  username: userStore.username,
  description: userStore.description,
  birthday: userStore.birthday,
  email: userStore.email,
});

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
</script>

<style scoped></style>
