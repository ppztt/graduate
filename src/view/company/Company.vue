<template>
    <div v-if="$route.name === 'company'">
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
                    <el-select size="default">
                        <el-option :value="'测试'">
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
                            @click="isShowEnteringModal = true">
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
            <el-table 
                v-loading="loading" 
                :data="unitDataList" 
                :border="false" 
                height="250" 
                style="width:100%" 
                @select="addIDs"
                @select-all="addIDs">
                <el-table-column fixed="left" width="60" type="selection" :align="'left'">
                </el-table-column>
                <el-table-column prop="regName" label="经营者注册名称" fixed="left" width="200" :align="'left'">
                    <template #default="{row}">
                        <img class="new" v-show="row.isNew" src="${base}/static/images/PendingTrial.png" alt="" /><span>{{
                            row.regName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createType" label="申请来源" width="200" :align="'left'">
                </el-table-column>
                <el-table-column prop="account" label="创建人" width="200" :align="'left'">
                </el-table-column>
                <el-table-column prop="storeName" label="门店名称" width="200" :align="'left'">
                </el-table-column>
                <el-table-column prop="address" label="经营场所地址" width="200," :align="'left'">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80" :align="'left'">
                    <template #default="scope">
                        <span v-show="scope.row.status == 1">在期</span>
                        <span v-show="scope.row.status == 0">摘牌</span>
                        <span v-show="scope.row.status == 2">过期</span>
                        <span v-show="scope.row.status == 3">过渡期</span>
                        <span v-if="scope.row.status == '4'">待审核</span>
                        <span v-if="scope.row.status == '5'">县级审核通过</span>
                        <span v-if="scope.row.status == '6'">行业协会审核通过</span>
                        <span v-if="scope.row.status == '7'">审核不通过</span>
                        <span v-if="scope.row.status == '8'">行业协会审核不通过</span>
                    </template>
                </el-table-column>
                <el-table-column prop="validity" label="有效期" width="170" :align="'left'">
                    <template #default="scope">
                        <span>{{ scope.row.startTime }}</span>
                        <span v-if="scope.row.startTime">~</span>
                        <span>{{ scope.row.endTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="200" :align="'left'">
                </el-table-column>
                <el-table-column prop="startTime" label="通过时间" width="200" :align="'left'">
                </el-table-column>
                <el-table-column prop="creditCode" label="统一社会信用代码" width="200" :align="'left'">
                </el-table-column>
                <el-table-column prop="management" label="经营类别" width="130" :align="'left'">
                </el-table-column>
                <el-table-column prop="details" label="详细类别" width="210" :align="'left'">
                </el-table-column>
                <el-table-column prop="principal" label="负责人" width="120" :align="'left'">
                </el-table-column>
                <el-table-column prop="principalTel" label="手机号码" width="140" :align="'left'">
                </el-table-column>
                <el-table-column prop="action" label="操作" fixed="right" width="350" :align="'left'">
                    <template #default="{row}">
                        <div class="actions" :id="row.id">

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
            </el-table>
            <el-pagination
                v-model:current-page="pagination.current"
                v-model:page-size="pagination.size"
                :page-sizes="[100, 200, 300, 400]"
                :small="false"
                :disabled="false"
                :background="false"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
        </el-main>
        <!-- 录入弹出框 -->
        <el-dialog 
            ref="formData" 
            v-model="isShowEnteringModal" 
            title="放心消费承诺经营者 - 录入" 
            width="800"
            @close="closeEnteringModal">
            <el-row>
                <el-col offset="1" span="22">
                    <el-form ref="formApply" label-width="150px" :model="formData" :rules="formRules"
                        :label-position="'right'">
                        <div class="form-part">基本信息</div>
                        <el-row>
                            <el-col span="24">
                                <el-form-item label="经营者注册名称" prop="regName">
                                    <el-input size="default" v-model="formData.regName"
                                        placeholder="请输入经营者注册名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col span="24">
                                <el-form-item label="统一社会信用代码" prop="creditCode">
                                    <el-input size="default" v-model="formData.creditCode"
                                        placeholder="请输入统一社会信用代码"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-if="modalType === 1">
                            <el-col span="11">
                                <el-form-item label="网店名称" prop="onlineName">
                                    <el-input size="default" v-model="formData.onlineName"
                                        placeholder="请输入网店名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col span="11">
                                <el-form-item label="所属平台" prop="platform">
                                    <el-input size="default" v-model="formData.platform" placeholder="请输入所属平台"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col span="11">
                                <el-form-item label="门店名称" prop="storeName">
                                    <el-input size="default" v-model="formData.storeName" placeholder="请输入门店名称"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="经营场所" prop="addrs">
                            <el-row :key="index" v-for="(addr, index) in formData.addrs">
                                <el-col span="5">
                                    <el-select size="default" :ref="'city' + index" v-model="addr.city" placeholder="市"
                                        :clearable="true" filterable
                                        :disabled="userInfo.roleId == 2 || userInfo.roleId == 3"
                                        @change="cityChange(addr.city, index)" @clear="clear(index)">
                                        <el-option v-for="item in regionData" :value="item.name" :key="item.code"
                                            :label="item.name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col span="5">
                                    <el-select size="default" v-model="addr.district"
                                        @change="districtChange(addr.district, index)"
                                        :disabled="!addr.city || districtData.length == 0 || userInfo.roleId == 3">
                                        <el-option v-for="item in districtData" :value="item.name" :key="item.code"
                                            :label="item.name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col span="8">
                                    <el-input size="default" v-model="addr.address" placeholder="请输入经营场所地址"></el-input>
                                </el-col>
                                <el-col span="1">
                                    <el-button size="default" v-if="index === 0" icon="el-icon-plus" @click="addAddress"
                                        circle></el-button>
                                    <el-button size="default" v-else icon="el-icon-minus" circle @click="() => {
                                        formData.addrs.splice(index, 1);
                                        districtDataArr.splice(index, 1);
                                        $forceUpdate();
                                    }
                                        "></el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-row>
                            <el-col span="11">
                                <el-form-item label="经营类别" prop="management">
                                    <el-select size="default" ref="management" placeholder="类别" :clearable="true"
                                        v-model="formData.management" @change="managementChange">
                                        <el-option :value="'商品类'" :key="'商品类'">商品类</el-option>
                                        <el-option :value="'服务类'" :key="'服务类'">服务类</el-option>
                                        <el-option :value="'商品及服务类'" :key="'商品及服务类'">商品及服务类
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col span="11">
                                <el-form-item label="详细类别" prop="details">
                                    <el-select size="default" placeholder="详细类别" v-model="formData.details"
                                        multiple="true">

                                        <el-option v-for="item in activeManageType" :value="item" :key="item"
                                            :label="item">{{ item }}
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col span="11">
                                <el-form-item label="负责人姓名" prop="principal">
                                    <el-input size="default" v-model="formData.principal"
                                        placeholder="请输入负责人姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col span="11">
                                <el-form-item label="负责人电话" prop="principalTel">
                                    <el-input size="default" type="tel" v-model="formData.principalTel"
                                        placeholder="请输入负责人电话"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="11">
                                <el-form-item label="企业申请日期：">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item prop="applicationDate">
                                                <el-date-picker size="default" value-format="yyyy-MM-dd HH:mm:ss"
                                                    format="yyyy-MM-dd" v-model="formData.applicationDate" type="date"
                                                    placeholder="请选择时间" style="width: 100%">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="form-part">承诺事项及具体内容</div>

                        <el-row v-if="modalType === 1">
                            <el-col span="24">
                                <el-form-item label="品质保证" prop="contents1">
                                    <el-input size="default" v-model="formData.contents1" type="textarea"
                                        placeholder="请输入文字"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-if="modalType === 1">
                            <el-col span="24">
                                <el-form-item label="诚信保证" prop="contents2">
                                    <el-input size="default" v-model="formData.contents2" type="textarea"
                                        placeholder="请输入文字"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-if="modalType === 1">
                            <el-col span="24">
                                <el-form-item label="维权保证" prop="contents3">
                                    <el-input size="default" v-model="formData.contents3" type="textarea"
                                        placeholder="请输入文字"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row v-if="modalType === 2">
                            <el-col span="24">
                                <el-form-item label="适用商品" prop="contents1">
                                    <el-input size="default" v-model="formData.contents1" type="textarea"
                                        placeholder="请输入适用商品"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="modalType === 2">
                            <el-col span="24">
                                <el-form-item label="退货期限（天）" prop="contents2">
                                    <el-input size="default" v-model="formData.contents2" type="textarea"
                                        placeholder="请输入退货期限"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="modalType === 2">
                            <el-col span="24">
                                <el-form-item label="退货约定" prop="contents3">
                                    <el-input size="default" v-model="formData.contents3" type="textarea"
                                        placeholder="请输入退货约定具体信息"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <div class="form-part" v-if="modalType === 1">
                            其他承诺事项及具体内容
                        </div>
                        <el-form-item label="内容" v-if="modalType === 1" prop="contents4">
                            <el-input size="default" v-model="formData.contents4" type="textarea"
                                placeholder="请输入内容"></el-input>
                        </el-form-item>

                        <div class="submit-btns">
                            <el-button size="default" type="primary" @click="handleSubmit('formApply', modalType)">
                                提交
                            </el-button>
                            <!-- <el-button @click="handleReset('formApply')">重置</el-button> -->
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { searchType, pagination, formType, userType, districtType, regionType } from '@/type/company'
    import type { FormRules } from 'element-plus';
    // 搜索录入相关信息
    let isShowEnteringModal: boolean = false;
    let searchObj: searchType = reactive({
        searchMsg: "",
        city: "",
        district: "",
        management: ""
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
    let modalType = ref(0)
    let formData: formType = reactive({})
    let userInfo: userType = {}
    let activeManageType: Array<string> = []
    let districtDataArr: Array<Object> = []
    let districtData: Array<districtType> = []
    const formRules = reactive<FormRules>({})
    const regionData = reactive<Array<regionType>>([{
        code: '',
        name: ''
    }])

    // 函数区域
    const searchInfo = () => {}
    const beforeUploadAction = () => {}
    const uploadSucAction = () => {} 
    const uploadErrAction = () => {}
    const exportData = () => {}
    const downLoadTemplate = () => {}
    const deleteMoreConsumer = () => {}
    const closeEnteringModal = () => {}
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
    const addAddress = () => {}
    const managementChange = () => {}
    const districtChange = (val: string, num: number) => {
        console.log(val, num)
    }
    const cityChange = (str: string, num: number) => {
        console.log(str, num)
    }
    const handleSubmit = (val: string, num: number) => {
        console.log(val, num)
    }
    const clear = (index: number) => {
        console.log(index)
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

.blue_text {
    color: #409eff;
}

.green_text {
    color: #54c698;
}

.orange_text {
    color: #e4a041;
}

.red_text {
    color: #f05858;
}

.skyblue_text {
    width: 52px;
    color: #57a3f3;
}

.grey_text {
    display: none !important;
    width: 52px;
}

.blue_btn {
    background: #5d7cc9 !important;
    color: #fff !important;
    border: 0;
}

.blue_btn2 {
    background: #00c4ff !important;
    color: #fff !important;
    border: 0;
}

.blue_btn:hover {
    background: #899ed1 !important;
    color: #fff !important;
    border: 0;
    outline: none;
}

.green_btn {
    background: #54c698 !important;
    color: #fff !important;
    border: 0;
}

.green_btn:hover {
    background: #8ee9c4 !important;
    color: #fff !important;
    border: 0;
    outline: none;
}

.dgreen_btn {
    background: #55c6ba !important;
    color: #fff !important;
    border: 0;
}

.dgreen_btn:hover {
    background: #95e9e0 !important;
    color: #fff !important;
    border: 0;
    outline: none;
}

.red_btn {
    background: #e55644 !important;
    color: #fff !important;
    border: 0;
}

.red_btn:hover {
    background: #f08476 !important;
    color: #fff !important;
    border: 0;
    outline: none;
}

.actions {
    display: flex;
    justify-content: center;
    align-items: center;

}

.actions .action_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;
    cursor: pointer;
    background: transparent;
    border: none;
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