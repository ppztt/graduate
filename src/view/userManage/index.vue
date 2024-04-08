<template>
    <div class="toolbar">
        <div class="left-part">
            <el-button  type="primary" @click="showDialog('add')">新增后台用户</el-button>
            <el-button  type="primary">导出</el-button>
        </div>
        <div class="right-part">
            <el-input
                v-model="user_name"
                :clearable="true"
                style="width: 240px"
                placeholder="请输入用户名"
                @keyup.enter="getData"
                @clear="getData">
                <template #append>
                    <el-button @click="getData" :icon="Search" />
                </template>
            </el-input>
        </div>
    </div>
    <div>
        <zt-table 
            :loading="loading"
            :data="userList"
            :pagination="pagination"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange">
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
                    <div class="actions">
                        <el-button text type="primary" @click="showDialog('modify', row.id)">
                            编辑
                        </el-button>
                        <el-button text type="primary">
                            重置密码
                        </el-button>
                        <el-popconfirm v-if="row.role_level > 1"  title="确认删除该用户？" @confirm="delUser(row.id)">
                            <template #reference>
                                <el-button text type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
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
        :role-list="roleList.filter(item => item.role_name !== '超级管理员')"
        @isShowFalse="isShowFalse"
        @getData="getData">
    </user-info-dialog>
    <modify-pw-dialog :is-show="modifyPw" @closeDialog="closeDialog"></modify-pw-dialog>
</template>

<script setup lang="ts">
    import { ref, getCurrentInstance, onMounted, nextTick, reactive } from 'vue'
    import { Search } from '@element-plus/icons-vue'
    import modifyPwDialog from './components/modifyPwDialog.vue'
    import userInfoDialog from './components/userInfoDialog.vue'
    import { formatDate } from '@/utils';
    import { paginationType } from '@/type/common';

    const { proxy }: any = getCurrentInstance() 
    const $api = proxy.$api
    const $success = proxy.$success
    const $error = proxy.$error

    const columns = [
            {
                title: "用户名",
                key: "user_name",
            },
            {
                title: '用户等级',
                key: 'role_level',
                show: (val: number) => {
                    if (!Array.isArray(roleList.value) || !roleList.value) return
                    return roleList.value.find((item: any) => item.role_level === val).role_name
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
    const pagination = ref<paginationType>({
        current: 1,
        size: 10,
        count: 0
    })
    const user_name = ref<string>('')
    const userDialog = ref<any>()
    const userId = ref<number>(-1)
    let loading = ref(false)
    let userList = ref([])
    let roleList = ref<any>([])
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
    const showDialog = (val: string, id: number = -1) => {
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
        loading.value = true
        const params: any = {
            page: pagination.value.current,
            size: pagination.value.size
        }
        if (user_name.value) {
            params.user_name = user_name.value
        }
        try {
            const res = await $api.User.getData(params)
            if (res.result) {
                userList.value = res.data
                pagination.value.count = res.count
                loading.value = false
            }
        } catch (error) {
            
        }
    }
    const handleSizeChange = (size: number) => {
        pagination.value.current = 1
        pagination.value.size = size
        getData()
    }
    const handleCurrentChange = (page: number) => {
        pagination.value.current = page
        getData()
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
    const delUser = async (id: number) => {
        try {
            const res = await $api.User.delUser(id)
            if (res.result) {
                $success(res.message)
                getData()
            } else {
                $error('删除失败')
            }
        } catch(error) {
            console.log(error)
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
        justify-content: space-between;
        align-items: center;
        height: 60px;
        background: #fff;
        padding: 20px;
        margin-bottom: 10px;
    }
</style>