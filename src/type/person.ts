export interface personForm {
    [key: string]: string; // 添加索引签名
    username: string;
    phone: string;
    email: string;
    role: string
}
export interface labelType {
    id: string
    label: string
    required?: Boolean
}