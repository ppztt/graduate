import { reUrl, get, post } from '../index'

const User = {
    userLogin: (params: Object) => {
        return post(`${reUrl}/back_way/user/login`, params)
    },
    getUserList: (params: Object) => {
        return get(`${reUrl}/back_way/user/get_list`, params)
    }
}
export default User
