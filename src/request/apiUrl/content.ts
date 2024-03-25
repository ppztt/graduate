import {get, put, post, del} from '../index'
const reUrl = '/api'
export default {
    getContentList: (params: any) => {
        return get(`${reUrl}/admin/content/get_list`, params)
    },
    addContent: (params: any) => {
        return post(`${reUrl}/admin/content/add`, params)
    },
    editContent: (params: any) => {
        return put(`${reUrl}/admin/content/edit/${params.id}`, params)
    }, 
    delContent: (id: number) => {
        return del(`${reUrl}/admin/content/del/${id}`, {})
    },
    getComplainType: () => {
        return get(`${reUrl}/admin/content/complain_type`, {})
    }
}