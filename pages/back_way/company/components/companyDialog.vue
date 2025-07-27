<template>
    <el-dialog
        v-model="isShow" 
        title="经营者-录入" 
        width="800"
        @close="closeEnteringModal()">
        <company-form v-if="isShow" @confirm="handleSubmit"></company-form>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, defineExpose, defineEmits, getCurrentInstance } from 'vue'


    // 工具实例
    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $success = proxy.$success
    const $error = proxy.$error
    const emit = defineEmits(['getData'])
    let isShow = ref(false)

    const closeEnteringModal = () => {
        emit('getData')
    }
    const handleSubmit = (params: any) => {
        $api.Company.addCompany(params).then((res: any) => {
            if (res.result) {
                $success('添加成功')
            } else {
                $error(res.message || '添加失败')
            }
        })
        isShow.value = false
    }
    const showDialog = () => {
        isShow.value = true
    }
    defineExpose({
        showDialog
    })
</script>

<style scoped>

</style>