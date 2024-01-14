<template>
    <el-dialog 
        title="新增后台用户"
        center
        v-model="props.isShow"
        width="50%"
        @close="closeDialog">
        <el-form
            ref="formData"
            :model="formData"
            label-width="90px">
            <el-form-item label="用户名" prop="account">
                <el-input v-model="formData.account" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realname">
                <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="所属角色" prop="roleId">
                <el-select v-model="formData.roleId" placeholder="请选择所属角色">
                    <el-option
                        :disabled="roleId == 2 && (item.id === 1 || item.id === 2)"
                        v-for="(item, index) in roleList"
                        :value="item.id"
                        :label="item.name"
                        :key="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                    label="所属市"
                    prop="city"
                    v-show="formData.roleId == 2 || formData.roleId == 3">
                <el-select
                        v-model="formData.city"
                        placeholder="请选择所属市"
                        :disabled="formData.roleId == 1 || roleId == 2 || roleId == 3"
                        :clearable="true"
                        filterable
                        @change="cityChange(formData.city)">
                    <el-option
                            v-for="(item, index) in regionData"
                            :key="index"
                            :value="item.name"
                    >{{ item.name }}
                    </el-option
                    >
                </el-select>
            </el-form-item>
            <el-form-item
                    label="所属区县"
                    prop="district"
                    v-show="formData.roleId == 3 ">
                <el-select
                        v-model="formData.district"
                        placeholder="请选择所属区县"
                        :disabled="formData.roleId == 1"
                        :clearable="true"
                        filterable
                        @on-change="districtChange(formData.district)">
                    <el-option
                            v-for="item in districtData"
                            :key="item.name"
                            :value="item.name"
                            :label="item.name">
                    </el-option
                    >
                </el-select>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input  v-model="formData.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input  v-model="formData.phone" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input 
                    type="password"
                    :password="true"
                    v-model="formData.password"
                    placeholder="请输入登录密码"
                    show-password>
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPassword">
                <el-input 
                    type="password"
                    :password="true"
                    v-model="formData.newPassword"
                    placeholder="请输入确认密码"
                    show-password>
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="sub('newAdd')">提交</el-button>
            <el-button  @click="reset()">重置</el-button>
        </span>
    </el-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref, defineProps, defineEmits } from 'vue'
    import { addForm } from '@/type/userManage'
    const emit = defineEmits(['closeDialog'])
    const props = defineProps({
        isShow: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        dialogTitle: {
            type: String,
            default: ''
        }
    })
    let formData = reactive<addForm>(
        {
                account: "",
                address: "",
                city: "",
                district: "",
                email: "",
                newPassword: "",
                password: "",
                phone: "",
                realname: ""
        })

    const closeDialog = () => {
        emit('closeDialog', 'add')
    }
</script>

<style scoped>

</style>