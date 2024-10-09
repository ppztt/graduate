import { del, get, reUrl } from '../index'

const Complain = {
    getComplainList: (params: any) => {
        return get(`${reUrl}/back_way/complaint/get_complain_list/`, params)
    },
    delComplainList: (id: Number) => {
        return del(`${reUrl}/back_way/complaint/del_complain_list/${id}`)
    },
    getComplaintType: (params: any) => {
        return get(`${reUrl}/back_way/complaint/get_complain_type/`, params)
    }
}

export default Complain