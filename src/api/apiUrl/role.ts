import { roleType } from '@/type/tableType'
import { reUrl, get, del, post, put } from '../index'

const Role = {
    getRoleList: (params: Object) => {
        return get(`${reUrl}/back_way/role/get_list/`, params)
    },
    delRole: (id: number | string) => {
        return del(`${reUrl}/back_way/role/del_role/${id}`)
    },
    addRole: (params: object) => {
        return post(`${reUrl}/back_way/role/add_role/`, params)
    },
    editRole: (params: roleType) => {
        return put(`${reUrl}/back_way/role/edit_role/${params.id}`, params)
    }
}
export default Role