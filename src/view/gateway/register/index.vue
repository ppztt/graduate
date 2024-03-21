<template>
  <div class="box">
    <div class="loginbox">
      <div class="title">用户注册</div>
      <div class="logo"></div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="账号： " prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式： " prop="phone">
          <el-input v-model="ruleForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱： " prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            show-password />
        </el-form-item>
        <el-form-item label="确认密码：" prop="prePassword">
          <el-input
            v-model="ruleForm.prePassword"
            type="password"
            show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginButton" @click="submitForm(ruleFormRef)">注册</el-button>
          <el-button class="loginButton" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script setup lang="ts">
    import { reactive,  ref, getCurrentInstance} from "vue";
    import { LoginData } from "@/type/login";
    import { response } from "@/type/common";
    import { useRouter } from "vue-router";
    import type { FormInstance } from "element-plus";

    // 工具实例
    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $error = proxy.$error
    const $success = proxy.$success
    const router = useRouter();

    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive(new LoginData().ruleForm);
    
    const validatePass = (rule: any, value: any, callback: any) => {
        if (value !== ruleForm.password) {
            callback(new Error('两次密码输入不一致'))
        } else {
            callback()
        }
    }
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
            }
        ],
        phone: [
            {
                required: true,
                message: "请输入联系方式",
                trigger: "blur",
            },
            {
                min: 8,
                max: 11,
                message: "长度为8或者11位字符",
                trigger: "blur",
            }
        ],
        email: [
            {
                required: true,
                message: "请输入邮箱",
                trigger: "blur",
            }
        ],
        prePassword: [
            {
                required: true,
                message: '请确认密码',
                trigger: 'blur'
            },
            {
                validator: validatePass,
                trigger: 'blur'
            },
            {
                min: 6,
                max: 15,
                message: "长度为6-15位字符",
                trigger: "blur",
            }
        ]
    };
    const submitForm = async (formEl: FormInstance | undefined) => {
        console.log(!formEl)
        if (!formEl) return;
        const params: Object = {
            user_name: ruleForm.username,
            password: ruleForm.password,
            phone: ruleForm.phone,
            email: ruleForm.email,
            role_level: 6
        }
        formEl.validate((valid: Boolean) => {
            if(valid) {
                $api.User.addUser(params).then((res:  response) => {
                    if(res.result) {
                        $success('注册成功')
                        router.push('/gateway/login')
                    } else {
                        $error(res.message)
                    }
                })
            }else {
                $error('请按照要求填写！')
            }
        })
    }
    const resetForm = (formEl: FormInstance | undefined) => {
        if(!formEl) return
        formEl.resetFields()
        ruleForm.username = "";
        ruleForm.password = "";
        ruleForm.phone = ""
        ruleForm.email = ""
        ruleForm.prePassword = ''
    };
</script>
  <style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
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