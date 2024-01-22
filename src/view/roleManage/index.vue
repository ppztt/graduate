<template>
    <div>
        <!-- 操作栏 -->
        <div class="controll">
            <el-input 
                class="w200 mr5"
                placeholder="请输入查询关键字"
                :suffix-icon="Search" 
                v-model="searchValue"></el-input>
            <el-button type="primary">新增角色</el-button>
            <el-button type="danger">删除</el-button>
        </div>
        <zt-table :loading="loading" :data="roleList">
            <el-table-column
                v-for="item in columns"
                :key="item.id"
                :label="item.label">
            </el-table-column>
            <el-table-column label="操作" fixed="right" :align="'left'">
                    <template #default="{ row }">
                        <div class="actions">
                            <el-button class="action_btn blue_text" icon="el-icon-search">
                                编辑
                            </el-button>
                            <el-button class="action_btn blue_text" icon="el-icon-edit">
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
        </zt-table>
        <!-- 对话框 -->
        <el-dialog
            v-model="dialogVisible"
            title="角色编辑"
            width="50%"
            :before-close="handleClose">
            <el-form :model="formData" label-width="120px">
                <el-form-item label="角色名称">
                    <el-input v-model="formData.roleName" />
                </el-form-item>
                <el-form-item label="描述">
                        <el-input v-model="formData.desc" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">
                        提交
                    </el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import {ref, reactive, onMounted} from 'vue'
    import { Search } from '@element-plus/icons-vue'
    import { roleType } from '@/type/roleManage'
    const columns = [
        {
            id: 'role_name',
            label: '角色名称'
        },
        {
            id: 'status',
            label: '状态'
        },
        {
            id: 'desc',
            label: '描述'
        }
    ]
    let roleList = []
    let loading = ref<Boolean>(false)
    let dialogVisible = ref(false)
    let formData = reactive<roleType>({
        roleName: '',
        desc: '',
        status: 0
    })
    let searchValue = ref<string>('')

    const getData = () => {
        console.log()
    }
    const handleClose = () => {
        formData = {
            roleName: '',
            desc: '',
            status: 0
        }
        dialogVisible.value = false
    }
    onMounted(() => {
        getData()
    })
</script>

<style scoped lang="scss">
.controll{
    display: flex;
    padding-left: 20px;
    align-items: center;
    background-color: #fff;
    margin-bottom: 10px;
    height: 60px;
}
</style>