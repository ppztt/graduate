<template>
    <div>
        <!-- 操作栏 -->
        <div class="controll">
            <el-button type="primary" @click="dialogVisible = true">新建文章</el-button>
        </div>
        <zt-table :loading="loading" :data="tableData">
            <el-table-column :align="'center'" label="序号" type="index" width="90" />
            <el-table-column
                :align="'center'"
                v-for="item in columns"
                :key="item.id"
                :label="item.label"
                :prop="item.id">
                <template #default="{ row }">
                    <span>{{ row[item.id]  || '--' }}</span>
                </template>
            </el-table-column>
            <el-table-column :align="'center'" label="操作" fixed="right">
                <template #default="{ row }">
                    <div class="actions">
                        <el-button text type="primary" @click="edit(row)">
                            编辑
                        </el-button>
                        <el-popconfirm title="确认删除该文章？" @confirm="delRole(row.id)">
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
        <!-- 对话框 -->
        <el-dialog
            v-model="dialogVisible"
            :title="isEdit ? '角色编辑' : '新增角色'"
            width="70%"
            @close="handleClose(form)">
            <el-form :model="formData" label-width="120px" ref="form" :rules="rules">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="formData.title" />
                </el-form-item>
                <el-form-item label="关联企业" prop="company_id">
                    <el-select
                        v-model="formData.company_id"
                        placeholder="请选择关联企业">
                        <el-option
                            v-for="item in companyList"
                            :value="item.id"
                            :key="item.id"
                            :label="item.regName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投诉类型" prop="type">
                    <el-select
                        v-model="formData.type"
                        placeholder="请选择投诉类型">
                        <el-option
                            v-for="item in typeList"
                            :value="item.id"
                            :key="item.id"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <el-input v-model="formData.content" type="textarea" />
                    <!-- <rich-editor
                        v-model="formData.content"
                    /> -->
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
    import type { FormRules, FormInstance } from 'element-plus'
    import {contentType, complaintType} from '@/type/content'
    // import richEditor from '@/components/rich-editor/index.vue'

    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $error = proxy.$error
    const $success = proxy.$success


    const tableData = ref([])
    let isEdit = ref<boolean>(false)
    const form = ref<FormInstance>()
    const rules: FormRules = {
        title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        content: [
            {required: true, message: '内容不能为空', trigger: 'blur'}
        ],
        company_id: [
            {required: true, message: '关联企业不能为空', trigger: 'change'}
        ],
        type: [
            {required: true, message: '投诉类型不能为空', trigger: 'change'}
        ]
    } 
    const columns = [
        {
            id: 'title',
            label: '文章标题'
        },
        {
            id: 'create_time',
            label: '创建时间'
        },
        {
            id: 'update_time',
            label: '更新时间'
        },
        {
            id: 'account',
            label: '创建人'
        },
        {
            id: 'type_cn',
            label: '投诉类型'
        }
    ]
    let typeList = ref<Array<complaintType>>([
        {
            id: 9,
            name: ''
        }
    ])
    const companyList = ref<any>([])
    let loading = ref<Boolean>(false)
    let dialogVisible = ref(false)
    let formData = reactive<contentType>({
        title: '',
        content: '',
        type: ''
    })
    
    const getData = async () => {
        try {
            const res = await $api.Content.getContentList()
            if (res.result) {
                tableData.value = res.data 
            }
        } catch (error) {
            
        }
    }
    const getType = async () => {
        try {
            const res = await $api.Content.getComplainType()
            if (res.result) {
                typeList.value = res.data
            }
        } catch (error) {
            
        }
    }
    const getCompanyList = async () => {
        try {
            const res = await $api.Company.getAllCompany({size: -1})
            if (res.result) {
                companyList.value = res.data
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (formEl: FormInstance | undefined) => {
        if(!formEl) return
        formEl.validate((valid: Boolean) => {
            if (valid) {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
                const params: any = {
                    user_id: userInfo.id,
                    ...formData
                }
                const fn:string = !isEdit.value ? 'addContent' : 'editContent'
                $api.Content[fn](params).then((res: any) => {
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
        formData = reactive<contentType>({
            title: '',
            content: '',
            company_id: -1,
            type: -1
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
        formData.menu = formData.menu.map((menu: any) => {
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
        getType()
        getCompanyList()
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