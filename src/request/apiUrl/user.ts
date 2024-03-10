import {get, post, put, del} from '../index.ts'
const reUrl = '/api'

export default {
    login: (params: Object) => {
        return post(`${reUrl}/admin/user/login`, params)
    }
}