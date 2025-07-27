const { get, post, del, put } = useRequest()
const reUrl = '/api'
export default {
    getRoleList: (params: any) => {
        return get(`${reUrl}/back_way/role/get_list`, params)
    },
    addRole: (params: any) => {
        return post(`${reUrl}/back_way/role/add`, params)
    },
    editRole: (params: any) => {
        return put(`${reUrl}/back_way/role/edit/${params.id}`, params)
    }, 
    delRole: (id: number) => {
        return del(`${reUrl}/back_way/role/del/${id}`, {})
    }
}