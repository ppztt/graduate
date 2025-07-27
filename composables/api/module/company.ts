const { get, post, del, put } = useRequest()
const reUrl = '/api'

export default {
    getCompany: (params: Object) => {
        return get(`${reUrl}/back_way/company/get_data`, params)
    },
    getRegion: (params: Object) => {
        return get(`${reUrl}/back_way/company/region`, params)
    },
    addCompany: (params: Object) => {
        return post(`${reUrl}/back_way/company/add`, params)
    },
    getModelFile: (params: Object, config: Object) => {
        return post(`${reUrl}/back_way/company/model_file`, params, config)
    },
    delCompany: (id: number) => {
        return del(`${reUrl}/back_way/company/del_company/${id}`, {})
    },
    editCompany: (id: number, params: any) => {
        return put(`${reUrl}/back_way/company/update_company/${id}`, params)
    }
}