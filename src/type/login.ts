export interface LoginFormType{
    username:string
    password:string
    phone?: string
    email?: string
    prePassword?: string
}
export class LoginData{
    ruleForm:LoginFormType = {
        username: '',
        password: '',
        phone: '',
        email: '',
        prePassword: ''
    }
}