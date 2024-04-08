<template>
    <div v-if="route.name === 'complaintMgt'">
        <div class="toolbar">
            <div class="left">
                <el-date-picker
                    class="w200 mr5"
                    v-model="dateTime"
                    type="daterange"
                    value-format="YYYY-MM-DD"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :shortcuts="shortcuts"/>
                <el-input v-model="orderNum" placeholder="请输入单号"  class="w200 mr5"/>
                <el-input v-model="applyName" placeholder="请输入申请人姓名" class="w200" />
            </div>
            <div class="right">
                <el-button
                    icon="Search"
                    size="default"
                    type="primary"
                    @click="searchInfo">
                    查询
                </el-button>
            </div>
        </div>
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
            <el-table-column label="操作" fixed="right" :align="'left'">
                <template #default="{ row }">
                    <div class="actions">
                        <el-button text type="primary" @click="toDetail(row)">
                            编辑
                        </el-button>
                        <el-button text type="danger" @click='delComplaint(row)' >
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </zt-table>
    </div>
    <router-view v-else></router-view>
</template>

<script setup lang="ts">
    import { formatDate } from '@/utils';
    import { ref, onMounted, getCurrentInstance } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { paginationType } from '@/type/common'

    const route = useRoute()
    const router = useRouter()
    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $success = proxy.$success

    const statusMap: any = {
        handle: '处理中',
        completed: '已完成'
    }
    let dateTime = ref([])
    let orderNum = ref('')
    let applyName = ref('')
    let loading = ref<Boolean>(false)
    const tableData = ref<any>([])
    const pagination = ref<paginationType>({
        current: 1,
        size: 10,
        count: 0
    })
    const shortcuts = [
    {
        text: '最近一周',
        value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
        },
    },
    {
        text: '近一月',
        value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
        },
    },
    {
        text: '近三月',
        value: () => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
        },
    },
    ]
    const columns = [
        {
            id: 'order_num',
            label: '单号'
        },
        {
            id: 'user_name',
            label: '申请人名称'
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

    const searchInfo = () => {
        const params = {
            start_time: dateTime.value[0],
            end_time: dateTime.value[1],
            user_name: applyName.value,
            order_num: orderNum.value
        }
        getData(params)
    }
    const getData = async (assignParams?: any) => {
        try {
            const params = {
                page: pagination.value.current,
                size: pagination.value.size,
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
    const delComplaint = async (row: any) => {
        try {
            const res = await $api.Complaint.delComplaint({id: row.id})
            if (res.result) {
                $success(res.message)
                getData()
            }
        } catch (error) {
            
        }
    }
    const toDetail = (row: any) => {
        router.push({
            name: 'complaintDetail',
            query: {
                id: row.id
            }
        })
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