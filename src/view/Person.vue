<template>
    <div class="person_center">
        <el-form :model="form" label-width="90px">
            <el-form-item
                v-for="item in labelList"
                :key="item.id"
                :label="item.label">
                <el-input v-model="form[item.id]" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { reactive } from 'vue'
    import { personForm, labelType } from '@/type/person';
    const labelList: Array<labelType> = [
        {
            id: 'username',
            label: '用户名'
        },
        {
            id: 'phone',
            label: '电话号码'
        },
        {
            id: 'email',
            label: '邮箱'
        },
        {
            id: 'role',
            label: '所属角色'
        },
    ]
    const form: personForm = reactive({
        username: '',
        phone: '',
        email: '',
        role: ''
    })

    const onSubmit = () => {
    console.log('submit!')
    }
</script>

<style lang="scss" scoped>
.person_center{
    padding: 20px;
    background-color: #fff;
}
</style>