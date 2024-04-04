export interface rule{
    [key: string]: any
}
export interface response{
    code?: Number
    message?: string
    result?: boolean
    data?: Array<any> | object
}
export interface paginationType {
    current: number
    size: number
    count: number
}
