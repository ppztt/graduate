import {get, post, put, del} from '../index.ts'
const reUrl = '/api'

export default {
    getRegion: (params: Object) => {
        return get(`${reUrl}/admin/company/region`, params)
    }
}