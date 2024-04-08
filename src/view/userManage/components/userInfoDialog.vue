<template>
    <el-dialog
        v-model="isShow" 
        :title="props.isEdit ? '编辑用户' : '新增用户'" 
        width="800"
        @close="closeEnteringModal(form)">
        <el-form 
            ref="form" 
            label-width="150px" 
            :model="formData" 
            :rules="formRules"
            :label-position="'right'">
            <div class="form-part">基本信息</div>
            <el-form-item label="用户名" prop="user_name">
                <el-input
                    size="default" 
                    v-model="formData.user_name"
                    placeholder="请输入用户名">
                </el-input>
            </el-form-item>
            <el-form-item label="所属角色" prop="role_level">
                <el-select
                    v-model="formData.role_level"
                    placeholder="所属角色"
                    @clear="clear('town')">
                    <el-option
                        v-for="(item) in props.roleList"
                        :value="item.role_level"
                        :key="item.id"
                        :label="item.role_name">
                    </el-option>
                </el-select>
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
            <el-form-item v-if="formData.role_level > 2" label="所属城市" prop="city">
                <el-select
                    v-model="formData.city"
                    :disabled="!formData.province"
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
            <el-form-item v-if="formData.role_level > 3" label="所属地区" prop="district">
                <el-select
                    placeholder="区/县"
                    :disabled="!formData.city"
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
            <el-form-item v-if="formData.role_level > 4" label="所属城镇" prop="town">
                <el-select
                    v-model="formData.town"
                    :disabled="!formData.district"
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
            <el-form-item label="联系方式" prop="phone">
                <el-input
                    v-model="formData.phone"
                    placeholder="请输入联系方式">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input
                    v-model="formData.email"
                    placeholder="请输入邮箱">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    type="password"
                    v-model="formData.password"
                    placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="prePassword">
                <el-input
                    type="password"
                    v-model="formData.prePassword"
                    placeholder="请确认密码">
                </el-input>
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
    const emit = defineEmits(['isShowFalse', 'getData'])
    const { proxy }: any = getCurrentInstance()
    const $api = proxy.$api
    const $success = proxy.$success
    const $error = proxy.$error

    const props = defineProps({
        roleList: {
            type: Array,
            default: []
        },
        isEdit: {
            type: Boolean,
            dafault: false
        },
        userId: {
            type: Number,
            default: -1
        }
    })

    let isShow = ref(false)

    let formData: formType = reactive({})
    const validatePass = (rule: any, value: any, callback: any) => {
        if (value !== formData.password) {
            callback(new Error('两次密码输入不一致'))
        } else {
            callback()
        }
    }
    let provinceList = ref<Array<regionType>>([])
    let cityList = ref<Array<regionType>>([])
    let districtList= ref<Array<regionType>>([])
    let townList= ref<Array<regionType>>([])
    const form = ref<FormInstance>()
    const formRules = reactive<FormRules>({
        user_name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        province: [{required: true, message: '请输入所属省份', trigger: 'blur'}],
        role_level: [{required: true, message: '请输入角色', trigger: 'blur'}],
        city: [{required: true, message: '请输入所属城市', trigger: 'blur'}],
        district: [{required: true, message: '请输入所属区/县', trigger: 'blur'}],
        town: [{required: true, message: '请输入所属乡/镇', trigger: 'blur'}],
        phone: [{required: true, message: '请输入联系方式', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
        password: [
                {required: true, message: '请输入密码', trigger: 'blur'},
                {min: 6, max: 15, message: '长度为6-15位', trigger: 'blur'}
                ],
        prePassword: [
            {required: true, message: '请确认密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 15, message: '长度为6-15位', trigger: 'blur'}]
    })

    const closeEnteringModal = (formEl: FormInstance | undefined) => {
        if(!formEl) return
        formEl.resetFields()
        emit('isShowFalse')
        formData = reactive({})
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
            if(valid) {
                $api.User.addUser(data).then((res: any) => {
                    if (res.result) {
                        $success('创建成功')
                        emit('getData')
                        isShow.value = false
                    } else {
                        $error(res.message)
                    }
                })
                
            }
            localStorage.setItem('companyData', JSON.stringify(data))
        })
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
    const getData = async () => {
        const params = {
            page: 1,
            size: 10
        }
        try {
            const res = await $api.User.getData(params)
            const userInfo = res.data.find((item: any )=> item.id === props.userId)
            if (res.result) {
                formData = reactive({
                    ...userInfo
                })
            }
        } catch (error) {
            
        }
    }
    defineExpose({
        showDialog
    })
    onMounted(() => {
        console.log('111')
        if (props.userId !== -1) {
            getData()
        }
        getRegion('')
    })
</script>

<style scoped>

</style>