<template>
    <div class="person_center">
        <el-alert class="notice-info" title="修改信息需要填写旧密码，修改密码需要将新旧密码信息全部填写！" type="info" effect="dark" :closable="false" />
        <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
            <el-form-item
                v-for="item in labelList"
                :key="item.id"
                :label="item.label"
                :required="item.required"
                :prop="item.id">
                <el-select
                    v-if="item.id === 'role'"
                    v-model="form.role"
                    placeholder="Select"
                    disabled
                    style="width: 240px">
                    <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"/>
                </el-select>
                <el-input v-else :placeholder="'请输入'+item.label" :input-style="{width: '200px'}" v-model="form[item.id]" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(formRef)">修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { reactive, getCurrentInstance, ref, onMounted } from 'vue'
    import { personForm, labelType } from '@/type/person';
    import type { FormInstance } from "element-plus";
    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $error = proxy.$error
    const $success = proxy.$success

    const formRef = ref()
    const userInfo = ref<any>(
        JSON.parse(localStorage.getItem('userInfo') || '')
    )
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
            }
        ],
        phone: [
            {
                required: false,
                message: "请输入电话号码",
                trigger: "blur",
            },
            {
                min: 8,
                max: 12,
                message: "长度为3-12位字符",
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
        old_password: [
            {
                required: true,
                message: "请输入旧密码",
                trigger: "blur",
            },
            {
                min: 6,
                max: 15,
                message: "长度为6-15位字符",
                trigger: "blur",
            }
        ],
        new_password: [
        {
                required: false,
                message: "请输入新密码",
                trigger: "blur",
            },
            {
                min: 6,
                max: 15,
                message: "长度为6-15位字符",
                trigger: "blur",
            }
        ],
        pre_password: [
            {
                required: false,
                message: "请确认密码",
                trigger: "blur",
            },
            {
                min: 6,
                max: 15,
                message: "长度为6-15位字符",
                trigger: "blur",
            }
        ]
    }
    const labelList: Array<labelType> = [
        {
            id: 'username',
            label: '用户名',
            required: true
        },
        {
            id: 'phone',
            label: '电话号码',
            required: true
        },
        {
            id: 'email',
            label: '邮箱',
            required: true
        },
        {
            id: 'role',
            label: '所属角色',
            required: true
        },
        {
            id: 'old_password',
            label: '旧密码',
            required: true
        },
        {
            id: 'new_password',
            label: '新密码',
            required: false
        },
        {
            id: 'pre_password',
            label: '确认密码',
            required: false
        }
    ]
    const roleList = [
        {
            id: 1,
            name: '超级管理员'
        },
        {
            id: 2,
            name: '省级管理员'
        },
        {
            id: 3,
            name: '市级管理员'
        },
        {
            id: 4,
            name: '区级管理员'
        },
        {
            id: 5,
            name: '镇级管理员'
        }
    ]
    const form: personForm = reactive({
        username: userInfo.value.user_name,
        phone: userInfo.value.phone,
        email: userInfo.value.email,
        role: userInfo.value.role_level,
        old_password: '',
        new_password: '',
        pre_password: ''
    })
    const getData = async () => {
        const params = {
            id: userInfo.value.id,
            size: -1
        }
        try {
            const res = await $api.User.getData(params)
            if (res.result) {
                userInfo.value = res.data
            }
        } catch (error) {
            
        }
    }
    const onSubmit = (formEl: FormInstance | undefined) => {
        const params: any = {
            user_name: form.username,
            phone: form.phone,
            email: form.email,
            role_level: form.role,
            password: form.old_password
        }
        if(form.new_password) {
            if(form.new_password !== form.pre_password) {
                $error('两次密码不一致')
            } else {
                params.new_password = form.new_password
            }
        }
        formEl?.validate((valid) => {
            if(valid) {
                $api.User.updatePersonInfo(params, userInfo.value.id).then((res: any) => {
                    if (res.result) {
                        $success(res.message)
                        getData()
                    } else {
                        $error(res.message)
                    }
                })
            }
        })
    }
    onMounted(() => {
        getData()
    })
</script>

<style lang="scss" scoped>
.notice-info{
    margin-bottom: 20px;
}
.person_center{
    padding: 20px;
    background-color: #fff;
}
</style>