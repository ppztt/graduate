import { reUrl, get } from '../index'

const Role = {
    getOrganizationList: (params: Object) => {
        return get(`${reUrl}/back_way/organization/get_list/`, params)
    }
}
export default Role