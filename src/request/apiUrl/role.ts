import { get, post, put, del } from '../index.ts'
const reUrl = '/api'
export default {
    getRoleList: () => {
        return get(`${reUrl}/admin/role/get_list`, {})
    },
    addRole: (params: any) => {
        return post(`${reUrl}/admin/role/add`, params)
    },
    editRole: (params: any) => {
        return put(`${reUrl}/admin/role/edit/${params.id}`, params)
    }, 
    delRole: (id: number) => {
        return del(`${reUrl}/admin/role/del/${id}`, {})
    }
}