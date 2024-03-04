<template>
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
    <zt-table :loading="loading">
        <el-table-column
            v-for="item in columns"
            :key="item.id"
            :label="item.label">
        </el-table-column>
        <el-table-column label="操作" fixed="right" :align="'left'">
                <template #default="{ row }">
                    <div class="actions">
                        <el-button class="action_btn blue_text" icon="el-icon-search">
                            编辑
                        </el-button>
                        <el-button class="action_btn blue_text" icon="el-icon-edit">
                            删除
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </zt-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let dateTime = ref([])
let orderNum = ref('')
let applyName = ref('')
let loading = ref(false)

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
        id: 'title',
        label: '标题'
    },
    {
        id: 'desc',
        label: '描述'
    }
]
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