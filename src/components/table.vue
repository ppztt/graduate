<template>
    <div>
        <el-table 
            v-loading="loading" 
            :data="unitDataList" 
            :border="false" 
            height="250" 
            style="width:100%"
            @select="select"
            @select-all="selectAll">
            <slot></slot>
        </el-table>
        <el-pagination
            v-if="pagination.total > 0"
            v-model:current-page="pagination.current"
            v-model:page-size="pagination.size"
            :page-sizes="pageSizes"
            :small="small"
            :disabled="false"
            :background="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script setup>
    import {defineProps, defineEmits} from 'vue'
    const props = defineProps({
        loading: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            require: true,
            default: []
        },
        pagination: {
            type: Object,
            require: false,
            default: {
                current: 1,
                size: 10,
                total: 0
            }
        },
        pageSizes: {
            type: Array,
            require: false,
            default: [10, 30, 50]
        },
        small: {
            type: Boolean,
            require: false,
            default: false
        }
    })
    const emit = defineEmits(['handleSizeChange', 'handleCurrentChange', 'select', 'selectAll'])

    // 函数区
    const handleSizeChange = (val) => {
        emit('handleSizeChange', val)
    }
    const handleCurrentChange = (val) => {
        emit('handleCurrentChange', val)
    }
    const select = (val) => {
        emit('select', val)
    }
    const selectAll = (val) => {
        emit('selectAll', val)
    }
</script>

<style lang="scss" scoped>

</style>