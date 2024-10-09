import { reUrl, get, post, put, del } from '../index'

const Content = {
    getContentList: (params: any) => {
        return get(`${reUrl}/back_way/content/get_content_list/`, params)
    },
    addContent: (params: any) => {
        return post(`${reUrl}/back_way/content/add_content/`, params)
    },
    editContent: (id: number | string, params: any) => {
        return put(`${reUrl}/back_way/content/edit_content/${id}`, params)
    },
    delContent: (id: number | string) => {
        return del(`${reUrl}/back_way/content/del_content/${id}`)
    }
}

export default Content