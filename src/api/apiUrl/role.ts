import { reUrl, get } from '../index'

const Role = {
    getRoleList: (params: Object) => {
        return get(`${reUrl}/back_way/role/get_list/`, params)
    }
}
export default Role