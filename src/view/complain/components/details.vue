<template>
    <div class="desc">
        <el-descriptions title="投诉详情">
            <el-descriptions-item v-for="item in columns" :key="item.id" :label="item.label + ':'">
                <span v-if="item.id === 'file'" class="blue_txt">文件1</span>
                <span v-else-if="item.id === 'status'">{{ statusMap[baseData[item.id]] }}</span>
                <span v-else>{{ baseData[item.id] }}</span>
            </el-descriptions-item>
        </el-descriptions>
    </div>
    <div class="adminForm">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm">
          <el-form-item label="处理结果：" prop="result">
            <el-input v-model="ruleForm.result" type="textarea" />
          </el-form-item>
        </el-form>
    </div>
    <div class="common_footer">
        <el-button type="primary" class="loginButton" @click="submitForm(ruleFormRef)">提交</el-button>
    </div>
</template>

<script setup lang="ts">
    import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
    import { useRoute } from 'vue-router';
    import type { FormRules, FormInstance } from 'element-plus'

    const route = useRoute()
    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $success = proxy.$success

    const id = route.query.id
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive<any>({
        result: ''
    })
    const rules = ref<FormRules>({
        result: [{required: true, message: '请输入处理结果', trigger: 'blur'}]
    })
    const baseData = ref<any>(
        JSON.parse(localStorage.getItem('tableData') || '')
    )
    const statusMap: any = {
        handle: '处理中',
        completed: '已完成'
    }
    const columns = [
        {
            id: 'order_num',
            label: '单号'
        },
        {
            id: 'apply_name',
            label: '申请人名称'
        },
        {
            id: 'create_time',
            label: '申请时间'
        },
        {
            id: 'name',
            label: '标题'
        },
        {
            id: 'status',
            label: '状态'
        },
        {
            id: 'desc',
            label: '描述'
        },
        {
            id: 'file',
            label: '附件'
        }
    ]

    const getData = async () => {
        try {
            const params = {
                size: -1,
                id
            }
            const res = await $api.Complaint.getList(params)
            if (res.result) {
                baseData.value = res.data[0]
            }
        } catch (error) {
            console.log(error)
        }
    }
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return 
        formEl.validate(valid => {
            if (valid) {
                const params = {
                    id,
                    result: ruleForm.result,
                    status: 'completed'
                }
                $api.Complaint.editComplaint(params).then((res: any) => {
                    if (res.result) {
                        $success('编辑成功')
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
.desc, .adminForm {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
}
.blue_txt{
    cursor: pointer;
    color: #409eff;
    &:hover {
        color: #a0cfff;
    }
}
.common_footer{
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: calc(100% - 260px);
    height: 50px;
    padding-left: 20px;
    background-color: #fff;
    margin-bottom: 20px;
}
</style>