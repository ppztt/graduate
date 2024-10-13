import { post, reUrl } from "../index"

const gateway = {
    gatewayLogin: (params: any) => {
        return post(reUrl + '/gateway/user/login', params)
    }
}

export default gateway