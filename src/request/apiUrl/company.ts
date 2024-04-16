import {get, post, put, del} from '../index.ts'
const reUrl = '/api'

export default {
    getCompany: (params: Object) => {
        return get(`${reUrl}/admin/company/get_data`, params)
    },
    getAllCompany: (params: Object) => {
        return get(`${reUrl}/admin/company/get_all`, params)
    },
    getRegion: (params: Object) => {
        return get(`${reUrl}/admin/company/region`, params)
    },
    addCompany: (params: Object) => {
        return post(`${reUrl}/admin/company/add`, params)
    },
    getModelFile: (params: Object, config: Object) => {
        return post(`${reUrl}/admin/company/model_file`, params, config)
    },
    delCompany: (id: number) => {
        return del(`${reUrl}/admin/company/del_company/${id}`, {})
    },
    editCompany: (id: number, params: any) => {
        return put(`${reUrl}/admin/company/update_company/${id}`, params)
    }
}