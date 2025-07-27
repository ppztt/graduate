<template>
  <div class="box">
    <div class="loginbox">
      <div class="title">维权管理系统</div>
      <div class="logo"></div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="90px"
        class="demo-ruleForm">
        <el-form-item label="账号： " prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            @keyup.enter="submitForm(ruleFormRef)"
            type="password"
            autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginButton" @click="() => submitForm(ruleFormRef)">登录</el-button>
          <el-button class="loginButton" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { reactive,  ref, getCurrentInstance} from "vue"
import { LoginData } from "../type/login"
import { type responseType } from "../type/common"
import { useRouter } from "vue-router"
import type { FormInstance } from "element-plus"

const $request = useApi()
const $message = useMessage()
const router = useRouter()
const { user } = useStore()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive(new LoginData().ruleForm)
const rules = {
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
    {
      min: 3,
      max: 12,
      message: "长度为3-12位字符",
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
      message: "长度为6-15位字符",
      trigger: "blur",
    },
  ],
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const params: Object = {
    user_name: ruleForm.username,
    password: ruleForm.password
  }
  formEl.validate((valid: Boolean) => {
    if(valid) {
      $request.User.login(params).then((res:  responseType) => {
        if(res.result) {
          $message('登陆成功', 'success')
          user.updateUserInfo(res.data)
          user.updateIsLogin(true)
          router.push('/back_way/dash_board')
        } else {
          $message(res.message || '登陆失败', 'error')
        }
      })
    }else {
      $message('请按照要求填写！', 'error')
    }
  })
};
const resetForm = () => {
  ruleForm.username = ""
  ruleForm.password = ""
}
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