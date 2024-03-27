<template>
    <div class="toolbar">
        <el-button  type="primary" @click="showDialog('add')">新增后台用户</el-button>
        <el-button  type="primary">导出</el-button>
    </div>
    <div>
        <zt-table :loading="loading" :data="userList">
            <el-table-column
                v-for="item in columns"
                :key="item.key"
                :prop="item.key"
                :label="item.title">
                <template #default="{row}">
                    <span>{{ item.show ? item.show(row[item.key]) || '--' : row[item.key] || '--' }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="操作">
                <template #default="{row}">
                    <div class="actions" :id="row.id">
                        <el-button text type="primary" @click="showDialog('modify', row.id)">
                            编辑
                        </el-button>
                        <el-button text type="primary" @click="modifyPW(row.id)">
                            重置密码
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </zt-table>
    </div>
    <user-info-dialog 
        v-if="isShow" 
        ref="userDialog"
        :user-id="userId" 
        :is-edit="isEdit" 
        :role-list="roleList.filter((item: any) => item.role_name !== '超级管理员')"
        @isShowFalse="isShowFalse">
    </user-info-dialog>
    <modify-pw-dialog :is-show="modifyPw" @closeDialog="closeDialog"></modify-pw-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref, getCurrentInstance, onMounted, nextTick } from 'vue'
    import modifyPwDialog from './components/modifyPwDialog.vue'
    import userInfoDialog from './components/userInfoDialog.vue'
    import { formatDate } from '@/utils';
    const { proxy }: any = getCurrentInstance() 
    const $api = proxy.$api
    const columns = [
            {
                title: "用户名",
                key: "user_name",
            },
            {
                title: '用户等级',
                key: 'role_level',
                show: (val: number) => {
                    if (!Array.isArray(roleList.value)) return
                    return roleList.value.find(item => item.role_level === val).role_name
                }
            },
            {
                title: "创建时间",
                key: "create_time",
                show: (date: Date) => {
                    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
                }
            },
            {
                title: "更新时间",
                key: "update_time",
                show: (date: Date) => {
                    return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
                }
            }
    ]
    const userDialog = ref<any>()
    const userId = ref<number>(-1)
    let loading = ref(false)
    let userList = ref([])
    let roleList = ref([])
    // 修改密码弹出框
    let modifyPw = ref(false)
    let isShow = ref(false)
    let isEdit = ref(false)
    const closeDialog = (val: string) => {
        switch (val) {
            case 'modifyPw':
                modifyPw.value = false
                break;
            default:
                isShow.value = false
                break;
        }
    }
    const showDialog = (val: string, id?: number = -1) => {
        isShow.value = true
        if (val === 'modify') {
            isEdit.value = true
        }
        userId.value = id
        nextTick(() => {
            userDialog.value.showDialog()
        })
    }
    const isShowFalse = () => {
        isShow.value = false
    }
    const getData = async () => {
        const params = {
            page: 1,
            size: 10
        }
        try {
            const res = await $api.User.getData()
            if (res.result) {
                userList.value = res.data
            }
        } catch (error) {
            
        }
    }
    const getRoleList = async () => {
        try {
            const res = await $api.Role.getRoleList()
            if (res.result) {
                roleList.value = res.data
            }
        } catch (error) {
            
        }
    }
    onMounted(() => {
        getRoleList()
        getData()
    })
</script>

<style lang="scss" scoped>
    .toolbar{
        display: flex;
        box-sizing: border-box;
        align-items: center;
        height: 60px;
        background: #fff;
        padding: 20px;
        margin-bottom: 10px;
    }
</style>