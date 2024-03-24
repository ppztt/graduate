import {get, post, put, del} from '../index.ts'
const reUrl = '/api'

export default {
    getCompany: (params: Object) => {
        return get(`${reUrl}/admin/company/get_data`, params)
    },
    getRegion: (params: Object) => {
        return get(`${reUrl}/admin/company/region`, params)
    },
    addCompany: (params: Object) => {
        return post(`${reUrl}/admin/company/add`, params)
    }
}