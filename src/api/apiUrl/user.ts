import { post } from '../index'
const reUrl = '/api'

const User = {
    userLogin: (params: Object) => {
        return post(`${reUrl}/admin/user/login`, params)
    }
}
export default User
