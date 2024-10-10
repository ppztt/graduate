import { del, get, post, put, reUrl } from '../index'

const Complain = {
    getComplainList: (params: any) => {
        return get(`${reUrl}/back_way/complaint/get_complain_list/`, params)
    },
    delComplainList: (id: Number) => {
        return del(`${reUrl}/back_way/complaint/del_complain_list/${id}`)
    },
    // 投诉类型接口
    getComplaintType: (params: any) => {
        return get(`${reUrl}/back_way/complaint/get_complain_type/`, params)
    },
    delComplainType: (id: Number) => {
        return del(`${reUrl}/back_way/complaint/del_complain_type/${id}`)
    },
    addComplainType: (params: any) => {
        return post(`${reUrl}/back_way/complaint/del_complain_type/`, params)
    },
    editComplainType: (id: Number, params: any) => {
        return put(`${reUrl}/back_way/complaint/del_complain_type/${id}`, params)
    }
}

export default Complain