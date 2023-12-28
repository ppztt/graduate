<template>
  <div class="box">
    <div class="loginbox">
      <div class="title">监督投诉管理系统</div>
      <div class="logo"></div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="90px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号： " prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginButton" @click="submitForm">登录</el-button>
          <el-button class="loginButton">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "@/type/login";
//   import { login } from "../request/api";
import { useRouter } from "vue-router";
import type { FormInstance } from "element-plus";

const router = useRouter();
const ruleForm = reactive(new LoginData().ruleForm);
const rules = {
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
    {
      min: 3,
      max: 5,
      message: "Length should be 3 to 5",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 15,
      message: "Length should be 6 to 15",
      trigger: "blur",
    },
  ],
};
const submitForm = async (formEl: FormInstance | undefined) => {
  // if (!formEl) return;
  router.push('/home')
};
// 登录
const ruleFormRef = ref<FormInstance>();
// 重置
const resetForm = () => {
  ruleForm.username = "";
  ruleForm.password = "";
};
</script>
  <style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  background: url(../assets/bg.png) no-repeat;
  background-size: 100%;
}
.loginbox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: 400px;
  background: #fff;
  border-radius: 15px;
  .title {
    position: absolute;
    top: 30px;
    transform: translateY(-50%);
    font-size: 28px;
  }
  .logo {
    width: 60px;
    height: 60px;
    background: url(../assets/vue.svg) no-repeat;
    background-size: 100%;
  }
  .demo-ruleForm {
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding-right: 85px;
  }
  .loginButton {
    width: 48%;
  }
  h2 {
    margin-bottom: 5px;
  }
}
</style>