export interface searchType {
    searchMsg: string
    province: string
    town: string
    city: string
    district: string
    management: string
    status: number
    [key: string]: any
}
export interface pagination {
    size: number;
    current: number
    total: number
}
export interface formType {
    [key: string]: any;
    // contents1: string
    // contents2: string
    // contents3: string
    // contents4: string
    // applicationDate: string
    // principalTel: string
}
export interface userType {
    [key: string]: any
}
export interface districtType {
    [key: string]: any
}
export interface regionType {
    id: Number
    code: string
    name: string
    [key: string]: any
}