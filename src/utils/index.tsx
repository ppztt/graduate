import { message } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
export function formatDate(date: string, format: string) {
    let time: any
    if (!date) return ''
    if (typeof date === 'string') {
        time = new Date(date.replace(/-/g, '/').replace(/T|Z/g, ' ').trim())
    } else if (typeof date === 'object') {
        time = new Date(date)
    }
    const o: any = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return format
}

export const $message = (type: NoticeType, content: string) => {
    const [messageApi] = message.useMessage()
    return messageApi[type](content)
}