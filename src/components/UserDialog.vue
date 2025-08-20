<template>
  <el-dialog v-model="isVisible" :title="titleText" width="500" class="font-medium">
    <el-form
      :model="loginForm"
      label-position="right"
      label-width="auto"
      :rules="loginRules"
      ref="loginFormRef"
      v-if="isLoginMode"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>

    <el-form
      :model="registerForm"
      label-position="right"
      label-width="auto"
      :rules="registerRules"
      ref="registerFormRef"
      v-if="!isLoginMode"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="password">
        <el-input
          v-model="registerForm.e_password"
          type="password"
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="handleSubmit(isLoginMode ? loginFormRef : registerFormRef)">{{
      titleText
    }}</el-button>
    <el-button type="info" @click="handleSwitch()">{{ switchText }}</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { type FormInstance, type FormRules } from "element-plus";
import UserAPI from "@/utils/api/user";
import { useUserStore } from "@/stores/User";

const isVisible = ref(false);
const isLoginMode = ref(true);
const userStore = useUserStore();

const titleText = computed(() => {
  return isLoginMode.value ? "登录" : "注册";
});

const switchText = computed(() => {
  return isLoginMode.value ? "前往注册" : "前往登录";
});

// 向上暴露openDialog方法
const openDialog = () => {
  isVisible.value = true;
};
defineExpose({ openDialog });

// 登陆规则

interface LoginRuleForm {
  username: string;
  password: string;
}

const loginFormRef = ref<FormInstance>();
const loginForm = reactive<LoginRuleForm>({
  username: "",
  password: "",
});

const loginRules = reactive<FormRules<LoginRuleForm>>({
  username: [{ required: true, message: "Please input username", trigger: "blur" }],
  password: [{ required: true, message: "Please input password", trigger: "blur" }],
});

// 注册规则

interface RegisterRuleForm extends LoginRuleForm {
  e_password: string;
}

const registerFormRef = ref<FormInstance>();
const registerForm = reactive<RegisterRuleForm>({
  username: "",
  password: "",
  e_password: "",
});

const registerRules = reactive<FormRules<RegisterRuleForm>>({
  username: [{ required: true, message: "Please input username", trigger: "blur" }],
  password: [{ required: true, message: "Please input password", trigger: "blur" }],
  e_password: [{ required: true, message: "Please input password again", trigger: "blur" }],
});

const handleSubmit = async (form: FormInstance | undefined) => {
  if (!form) {
    // 驳回
    return;
  }
  await form.validate((valid) => {
    if (!valid) {
      return;
    }
    // 如果是注册，还要额外校验一次password和e_password一不一样，不一样驳回
    if (!isLoginMode.value && registerForm.password != registerForm.e_password) {
      ElMessage.error("密码不一致");
      return;
    }

    handleRequest();
  });
};

const handleSwitch = () => {
  isLoginMode.value = !isLoginMode.value;
};

const handleRequest = async () => {
  try {
    const currentForm = isLoginMode.value ? loginForm : registerForm;
    const username = currentForm.username;
    const password = currentForm.password;

    const response = isLoginMode.value
      ? await UserAPI.login(username, password)
      : await UserAPI.register(username, password);

    if (response.data.code === 0) {
      throw new Error("Wrong username or password");
    }
    localStorage.setItem("jwt_token", response.data.data);
    ElMessage.success("Success");
    userStore.update();
    isVisible.value = false;
  } catch (error) {
    ElMessage.error(error);
  }
};
</script>
