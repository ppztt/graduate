export interface passwordForm {
    oldPassword: string
    newPassword: string
    reNewPassword: string
}
export interface addForm{
    roleId: number
    account: string
    address: string
    city: string
    district: string
    email: string
    newPassword: string
    password: string
    phone: string
    realname: string
}
export interface roleType{
    id: number
    name: string
}