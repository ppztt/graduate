<template>
    <div>
        <el-dialog 
            ref="formData" 
            v-model="props.isShowEnteringModal" 
            title="经营者-录入" 
            width="800"
            @close="closeEnteringModal">
            <el-form 
                ref="formApply" 
                label-width="150px" 
                :model="formData" 
                :rules="formRules"
                :label-position="'right'">
                <div class="form-part">基本信息</div>
                <el-form-item label="经营者注册名称" prop="regName">
                    <el-input size="default" v-model="formData.regName"
                        placeholder="请输入经营者注册名称"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="creditCode">
                    <el-input size="default" v-model="formData.creditCode"
                        placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="网店名称" prop="onlineName">
                    <el-input size="default" v-model="formData.onlineName"
                        placeholder="请输入网店名称"></el-input>
                </el-form-item>
                <el-form-item label="所属平台" prop="platform">
                    <el-input size="default" v-model="formData.platform" placeholder="请输入所属平台"></el-input>
                </el-form-item>
                <el-form-item label="门店名称" prop="storeName">
                    <el-input size="default" v-model="formData.storeName" placeholder="请输入门店名称"></el-input>
                </el-form-item>
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
                <el-form-item label="负责人姓名" prop="principal">
                    <el-input size="default" v-model="formData.principal"
                        placeholder="请输入负责人姓名"></el-input>
                </el-form-item>
                <el-form-item label="负责人电话" prop="principalTel">
                    <el-input size="default" type="tel" v-model="formData.principalTel"
                        placeholder="请输入负责人电话"></el-input>
                </el-form-item>
                <el-form-item label="企业申请日期：" prop="applicationDate">
                    <el-date-picker size="default" value-format="yyyy-MM-dd HH:mm:ss"
                        format="yyyy-MM-dd" v-model="formData.applicationDate" type="date"
                        placeholder="请选择时间" style="width: 100%">
                    </el-date-picker>
                </el-form-item>
                <div class="form-part">承诺事项及具体内容</div>
                <el-form-item label="品质保证" prop="contents1">
                    <el-input size="default" v-model="formData.contents1" type="textarea"
                        placeholder="请输入文字"></el-input>
                </el-form-item>
                <el-form-item label="诚信保证" prop="contents2">
                    <el-input size="default" v-model="formData.contents2" type="textarea"
                        placeholder="请输入文字"></el-input>
                </el-form-item>
                <el-form-item label="维权保证" prop="contents3">
                    <el-input size="default" v-model="formData.contents3" type="textarea"
                        placeholder="请输入文字"></el-input>
                </el-form-item>
                <el-form-item label="适用商品" prop="contents1">
                    <el-input size="default" v-model="formData.contents1" type="textarea"
                        placeholder="请输入适用商品"></el-input>
                </el-form-item>
                <el-form-item label="退货期限（天）" prop="contents2">
                    <el-input size="default" v-model="formData.contents2" type="textarea"
                        placeholder="请输入退货期限"></el-input>
                </el-form-item>
                <el-form-item label="退货约定" prop="contents3">
                    <el-input size="default" v-model="formData.contents3" type="textarea"
                        placeholder="请输入退货约定具体信息"></el-input>
                </el-form-item>
                <div class="form-part">
                    其他承诺事项及具体内容
                </div>
                <el-form-item label="内容" prop="contents4">
                    <el-input size="default" v-model="formData.contents4" type="textarea"
                        placeholder="请输入内容"></el-input>
                </el-form-item>
                <div class="submit-btns">
                    <el-button size="default" type="primary" @click="handleSubmit('formApply', modalType)">
                        提交
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, defineProps } from 'vue'
    import { formType, userType, districtType, regionType } from '../../../type/company'
    import type { FormRules } from 'element-plus'

    const props = defineProps({
        isShowEnteringModal: {
            type: Boolean,
            default: false
        }
    })

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

    const closeEnteringModal = () => {}
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
</script>

<style scoped>

</style>