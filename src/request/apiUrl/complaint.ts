import {get, del, post} from '../index'
const reUrl = '/api'

export default {
    getList: (params: any) => {
        return get(`${reUrl}/admin/complaint/list`, params)
    },
    delComplaint: (params: any) => {
        return del(`${reUrl}/admin/complaint/list/${params.id}`, {})
    },
    editComplaint: (params: any) => {
        return post(`${reUrl}/admin/complaint/edit_complaint`, params)
    }
}