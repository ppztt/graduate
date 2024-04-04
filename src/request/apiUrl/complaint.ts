import {get, del} from '../index'
const reUrl = '/api'

export default {
    getList: (params: any) => {
        return get(`${reUrl}/admin/complaint/list`, params)
    },
    delComplaint: (params: any) => {
        return del(`${reUrl}/admin/complaint/list/${params.id}`, {})
    }
}