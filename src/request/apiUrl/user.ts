import {get, post, put, del} from '../index.ts'
const reUrl = '/api'

export default {
    login: (params: Object) => {
        return post(`${reUrl}/admin/user/login`, params)
    },
    updatePersonInfo: (params: object, id: number) => {
        return put(`${reUrl}/admin/user/list/${id}`, params)
    }
}