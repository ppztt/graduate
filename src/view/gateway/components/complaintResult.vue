<template>
    <div>
        <el-button type="primary" @click="getData">刷新</el-button>
        <zt-table
            :data="tableData"
            :loading="loading"
            :pagination="pagination"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange">
            <el-table-column
                v-for="item in columns"
                :key="item.id"
                :label="item.label"
                :prop="item.id">
                <template #default="{ row }">
                    <span>{{ item.show ? item.show(row[item.id]) : row[item.id]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right"  width="120">
                <template #default="{ row }">
                    <el-button :disabled="row.status !== 'completed'" text type="primary" @click="toDetail(row)">
                        查看
                    </el-button>
                </template>
            </el-table-column>
        </zt-table>
    </div>
    <el-dialog
        v-model="isShow"
        title="投诉结果"
        width="700">
        <complaintDetail :id="currentRow.id" :isGateWay="true"></complaintDetail>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isShow = false">关闭</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { formatDate } from '@/utils';
    import { ref, onMounted, getCurrentInstance } from 'vue'
    import { paginationType } from '@/type/common'
    import complaintDetail from '@/view/complain/components/details.vue'

    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const userInfo: any = JSON.parse(localStorage.getItem('commonUserInfo') || '')
    const statusMap: any = {
        handle: '处理中',
        completed: '已完成'
    }
    let loading = ref<Boolean>(false)
    const isShow = ref<Boolean>(false)
    const tableData = ref<any>([])
    const pagination = ref<paginationType>({
        current: 1,
        size: 10,
        count: 0
    })
    const currentRow = ref<any>({})
    const columns = [
        {
            id: 'order_num',
            label: '单号'
        },
        {
            id: 'create_time',
            label: '申请时间',
            show: (val: Date) => {
                return formatDate(val, 'yyyy-MM-dd')
            }
        },
        {
            id: 'name',
            label: '标题'
        },
        {
            id: 'status',
            label: '状态',
            show: (val: string) => {
                return statusMap[val]
            }
        },
        {
            id: 'desc',
            label: '描述'
        }
    ]

    const getData = async (assignParams?: any) => {
        try {
            const params = {
                page: pagination.value.current,
                size: pagination.value.size,
                user_id: userInfo.id,
                ...assignParams
            }
            const res = await $api.Complaint.getList(params)
            if (res.result) {
                pagination.value.count = res.count
                tableData.value = res.data
            }
        } catch (error) {
            console.log(error)
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
    const toDetail = (row: any) => {
        isShow.value = true
        currentRow.value = row
    }
    onMounted(() => {
        getData()
    })
</script>

<style lang="scss" scoped>
    .toolbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        height: 60px;
        background: #fff;
        padding: 20px;
        margin: 0 auto;
        margin-bottom: 10px;
        .left {
            display: flex;
            align-items: center;
        }
    }
</style>