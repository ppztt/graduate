export interface complainTypeDefinition {
    id?: number
    type_name: string
    desc: string
}
export interface complainType {
    id?: number
    area_id?: number | null
    area_name?: string
    merchant_id?: number | null
    merchant_name?: string
    content?: string
    result?: string
    user_id?: number
    initiator_name?: string
    complain_type?: number | null
    complain_type_cn?: string
    status?: string
    status_cn?: string
    create_time?: string
    update_time?: string
    order_num?: string
}