<template>
    <div class="details">
        <div class="title">
            详情信息
        </div>
        <el-form
            ref="ruleFormRef"
            :model="formData"
            :rules="rules"
            label-width="130px"
            class="demo-formData"
            status-icon>
            <el-form-item
                v-for="item in detailLabel"
                :key="item.id"
                :label="item.label + ':'"
                :prop="item.id">
                <el-cascader v-if="item.id === 'address'" v-model="value" :options="options" />
                <el-input v-else class="w300" v-model="formData[item.id]" />
            </el-form-item>
        </el-form>
        <div class="btn_box">
            <el-button
                type="primary" 
                @click="perEditUnitTnfo">
                保存
            </el-button>
            <el-button
                type="primary" 
                @click="auditUnitTnfo('1')">
                审核通过
            </el-button>
            <el-button
                type="primary" 
                @click="auditUnitTnfo('2')">
                审核不通过
            </el-button>
            <el-button
                type="primary" 
                @click="delistUnitTnfo">
                提交
            </el-button>
            <el-button type="primary" >返回</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, reactive, ref } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import { formType } from '@/type/company'
    import { detailLabel } from './config.ts'

    const formData = reactive<formType>({})
    const ruleFormRef = ref<FormInstance>()
    const rules = reactive<FormRules<RuleForm>>({
        name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        region: [
            {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
            },
        ],
        count: [
            {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
            },
        ],
        date1: [
            {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
            },
        ],
        date2: [
            {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
            },
        ],
        type: [
            {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
            },
        ],
        resource: [
            {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
            },
        ],
        desc: [
            { required: true, message: 'Please input activity form', trigger: 'blur' },
        ]
    })
    const options = [
        {
            value: 'guide',
            label: 'Guide',
            children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                {
                    value: 'consistency',
                    label: 'Consistency',
                },
                {
                    value: 'feedback',
                    label: 'Feedback',
                },
                {
                    value: 'efficiency',
                    label: 'Efficiency',
                },
                {
                    value: 'controllability',
                    label: 'Controllability',
                },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                {
                    value: 'side nav',
                    label: 'Side Navigation',
                },
                {
                    value: 'top nav',
                    label: 'Top Navigation',
                },
                ],
            },
            ],
        },
        {
            value: 'component',
            label: 'Component',
            children: [
            {
                value: 'basic',
                label: 'Basic',
                children: [
                {
                    value: 'layout',
                    label: 'Layout',
                },
                {
                    value: 'color',
                    label: 'Color',
                },
                {
                    value: 'typography',
                    label: 'Typography',
                },
                {
                    value: 'icon',
                    label: 'Icon',
                },
                {
                    value: 'button',
                    label: 'Button',
                },
                ],
            },
            {
                value: 'form',
                label: 'Form',
                children: [
                {
                    value: 'radio',
                    label: 'Radio',
                },
                {
                    value: 'checkbox',
                    label: 'Checkbox',
                },
                {
                    value: 'input',
                    label: 'Input',
                },
                {
                    value: 'input-number',
                    label: 'InputNumber',
                },
                {
                    value: 'select',
                    label: 'Select',
                },
                {
                    value: 'cascader',
                    label: 'Cascader',
                },
                {
                    value: 'switch',
                    label: 'Switch',
                },
                {
                    value: 'slider',
                    label: 'Slider',
                },
                {
                    value: 'time-picker',
                    label: 'TimePicker',
                },
                {
                    value: 'date-picker',
                    label: 'DatePicker',
                },
                {
                    value: 'datetime-picker',
                    label: 'DateTimePicker',
                },
                {
                    value: 'upload',
                    label: 'Upload',
                },
                {
                    value: 'rate',
                    label: 'Rate',
                },
                {
                    value: 'form',
                    label: 'Form',
                },
                ],
            },
            {
                value: 'data',
                label: 'Data',
                children: [
                {
                    value: 'table',
                    label: 'Table',
                },
                {
                    value: 'tag',
                    label: 'Tag',
                },
                {
                    value: 'progress',
                    label: 'Progress',
                },
                {
                    value: 'tree',
                    label: 'Tree',
                },
                {
                    value: 'pagination',
                    label: 'Pagination',
                },
                {
                    value: 'badge',
                    label: 'Badge',
                },
                ],
            },
            {
                value: 'notice',
                label: 'Notice',
                children: [
                {
                    value: 'alert',
                    label: 'Alert',
                },
                {
                    value: 'loading',
                    label: 'Loading',
                },
                {
                    value: 'message',
                    label: 'Message',
                },
                {
                    value: 'message-box',
                    label: 'MessageBox',
                },
                {
                    value: 'notification',
                    label: 'Notification',
                },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                {
                    value: 'menu',
                    label: 'Menu',
                },
                {
                    value: 'tabs',
                    label: 'Tabs',
                },
                {
                    value: 'breadcrumb',
                    label: 'Breadcrumb',
                },
                {
                    value: 'dropdown',
                    label: 'Dropdown',
                },
                {
                    value: 'steps',
                    label: 'Steps',
                },
                ],
            },
            {
                value: 'others',
                label: 'Others',
                children: [
                {
                    value: 'dialog',
                    label: 'Dialog',
                },
                {
                    value: 'tooltip',
                    label: 'Tooltip',
                },
                {
                    value: 'popover',
                    label: 'Popover',
                },
                {
                    value: 'card',
                    label: 'Card',
                },
                {
                    value: 'carousel',
                    label: 'Carousel',
                },
                {
                    value: 'collapse',
                    label: 'Collapse',
                },
                ],
            },
            ],
        }
    ]
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('submit!')
            } else {
                console.log('error submit!', fields)
            }
        })
        }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }
</script>

<style lang="scss" scoped>
.details{
    background-color: #fff;
    padding: 10px;
    .title{
        font-size: 20px;
        margin-bottom: 10px;
    }
    .btn_box{
        text-align: right
    }
}
</style>