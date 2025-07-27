<template>
    <div>
        <el-form
          ref="ruleFormRef"
          :model="formData"
          status-icon
          :rules="rules"
          label-width="90px"
          class="demo-ruleForm">
          <el-form-item label="投诉标题" prop="title">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="所属省份" prop="province">
                <el-select
                    size="default"
                    placeholder="省"
                    :clearable="true"
                    filterable
                    v-model="formData.province"
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
                    size="default"
                    placeholder="市"
                    :clearable="true"
                    :disabled="!formData.province"
                    filterable
                    v-model="formData.city"
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
            <el-form-item label="所属区县" prop="district">
                <el-select
                    size="default"
                    v-model="formData.district"
                    placeholder="县/区"
                    :clearable="true"
                    :disabled="!formData.city"
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
            <el-form-item label="所属乡/镇" prop="town">
                <el-select
                    size="default"
                    v-model="formData.town"
                    placeholder="乡/镇"
                    :disabled="!formData.district"
                    :clearable="true">
                    <el-option
                        v-for="item in townList"
                        :value="item.name"
                        :key="item.code"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联企业" prop="company_id">
                <el-select
                    v-model="formData.company_id"
                    placeholder="请选择关联企业">
                    <el-option
                        v-for="item in companyList"
                        :value="item.id"
                        :key="item.id"
                        :label="item.regName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="投诉类型" prop="type">
                <el-select
                    v-model="formData.type"
                    placeholder="请选择投诉类型">
                    <el-option
                        v-for="item in typeList"
                        :value="item.id"
                        :key="item.id"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="投诉内容" prop="desc">
                <el-input v-model="formData.desc" type="textarea" />
            </el-form-item>
            <el-form-item label="附件上传" prop="file">
                <el-upload
                    v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    class="upload-demo"
                    multiple
                    :limit="1"
                    :on-change="handlefile">
                    <el-button type="primary">上传附件</el-button>
                    <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500KB.
                    </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="loginButton" @click="submitForm(ruleFormRef)">提交</el-button>
                <el-button class="loginButton" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import {reactive, ref, onMounted, getCurrentInstance} from 'vue'
    import { type regionType } from "../../../../type/company";
    import type { FormRules, FormInstance, UploadUserFile } from 'element-plus'

    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $success = proxy.$success

    const fileList = ref<UploadUserFile[]>([])
    const ruleFormRef = ref<FormInstance>()
    const rules = reactive<FormRules>({
        title: [{required: true, message: '请输入事件标题', trigger: 'blur'}],
        province: [{required: true, message: '请输入所属省份', trigger: 'blur'}],
        city: [{required: true, message: '请输入所属城市', trigger: 'blur'}],
        district: [{required: true, message: '请输入所属区/县', trigger: 'blur'}],
        town: [{required: true, message: '请输入所属乡/镇', trigger: 'blur'}],
        company_id: [{required: true, message: '请选择关联企业', trigger: 'blur'}],
        desc: [{required: true, message: '请输入投诉内容', trigger: 'blur'}],
        type: [{required: true, message: '请选择投诉类型', trigger: 'blur'}],
        file: [{required: true, message: '请选择附件', trigger: 'blur'}]
    })
    let provinceList = ref<Array<regionType>>([])
    let cityList = ref<Array<regionType>>([])
    let districtList= ref<Array<regionType>>([])
    let townList= ref<Array<regionType>>([])
    let typeList = ref<Array<any>>([])
    let companyList = ref<Array<any>>([])
    let allCompanyList = ref<Array<any>>([])
    let formData = reactive<any>({
        city: '',
        province: ''
    })

    const getType = async () => {
        try {
            const res = await $api.Content.getComplainType()
            if (res.result) {
                typeList.value = res.data
            }
        } catch (error) {
            
        }
    }
    const getCompanyList = async () => {
        try {
            const res = await $api.Company.getAllCompany({size: -1})
            if (res.result) {
                allCompanyList.value = res.data
            }
        } catch (error) {
            console.log(error)
        }
    }
    const provinceChange = (val: string) => {
        const code: number | undefined = Number(provinceList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('province', {
            province: Number((code + '').slice(0, 2))
        })
        companyList.value = allCompanyList.value.filter(item => item.province === formData.province)
    }
    const cityChange = (val: string) => {
        const code: number | undefined = Number(cityList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('city', {
            province: (code + '').slice(0, 2),
            city: (code + '').slice(2, 4)
        })
        companyList.value = companyList.value.filter(item => item.city === formData.city)
    }
    const districtChange = (val: string) => {
        const code: number | undefined = Number(districtList.value.find((item: regionType) => item.name === val)?.code)
        getRegion('district', {
            province: (code + '').slice(0, 2),
            city: (code + '').slice(2, 4),
            district: (code + '').slice(4, 6)
        })
        companyList.value = companyList.value.filter(item => item.district === formData.district)
    }
    const getRegion = async (type: string, assignParams = {}) => {
        const params: any = {
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
    const submitForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid: Boolean) => {
            if (valid) {
                const userInfo = JSON.parse(localStorage.getItem('commonUserInfo') || '')
                const params: any = {
                    ...formData,
                    user_id: userInfo.id,
                    user_name: userInfo.user_name
                }
                let Form: FormData = new FormData()
                for (let key in params) {
                    Form.append(key, params[key])
                }
                $api.gateWay.postComplaint(Form, {
                        "Content-Type": "multipart/form-data"
                    }).then((res: any) => {
                        if (res.result) {
                            $success('投诉成功')
                        }
                    })
                localStorage.setItem('complaint', JSON.stringify(formData))
            }
        })
    }
    const resetForm = () => {
        formData = reactive<any>({})
    }
    const handlefile = (file: any) => {
        URL.createObjectURL(file.raw)
        formData.file = file.raw
    }
    // const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    //     fileList.value = uploadFiles
    //     console.log(uploadFile, 'uploadFile')
    //     console.log([...uploadFiles], 'uploadFiles')
    //     fileList.value = fileList.value.slice(-3)
    // }
    onMounted(() => {
        getRegion('')
        getType()
        getCompanyList()
    });
</script>

<style lang="scss" scoped>

</style>