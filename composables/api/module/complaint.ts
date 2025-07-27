const { get, post, del, put } = useRequest()
const reUrl = '/api'

export default {
    getList: (params: any) => {
        return get(`${reUrl}/back_way/complaint/list`, params)
    },
    delComplaint: (params: any) => {
        return del(`${reUrl}/back_way/complaint/list/${params.id}`, {})
    },
    editComplaint: (params: any) => {
        return post(`${reUrl}/back_way/complaint/edit_complaint`, params)
    }
}