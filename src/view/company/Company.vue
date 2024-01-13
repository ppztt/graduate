<template>
    <div>
        <div class="header">
            <div class="tools" ref="tools">
                <!-- 工具栏 -->
                <div class="tools_item">
                    <el-input
                        size="default"
                        placeholder="请输入企业名称"
                        v-model="searchObj.searchMsg"
                        :clearable="true"></el-input>
                </div>
                <div class="tools_item">
                    <el-select size="default" placeholder="市" :clearable="true" filterable v-model="searchObj.city">
                        <el-option :value="'测试'"></el-option>
                    </el-select>
                </div>
                <div class="tools_item">
                    <el-select size="default" v-model="searchObj.district" placeholder="市/县/区/镇" :clearable="true">
                        <el-option :value="'测试'"></el-option>
                    </el-select>
                </div>
                <div class="tools_item">
                    <el-select size="default" placeholder="经营类别" :clearable="true" v-model="searchObj.management">
                        <el-option :value="'商品类'" :label="'商品类'"></el-option>
                        <el-option :value="'服务类'" :label="'服务类'"></el-option>
                        <el-option :value="'商品及服务类'" :label="'商品及服务类'"></el-option>
                    </el-select>
                </div>
                <div class="tools_item">
                    <el-select size="default" placeholder="状态" v-model="searchObj.status">
                        <el-option 
                            v-for="item in statusList" 
                            :key="item.id" 
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="list-header-btns">
                <div class="left">
                    <el-button
                        icon="Search"
                        size="default"
                        type="primary"
                        @click="searchInfo">
                        查询
                    </el-button>
                </div>
                <div class="right">
                    <div class="item">
                        <el-button 
                            icon="EditPen" 
                            size="default" 
                            type="primary" 
                            @click="showDialog">
                            录入
                        </el-button>
                    </div>
                    <div class="item">
                        <el-upload 
                            class="upload" 
                            :show-file-list="false" 
                            accept="xlsm" 
                            :before-upload="beforeUploadAction"
                            :on-success="uploadSucAction" :on-error="uploadErrAction"
                            :action="'/xwh/applicants/preImport.do?type=' + type">
                            <el-button 
                                icon="Download" 
                                size="default" 
                                type="primary" 
                                :disabled="!canImport"
                                :title="!canImport ? '没有权限导入' : ''">
                                导入
                            </el-button>
                        </el-upload>
                    </div>
                    <div class="item">
                        <el-dropdown @command="exportData" v-loading.fullscreen.lock="fullscreenLoading">
                            <el-button icon="Upload" size="default" type="primary">
                                <!-- <img class="left" src="@/assets/images/1_20.png" alt /> -->
                                导出
                                <!-- <img class="right" src="@/assets/images/1_15.png" alt /> -->
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :command="''">导出全部</el-dropdown-item>
                                    <el-dropdown-item :command="1" divided>导出在期</el-dropdown-item>
                                    <el-dropdown-item :command="0" divided>导出摘牌</el-dropdown-item>
                                    <el-dropdown-item :command="2" divided>导出过期</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div class="item">
                        <el-button icon="Folder" size="default" type="primary" @click="downLoadTemplate">
                            模板下载
                        </el-button>
                    </div>
                    <div class="item">
                        <el-button icon="Delete" size="default" type="danger" @click="deleteMoreConsumer">
                            删除
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-main class="container">
            <zt-table
                :loading="loading" 
                :data="unitDataList"
                @select="addIDs"
                @select-all="addIDs"
                @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange">
                <el-table-column fixed="left" width="60" type="selection" :align="'left'"></el-table-column>
                <el-table-column
                    v-for="col in columns"
                    :key="col.id"
                    :prop="col.id"
                    :label="col.label"
                    :width="col.width"
                    :fixed="col.fixed">
                    <template #default="{row}">
                        <span v-if="col.id === 'status'">{{ statusArr[row[col.id]] }}</span>
                        <span v-else-if="col.id ==='validity'">
                            <span>{{ row.startTime }}</span>
                            <span v-if="row.startTime">~</span>
                            <span>{{ row.endTime }}</span>
                        </span>
                        <span v-else>{{ row[col.id] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="350" :align="'left'">
                    <template #default="{row}">
                        <div class="actions">
                            <el-button class="action_btn blue_text" icon="el-icon-search" @click="openNew(1, row)">
                                查看
                            </el-button>
                            <el-button class="action_btn blue_text" icon="el-icon-edit" @click="openNew(0, row)">
                                编辑
                            </el-button>
                            <el-button class="action_btn blue_text" icon="el-icon-circle-check" @click="openNew(3, row)">
                                审核
                            </el-button>
                            <el-button class="action_btn blue_text" v-if="row.status == 1" icon="el-icon-s-promotion"
                                @click="openNew(2, row)">
                                摘牌
                            </el-button>
                            <el-button type="text" class="action_btn red_text" icon="el-icon-delete"
                                @click="deleteConsumer(row.id)">
                                删除
                            </el-button>
                            <div class="action_btn" :class="[row.isExtension ? 'skyblue_text' : 'grey_text']"
                                @click="renew(row)">
                                <img style="margin-right: 2px;width:12px" src="${base}/static/images/renew%20.png" alt="" />
                                <el-button type="text">
                                    续期
                                </el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </zt-table>
        </el-main>
        <!-- 录入弹出框 -->
        <company-dialog :isShowEnteringModal="isShowEnteringModal"></company-dialog>
    </div>
</template>

<script setup lang="ts">
    import { columns, statusArr } from './config.js'
    import { onMounted, reactive, ref } from 'vue';
    import { searchType, pagination } from '@/type/company'
    import companyDialog from './components/companyDialog.vue'

    const statusList = [
        {
            id: 0,
            name: '全部'
        },
        {
            id: 1,
            name: '在期'
        },
        {
            id: 2,
            name: '过期'
        },
        {
            id: 3,
            name: '待审核'
        },
        {
            id: 4,
            name: '审核不通过'
        }
    ]
    // 搜索录入相关信息
    let isShowEnteringModal = ref(false);
    let searchObj: searchType = reactive({
        searchMsg: "",
        city: "",
        district: "",
        management: "",
        status: 0
    })
    let type: string = ''
    let fullscreenLoading: boolean = false
    let canImport: boolean = false
    let unitDataList: Array<Object> = []
    let loading: boolean = false
    let pagination: pagination = {
        size: 10,
        current: 1,
        total: 0
    }

    // 函数区域
    const showDialog = () => {
        isShowEnteringModal.value = true
    }
    const searchInfo = () => {}
    const beforeUploadAction = () => {}
    const uploadSucAction = () => {} 
    const uploadErrAction = () => {}
    const exportData = () => {}
    const downLoadTemplate = () => {}
    const deleteMoreConsumer = () => {}
    const addIDs = () => {}
    const handleSizeChange = () => {}
    const handleCurrentChange = () => {}
    const openNew = (num: number, row: Object) => {
        console.log(num, row)
    }
    const deleteConsumer = (num: number) => {
        console.log(num)
    }
    const renew = (row: Object) => {
        console.log(row)
    }
    onMounted(() => {
        // getRegionData();
        // getManagerType();
    })
</script>

<style lang="scss" scoped>
.header{
    background: #fff;
    padding: 20px;
    .tools {
        display: flex;
        justify-content: space-between;
        .tools_item{
            width: 18%;
        }
    }
}
.container{
    margin-top: 20px;
    background: #fff;
}

[v-cloak] {
    display: none;
}
.blue_btn {
    background: #5d7cc9 !important;
    color: #fff !important;
    border: 0;
}

.blue_btn:hover {
    background: #899ed1 !important;
    color: #fff !important;
    border: 0;
    outline: none;
}
.list-header-btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .right{
        display: flex;
        .item{
            margin-left: 15px;
        }
    }
}

.ivu-dropdown {
    margin-left: 0 !important;
}


.form-part {
    margin: 15px 0;
    font-size: 16px;
    font-weight: bold;
}

.submit-btns {
    display: flex;
    align-items: center;
    justify-content: center;
}

.submit-btns button:not(:last-child) {
    margin-right: 10px;
}

.el-select__tags {
    overflow-x: auto !important;
    flex-wrap: inherit !important;
}

.new {
    width: 30px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
}

.el-table__body-wrapper::-webkit-scrollbar {
    width: 18px;
    height: 18px;
}

.el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #dddee0;
    border-radius: 30px;
    border: 6px solid #fff;
}

.el-scrollbar__wrap::-webkit-scrollbar {
    width: 18px;
    height: 18px;
}

.el-pagination {
    text-align: right;
}

.el-notification {
    overflow: auto !important;
    max-height: 80% !important;
}

.el-button--primary:focus {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
    background: #409EFF
}
</style>