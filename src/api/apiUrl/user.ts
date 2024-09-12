import { reUrl, get, post, del, put } from '../index'

const User = {
    userLogin: (params: Object) => {
        return post(`${reUrl}/back_way/user/login`, params)
    },
    getUserList: (params: Object) => {
        return get(`${reUrl}/back_way/user/get_user_list`, params)
    },
    addUser: (params: Object) => {
        return post(`${reUrl}/back_way/user/add_user`, params)
    },
    delUser: (id: number) => {
        return del(`${reUrl}/back_way/user/del_user/${id}`)
    },
    editUser: (id: number, params: Object) => {
        return put(`${reUrl}/back_way/user/edit_user/${id}`, params)
    }
}
export default User
