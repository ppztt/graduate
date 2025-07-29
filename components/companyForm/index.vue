<template>
    <el-form 
        ref="form" 
        label-width="150px" 
        :model="base.formData" 
        :rules="formRules"
        :label-position="'right'">
        <div class="form-part">{{props.title}}</div>
        <el-form-item label="经营者注册名称" prop="regName">
            <el-input
                size="default" 
                v-model="base.formData.regName"
                placeholder="请输入经营者注册名称">
            </el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="creditCode">
            <el-input
                size="default"
                v-model="base.formData.creditCode"
                placeholder="请输入统一社会信用代码">
            </el-input>
        </el-form-item>
        <el-form-item label="网店名称" prop="onlineName">
            <el-input 
                size="default" 
                v-model="base.formData.onlineName"
                placeholder="请输入网店名称">
            </el-input>
        </el-form-item>
        <el-form-item label="所属平台" prop="platform">
            <el-input 
                size="default"
                v-model="base.formData.platform"
                placeholder="请输入所属平台">
            </el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="storeName">
            <el-input size="default" v-model="base.formData.storeName" placeholder="请输入门店名称"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" prop="province">
            <el-select 
                v-model="base.formData.province"
                placeholder="省份"
                :clearable="true"
                @change="provinceChange(base.formData.province)"
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
                v-model="base.formData.city"
                placeholder="市"
                @change="cityChange(base.formData.city)"
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
                v-model="base.formData.district"
                @change="districtChange(base.formData.district)"
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
                v-model="base.formData.town"
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
                v-model="base.formData.address"
                placeholder="请输入详细地址">
            </el-input>
        </el-form-item>
        <el-form-item label="负责人姓名" prop="charge_person_name">
            <el-input
                v-model="base.formData.charge_person_name"
                placeholder="请输入负责人姓名">
            </el-input>
        </el-form-item>
        <el-form-item label="负责人电话" prop="charge_person_tel">
            <el-input
                type="tel"
                v-model="base.formData.charge_person_tel"
                placeholder="请输入负责人电话">
            </el-input>
        </el-form-item>
        <el-form-item label="企业申请日期：" prop="create_time">
            <el-date-picker 
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                v-model="base.formData.create_time" 
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
</template>

<script lang="ts" setup>
    import { reactive, ref, onMounted, getCurrentInstance, watch } from 'vue'
    import type { formType, regionType } from '../../type/company'
    import { formatDate } from '../../utils/index'
    import type { FormRules, FormInstance } from 'element-plus'

    interface regionParams {
        province: number | string
        city: number | string
        district: number | string
    }
    interface baseType {
        formData: formType
    }

    // 工具实例
    const props = defineProps({
        baseData: {
            type: Object,
            default: {}
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '基本信息'
        }
    })
    const emit = defineEmits(['getMockData', 'confirm'])
    const $request = useApi()

    let isShow = ref(false)
    const base = reactive<baseType>({
        formData: {
            create_time: formatDate(new Date(), 'yyyy-MM-dd')
        }
    })
    let provinceList = ref<Array<regionType>>([])
    let cityList = ref<Array<regionType>>([])
    let districtList= ref<Array<regionType>>([])
    let townList= ref<Array<regionType>>([])
    const form = ref<FormInstance>()
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
        charge_person_name: [{required: true, message: '请输入负责人姓名', trigger: 'blur'}],
        charge_person_tel: [{required: true, message: '请输入负责人联系电话', trigger: 'blur'}]
    })
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
        const data = {...base.formData}
        formEl.validate((valid: Boolean) => {
            if(valid) {
                emit('confirm', [data])
            }
        })
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
    // 获取地区数据
    const getRegion = async (type: string, assignParams = {}) => {
        const params: regionParams = {
            province: '',
            city: '',
            district: '',
            ...assignParams
        }
        const res = await $request.Company.getRegion(params)
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
    watch(
        () => props.baseData, 
        () => {
            if(props.isEdit) {
                base.formData = props.baseData
            }
        },
        {
            deep: true
        })
    onMounted(() => {
        getRegion('')
    })
</script>

<style lang="scss" scoped>

</style>