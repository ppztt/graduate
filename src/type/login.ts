export interface LoginFormType{
    username:string
    password:string
}
export class LoginData{
    ruleForm:LoginFormType = {
        username: '',
        password: ''
    }
}