export interface merchantTableType {
    id?: number
    merchant_name: string
    merchant_desc: string
    address: string
    floor: number | string
    create_time?: string
    update_time?: string
}
export interface areaType {
    id?: number,
    desc: string,
    area_name: string
}