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
                    type="primary">
                    查询
                </el-button>
            </div>
        </div>
        <zt-table :data="tableData" :loading="loading">
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
                        <el-button text type="primary">
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
    import { useRoute } from 'vue-router'
    const route = useRoute()
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

    const getData = async () => {
        try {
            const res = await $api.Complaint.getList()
            if (res.result) {
                tableData.value = res.data
            }
        } catch (error) {
            
        }
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
    onMounted(() => {
        let data = JSON.parse(localStorage.getItem('complaint') || '')
        tableData.value = [
            {
                order_num: '2024032592383',
                apply_name: 'zhansan',
                create_time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                title: data.title,
                desc: data.content,
                status: '处理中'
            }
        ]
        localStorage.setItem('tableData', JSON.stringify(tableData.value[0]))
        getData()
    })
</script>

<style scoped>
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
        .left{
            display: flex;
            align-items: center;
        }
    }
</style>