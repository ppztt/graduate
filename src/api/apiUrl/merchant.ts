import { reUrl, get, post, put, del } from '../index'

const Merchant = {
    getMerchantList: (params: any) => {
        return get(`${reUrl}/back_way/merchant/get_mergant_list/`, params)
    },
    addMerchant: (params: any) => {
        return post(`${reUrl}/back_way/merchant/add_merchant/`, params)
    },
    editMerchant: (id: Number | string, params: any) => {
        return put(`${reUrl}/back_way/merchant/edit_merchant/${id}`, params)
    },
    delMerchant: (id: Number | string) => {
        return del(`${reUrl}/back_way/merchant/del_merchant/${id}`)
    },
    getAreaList: (params: any) => {
        return get(`${reUrl}/back_way/merchant/get_area_list/`, params)
    },
    addArea: (params: any) => {
        return post(`${reUrl}/back_way/merchant/add_area/`, params)
    },
    editArea: (id: number, params: any) => {
        return put(`${reUrl}/back_way/merchant/edit_area/${id}`, params)
    },
    delArea: (id: number) => {
        return del(`${reUrl}/back_way/merchant/delete_area/${id}`)
    }
}
export default Merchant