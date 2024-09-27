import { del, get, reUrl } from '../index'

const Complain = {
    getComplainList: (params: any) => {
        return get(`${reUrl}/back_way/merchant/get_complain_list/`)
    },
    delComplainList: (id: Number) => {
        return del(`${reUrl}/back_way/merchant/del_complain_list/${id}`)
    }
}

export default Complain