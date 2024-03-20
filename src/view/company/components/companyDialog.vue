<template>
    <el-dialog
        v-model="isShow" 
        title="经营者-录入" 
        width="800"
        @close="closeEnteringModal">
        <el-form 
            ref="form" 
            label-width="150px" 
            :model="formData" 
            :rules="formRules"
            :label-position="'right'">
            <div class="form-part">基本信息</div>
            <el-form-item label="经营者注册名称" prop="regName">
                <el-input
                    size="default" 
                    v-model="formData.regName"
                    placeholder="请输入经营者注册名称">
                </el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="creditCode">
                <el-input
                    size="default"
                    v-model="formData.creditCode"
                    placeholder="请输入统一社会信用代码">
                </el-input>
            </el-form-item>
            <el-form-item label="网店名称" prop="onlineName">
                <el-input 
                    size="default" 
                    v-model="formData.onlineName"
                    placeholder="请输入网店名称">
                </el-input>
            </el-form-item>
            <el-form-item label="所属平台" prop="platform">
                <el-input 
                    size="default"
                    v-model="formData.platform"
                    placeholder="请输入所属平台">
                </el-input>
            </el-form-item>
            <el-form-item label="门店名称" prop="storeName">
                <el-input size="default" v-model="formData.storeName" placeholder="请输入门店名称"></el-input>
            </el-form-item>
            <el-form-item label="所属省份" prop="province">
                <el-select 
                    v-model="formData.province"
                    placeholder="省份"
                    :clearable="true"
                    @change="provinceChange(formData.province)" @clear="clear(index)">
                    <el-option
                        v-for="item in provinceList"
                        :value="item.name"
                        :key="item.code"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属城市" prop="city">
                <el-select
                    v-model="formData.city"
                    placeholder="市"
                    @change="cityChange(formData.city)">
                    <el-option
                        v-for="item in cityList"
                        :value="item.name"
                        :key="item.code"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属地区" prop="district">
                <el-select
                    placeholder="区/县"
                    v-model="formData.district"
                    @change="districtChange(formData.district)">
                    <el-option
                        v-for="item in districtList"
                        :value="item.name"
                        :key="item.code"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属城镇" prop="town">
                <el-select
                    v-model="formData.town"
                    placeholder="镇/村"
                    @change="townChange(formData.town)">
                    <el-option
                        v-for="item in townList"
                        :value="item.name"
                        :key="item.code"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="负责人姓名" prop="principal">
                <el-input
                    v-model="formData.principal"
                    placeholder="请输入负责人姓名">
                </el-input>
            </el-form-item>
            <el-form-item label="负责人电话" prop="principalTel">
                <el-input
                    type="tel"
                    v-model="formData.principalTel"
                    placeholder="请输入负责人电话">
                </el-input>
            </el-form-item>
            <el-form-item label="企业申请日期：" prop="applicationDate">
                <el-date-picker 
                    value-format="YYYY-MM-DD"
                    format="YYYY-MM-DD"
                    v-model="formData.applicationDate" 
                    type="date"
                    placeholder="请选择时间">
                </el-date-picker>
            </el-form-item>
            <div class="submit-btns">
                <el-button size="default" type="primary" @click="handleSubmit(form)">
                    提交
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">
    import { reactive, ref, defineProps, defineExpose, onMounted } from 'vue'
    import { formType, userType, districtType, regionType } from '../../../type/company'
    import { formatDate } from '@/utils/index'
    import type { FormRules, FormInstance } from 'element-plus'

    let isShow = ref(false)

    let modalType = ref(0)
    let formData: formType = reactive({
        applicationDate: formatDate(new Date(), 'yyyy-MM-dd')
    })
    let userInfo: userType = {}
    let activeManageType: Array<string> = []
    let provinceList = reactive<Array<regionType>>([])
    let cityList = reactive<Array<regionType>>([])
    let districtList= reactive<Array<regionType>>([])
    const form = ref<FormInstance>(null)
    const formRules = reactive<FormRules>({
        regName: [{required: true, message: '请输入经营者注册名称', trigger: 'blur'}],
        creditCode: [{required: true, message: '请输入统一社会信用代码', trigger: 'blur'}],
        province: [{required: true, message: '请输入所属省份', trigger: 'blur'}],
        city: [{required: true, message: '请输入所属城市', trigger: 'blur'}],
        district: [{required: true, message: '请输入所属区/县', trigger: 'blur'}],
        principal: [{required: true, message: '请输入负责人姓名', trigger: 'blur'}],
        principalTel: [{required: true, message: '请输入负责人联系电话', trigger: 'blur'}]
    })
    const regionData = reactive<Array<regionType>>([])

    const closeEnteringModal = () => {}
    const addAddress = () => {}
    const managementChange = () => {}
    const provinceChange = (val: string) => {
        console.log(val)
    }
    const cityChange = (str: string, num: number) => {
        console.log(str, num)
    }
    const districtChange = (val: string, num: number) => {
        console.log(val, num)
    }
    const handleSubmit = (formEl: FormInstance | undefined) => {
        formEl.validate((valid: Boolean) => {
            console.log(valid)
        }) 
    }
    const clear = (index: number) => {
        console.log(index)
    }
    const showDialog = () => {
        isShow.value = true
    }
    defineExpose({
        showDialog
    })
    onMounted(() => {
    })
</script>

<style scoped>

</style>