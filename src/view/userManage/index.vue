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
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="操作">
                <template #default="{row}">
                    <div class="actions" :id="row.id">
                        <el-button class="action_btn blue_text" icon="el-icon-search" @click="modifyUser(row.id)">
                            查看
                        </el-button>
                        <el-button class="action_btn blue_text" icon="el-icon-edit" @click="modifyPW(row.id)">
                            重置密码
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </zt-table>
    </div>
    <user-info-dialog :is-show="isShow" :is-edit="isEdit" :dialog-title="dialogTitle" @closeDialog="closeDialog"></user-info-dialog>
    <modify-pw-dialog :is-show="modifyPw" @closeDialog="closeDialog"></modify-pw-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue'
    import modifyPwDialog from './components/modifyPwDialog.vue'
    import userInfoDialog from './components/userInfoDialog.vue'

    const columns = [
            {
                title: "用户ID",
                key: "id",
                align: "left",
            },
            {
                title: "账号",
                key: "account",
                align: "left",
            },

            {
                title: "经营者注册名称",
                key: "realname",
                align: "left",
            },
            {
                title: "统一社会信用代码",
                key: "creditCode",
                align: "left",
            },
            {
                title: "创建时间",
                key: "createTime",
                align: "left",
            }
    ]
    let loading = ref(false)
    let userList = reactive([])

    // 修改密码弹出框
    let modifyPw = ref(false)
    let isShow = ref(false)
    let isEdit = ref(false)
    let dialogTitle = ref<string>('')
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
    const showDialog = (val: string) => {
        switch (val) {
            case 'add':
                console.log('add')
                isShow.value = true
                break;
            default:
                break;
        }
    }
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