<template>
    <div class="desc">
        <el-descriptions title="企业详情">
            <el-descriptions-item v-for="item in columns" :key="item.id" :label="item.label + ':'">
                <span v-if="item.id.indexOf('time') > -1">
                    {{ formatDate(baseData[item.id], 'yyyy-MM-dd hh:mm:ss') || '--' }}
                </span>
                <span v-else-if="item.id === 'status'">{{ statusMap[baseData[item.id]] || '--' }}</span>
                <span v-else>{{ baseData[item.id] || '--' }}</span>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script lang="ts" setup>
    import { formatDate } from '@/utils';
    import { ref, getCurrentInstance, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    const { proxy }: any = getCurrentInstance() 
    const $api = proxy.$api
    const route = useRoute()
    const id = route.query.id
    const statusMap: any = {
        normal: '正常'
    }
    const baseData = ref<any>({})
    const columns: any = [
        {
            id: 'regName',
            fixed: 'left',
            width: 150,
            label: '经营者注册名称'
        },
        {
            id: 'account',
            width: 100,
            label: '创建人'
        },
        {
            id: 'storeName',
            label: '门店名称'
        },
        {
            id: 'address',
            width: 120,
            label: '经营场所地址'
        },
        {
            id: 'status',
            label: '状态',
            width: 80  
        },
        {
            id: 'validity',
            label: '有效期'   
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
            id: 'creditCode',
            width: 180,
            label: '统一社会信用代码'   
        },
        {
            id: 'charge_person_name',
            label: '负责人'
        }
    ]

    const getData = async () => {
        try {
            const params = {
                id
            }
            const res = await $api.Company.getCompany(params)
            if (res.result) {
                baseData.value = res.data[0]
                console.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    onMounted(() => {
        getData()
    })
</script>

<style lang="scss" scoped>
.desc {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
}
</style>