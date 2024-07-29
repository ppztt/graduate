export interface userTableType {
    user_name: string
    address: string
    create_time: string
    update_time: string
    [key: string]: any
}

export interface roleType {
    id?: number | string
    role_name: string
    desc: string
}