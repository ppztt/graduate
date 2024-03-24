<template>
    <div>
        <!-- 操作栏 -->
        <div class="controll">
            <el-button type="primary" @click="dialogVisible = true">新增角色</el-button>
            <el-alert class="w200" title="仅支持删除新增的角色" type="warning" effect="dark" :closable="false" show-icon />
        </div>
        <zt-table :loading="loading" :data="roleList">
            <el-table-column :align="'center'" label="序号" type="index" width="90" />
            <el-table-column
                :align="'center'"
                v-for="item in columns"
                :key="item.id"
                :label="item.label"
                :prop="item.id">
            </el-table-column>
            <el-table-column :align="'center'" label="操作" fixed="right">
                    <template #default="{ row }">
                        <div class="actions">
                            <el-button text type="primary" @click="edit(row)">
                                编辑
                            </el-button>
                            <el-popconfirm title="确认删除该角色？" @confirm="delRole(row.id)">
                                <template #reference>
                                    <el-button v-if="row.role_level > 7" text type="danger">
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
        </zt-table>
        <!-- 对话框 -->
        <el-dialog
            v-model="dialogVisible"
            :title="isEdit ? '角色编辑' : '新增角色'"
            width="50%"
            @close="handleClose(form)">
            <el-form :model="formData" label-width="120px" ref="form" :rules="rules">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="formData.roleName" />
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="formData.desc" type="textarea" />
                </el-form-item>
                <el-form-item label="菜单" prop="menu">
                    <el-select
                        v-model="formData.menu"
                        multiple
                        placeholder="请选择菜单项"
                        style="width: 240px">
                        <el-option
                            v-for="item in menuList"
                            :key="item.path"
                            :label="item.name"
                            :value="item.path" />
                    </el-select>

                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="handleSubmit(form)">
                        提交
                    </el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import {ref, reactive, onMounted, getCurrentInstance} from 'vue'
    import { roleType } from '@/type/roleManage'
    import type { FormRules, FormInstance } from 'element-plus'
    import { menuList } from '@/json/Home';

    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $error = proxy.$error
    const $success = proxy.$success
    let isEdit = ref<boolean>(false)
    const form = ref<FormInstance>()
    const validMenu = (rule: any, value: any, callback: any) => {
        if (!value.length) {
            callback(new Error('请至少选择一个菜单项！'))
        } else {
            callback()
        }
    }
    const rules: FormRules = {
        roleName: [
            {required: true, message: '角色名称不能为空', trigger: 'blur'}
        ],
        desc: [
            {required: true, message: '描述不能为空', trigger: 'blur'}
        ],
        menu: [
            {required: true, message: '请至少选择一个菜单项', trigger: 'change'},
            {validator: validMenu, trigger: 'blur'}
        ]
    } 
    const columns = [
        {
            id: 'role_name',
            label: '角色名称'
        },
        {
            id: 'desc',
            label: '描述'
        }
    ]
    let roleList = ref<Array<roleType>>([])
    let loading = ref<Boolean>(false)
    let dialogVisible = ref(false)
    let formData = reactive<roleType>({
        roleName: '',
        desc: '',
        menu: []
    })
    
    const getData = async () => {
        try {
            const res = await $api.Role.getRoleList()
            if (res.result) {
                roleList.value = res.data
            }
        } catch (error) {
            
        }
    }
    const handleSubmit = (formEl: FormInstance | undefined) => {
        if(!formEl) return
        formEl.validate((valid: Boolean) => {
            if (valid) {
                const params: any = {
                    role_level: 8,
                    ...formData
                }
                params.menu = menuList.filter((menu: any) => {
                    return formData.menu.includes(menu.path)
                })
                const fn:string = !isEdit.value ? 'addRole' : 'editRole'
                $api.Role[fn](params).then((res: any) => {
                    if (res.result) {
                        $success(`${isEdit.value ? '修改' : '添加'}成功`)
                    } else {
                        $error(`${isEdit.value ? '修改' : '添加'}失败`)
                    }
                    dialogVisible.value = false
                    isEdit.value = false
                    getData()
                })
            }
        })
    }
    const handleClose = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
        formData = reactive<roleType>({
            roleName: '',
            desc: '',
            menu: []
        })
        dialogVisible.value = false
    }
    const edit = (row: any) => {
        dialogVisible.value = true
        isEdit.value = true
        formData = reactive({
            ...row
        })
        formData.roleName = row.role_name
        formData.menu = formData.menu.map(menu => {
            return menu.path
        })
    }
    const delRole = async (id: number) => {
        try {
            const res = await $api.Role.delRole(id)
            if (res.result) {
                $success(res.message)
            } else {
                $error(res.message)
            }
            getData()
        } catch(error) {
            console.log(error)
        }
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
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 10px;
    height: 60px;
}
.w200 {
    margin-right: 20px;
    width: 200px;
}
</style>