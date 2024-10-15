import { reUrl, get, post, del } from '../index'

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
    editUser: (id: number, params: Object, config: object) => {
        return post(`${reUrl}/back_way/user/edit_user/${id}`, params, config)
    },
    updateSelf: (id: number, params: Object, config: object) => {
        return post(`${reUrl}/back_way/user/update_self/${id}`, params, config)
    },
    resetPassword: (id: number, params: Object, config: object) => {
        return post(`${reUrl}/back_way/user/reset_password/${id}`, params, config)
    },
    // 数据中心接口
    getDateCenter: (params: {id: number}) => {
        return get(`${reUrl}/back_way/user/get_data_collect`, params)
    }
}
export default User
