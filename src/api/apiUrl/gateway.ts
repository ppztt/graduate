import { get, post, reUrl } from "../index"

const gateway = {
    gatewayLogin: (params: any) => {
        return post(reUrl + '/gateway/user/login', params)
    },
    postComplain: (params: any) => {
        return post(`${reUrl}/gateway/complain/add_complain`, params)
    },
    getComplainList: (params: any) => {
        return get(`${reUrl}/gateway/complain/get_complain_list`, params)
    }
}

export default gateway