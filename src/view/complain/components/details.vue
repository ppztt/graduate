<template>
    <div class="desc">
        <el-descriptions title="投诉详情">
            <el-descriptions-item v-for="item in columns" :key="item.id" :label="item.label + ':'">
                <span v-if="item.id === 'file'" class="blue_txt">文件1</span>
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
          label-width="90px"
          class="demo-ruleForm">
          <el-form-item label="处理结果：" prop="result">
            <el-input type="textarea" />
          </el-form-item>
        </el-form>
    </div>
    <div class="common_footer">
        <el-button type="primary" class="loginButton" @click="submitForm(ruleFormRef)">提交</el-button>
    </div>
</template>

<script setup lang="ts">
    const baseData = JSON.parse(localStorage.getItem('tableData') || '')
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
</script>

<style lang="scss" scoped>
.desc, .adminForm {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
}
.blue_txt{
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