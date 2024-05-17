import { post } from '../index'
const reUrl = '/api'

export default{
    postComplaint: (params: FormData, config: Object) => {
        return post(`${reUrl}/admin/complaint/add`, params, config)
    }
}