import {get, post, put, del} from '../index.ts'
const reUrl = '/api'

export default {
    login: (params: Object) => {
        return post(`${reUrl}/admin/user/login`, params)
    },
    updatePersonInfo: (params: object, id: number) => {
        return put(`${reUrl}/admin/user/list/${id}`, params)
    },
    addUser: (params: Object) => {
        return post(`${reUrl}/admin/user/addUser`, params)
    },
    getData: (params: object) => {
        return get(`${reUrl}/admin/user/list`, params)
    },
    delUser: (id: number) => {
        return del(`${reUrl}/admin/user/list/${id}`, {})
    }
}