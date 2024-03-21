<template>
    <el-dialog
        v-model="isShow" 
        title="经营者-录入" 
        width="800"
        @close="closeEnteringModal(form)">
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
                    @change="provinceChange(formData.province)"
                    @clear="clear('province')">
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
                    @change="cityChange(formData.city)"
                    @clear="clear('city')">
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
                    @change="districtChange(formData.district)"
                    @clear="clear('district')">
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
                    @clear="clear('town')">
                    <el-option
                        v-for="item in townList"
                        :value="item.name"
                        :key="item.code"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input
                    v-model="formData.address"
                    placeholder="请输入详细地址">
                </el-input>
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
    import { reactive, ref, defineProps, defineExpose, onMounted, getCurrentInstance, defineEmits } from 'vue'
    import { formType, userType, districtType, regionType } from '../../../type/company'
    import { formatDate } from '@/utils/index'
    import type { FormRules, FormInstance } from 'element-plus'

    interface regionParams {
        province: number | string
        city: number | string
        district: number | string
    }


    // 工具实例
    const emit = defineEmits(['getMockData'])
    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api

    let isShow = ref(false)

    let modalType = ref(0)
    let formData: formType = reactive({
        applicationDate: formatDate(new Date(), 'yyyy-MM-dd')
    })
    let userInfo: userType = {}
    let activeManageType: Array<string> = []
    let provinceList = ref<Array<regionType>>([])
    let cityList = ref<Array<regionType>>([])
    let districtList= ref<Array<regionType>>([])
    let townList= ref<Array<regionType>>([])
    const form = ref<FormInstance>(null)
    const formRules = reactive<FormRules>({
        regName: [{required: true, message: '请输入经营者注册名称', trigger: 'blur'}],
        creditCode: [
            {required: true, message: '请输入统一社会信用代码', trigger: 'blur'},
            {pattern: /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g, message: '请正确填写代码', trigger: 'blur'}
        ],
        province: [{required: true, message: '请输入所属省份', trigger: 'blur'}],
        city: [{required: true, message: '请输入所属城市', trigger: 'blur'}],
        district: [{required: true, message: '请输入所属区/县', trigger: 'blur'}],
        town: [{required: true, message: '请输入所属乡/镇', trigger: 'blur'}],
        address: [{required: true, message: '请输入详细地址', trigger: 'blur'}],
        principal: [{required: true, message: '请输入负责人姓名', trigger: 'blur'}],
        principalTel: [{required: true, message: '请输入负责人联系电话', trigger: 'blur'}]
    })

    const closeEnteringModal = (formEl: FormInstance | undefined) => {
        if(!formEl) return
        formEl.resetFields()
        formData = reactive({
            applicationDate: formatDate(new Date(), 'yyyy-MM-dd')
        })
    }
    const provinceChange = (val: string) => {
        const code: number | undefined = Number(provinceList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('province', {
            province: Number((code + '').slice(0, 2))
        })
    }
    const cityChange = (val: string) => {
        const code: number | undefined = Number(cityList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('city', {
            province: (code + '').slice(0, 2),
            city: (code + '').slice(2, 4)
        })
    }
    const districtChange = (val: string) => {
        const code: number | undefined = Number(districtList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('district', {
            province: (code + '').slice(0, 2),
            city: (code + '').slice(2, 4),
            district: (code + '').slice(4, 6)
        })
    }
    const handleSubmit = (formEl: FormInstance | undefined) => {
        if(!formEl) return
        const data = {...formData}
        formEl.validate((valid: Boolean) => {
            localStorage.setItem('companyData', JSON.stringify(data))
        })
        emit('getMockData')
        isShow.value = false
    }
    const clear = (val: string) => {
        switch (val) {
            case 'province':
                provinceList.value = []
                cityList.value = []
                districtList.value = []
                townList.value = []
                break
            case 'city':
                cityList.value = []
                districtList.value = []
                townList.value = []
                break;
            case 'districtList':
                districtList.value = []
                townList.value = []
                break
            case 'town':
                townList.value = []
                break
            default:
                break;
        }
    }
    const showDialog = () => {
        isShow.value = true
    }
    // 获取地区数据
    const getRegion = async (type: string, assignParams = {}) => {
        const params: regionParams = {
            province: '',
            city: '',
            district: '',
            ...assignParams
        }
        const res = await $api.Company.getRegion(params)
        switch (type) {
            case '':
                provinceList.value = res.data
                break;
            case 'province':
                cityList.value = [...res.data]
                break
            case 'city':
                districtList.value = [...res.data]
                break
            case 'district':
                townList.value = [...res.data]
                break
            default:
                break;
        }
    }
    defineExpose({
        showDialog
    })
    onMounted(() => {
        getRegion('')
    })
</script>

<style scoped>

</style>