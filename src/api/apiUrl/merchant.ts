import { reUrl, get, post, put, del } from '../index'

const Merchant = {
    getMerchantList: (params: any) => {
        return get(`${reUrl}/back_way/merchant/get_list/`, params)
    },
    addMerchant: (params: any) => {
        return post(`${reUrl}/back_way/merchant/add_merchant/`, params)
    },
    editMerchant: (id: Number | string, params: any) => {
        return put(`${reUrl}/back_way/merchant/edit_merchant/${id}`, params)
    },
    delMerchant: (id: Number | string) => {
        return del(`${reUrl}/back_way/merchant/del_merchant/${id}`)
    }
}
export default Merchant