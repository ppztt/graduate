<template>
    <el-dialog 
        title="修改密码"
        center
        v-model="props.isShow"
        width="30%"
        @close="closeDialog">
        <el-form
            ref="reviseFormRef"
            :model="reviseForm"
            :rules="reviseFormValidate"
            label-width="120px">
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input 
                    v-model="reviseForm.oldPassword"
                    placeholder="请输入旧密码"
                    show-password>
                </el-input>
            </el-form-item>
            <el-form-item label="设置新密码" prop="newPassword">
                <el-input 
                    v-model="reviseForm.newPassword"
                    placeholder="请输入新密码"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="reNewPassword">
                <el-input 
                    v-model="reviseForm.reNewPassword"
                    placeholder="请输入确认密码"
                    show-password></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="modifyPassword">提交</el-button>
            <el-button  @click="closeDialog">取消</el-button>
        </span>
    </el-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref, defineProps, defineEmits } from 'vue'
    import { passwordForm } from '@/type/userManage.ts'
    import type { FormInstance, FormRules } from 'element-plus'
    const emit = defineEmits(['closeDialog'])
    const props = defineProps({
        isShow: {
            type: Boolean,
            default: false
        },
        userInfo: {
            type: Object,
            default: {}
        }
    })
    const reviseFormRef = ref<FormInstance>()
    const reviseFormValidate = reactive<FormRules<passwordForm>>({
        oldPassword: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        newPassword: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        reNewPassword: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ]
    })
    let reviseForm = reactive<passwordForm>({
        oldPassword: '',
        newPassword: '',
        reNewPassword: '',
    })


    const closeDialog = () => {
        emit('closeDialog', 'modifyPw')
    }
    const modifyPassword = () => {}
</script>

<style scoped>

</style>