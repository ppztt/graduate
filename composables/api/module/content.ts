const { get, post, del, put } = useRequest()
const reUrl = '/api'
export default {
    getContentList: (params: any) => {
        return get(`${reUrl}/back_way/content/get_list`, params)
    },
    addContent: (params: any) => {
        return post(`${reUrl}/back_way/content/add`, params)
    },
    editContent: (params: any) => {
        return put(`${reUrl}/back_way/content/edit/${params.id}`, params)
    }, 
    delContent: (id: number) => {
        return del(`${reUrl}/back_way/content/del/${id}`, {})
    },
    getComplainType: () => {
        return get(`${reUrl}/back_way/content/complain_type`, {})
    }
}