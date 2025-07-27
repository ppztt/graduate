const { get, post, del, put } = useRequest()
const reUrl = '/api'

export default {
    login: (params: Object) => {
        return post(`${reUrl}/back_way/user/login`, params)
    },
    updatePersonInfo: (params: object, id: number) => {
        return put(`${reUrl}/back_way/user/list/${id}`, params)
    },
    addUser: (params: Object) => {
        return post(`${reUrl}/back_way/user/addUser`, params)
    },
    getData: (params: object) => {
        return get(`${reUrl}/back_way/user/list`, params)
    },
    delUser: (id: number) => {
        return del(`${reUrl}/back_way/user/list/${id}`, {})
    },
    resetPassword: (id: number) => {
        return get(`${reUrl}/back_way/user/reset_password/${id}`, {})
    }
}