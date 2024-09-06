export interface userType {
    user_name: string
    organization: string
    create_time?: string
    update_time?: string
    [key: string]: any
}

export interface roleType {
    id?: number | string
    role_name: string
    role_level: number
    desc: string
    menu_list: Array<number> | string
}
