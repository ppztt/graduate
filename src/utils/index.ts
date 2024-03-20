import { ElMessage } from 'element-plus'
import { rule } from '../type/common'

export const common = (str: string) => {
  ElMessage(str)
}
export const success = (str: string) => {
  ElMessage({
    message: str,
    type: 'success',
  })
}
export const warning = (str: string) => {
  ElMessage({
    message: str,
    type: 'warning',
  })
}
export const error = (str: string) => {
  ElMessage.error(str)
}
export function formatDate(date: any, format: string) {
  let time: Date = new Date()
  if (!date) return ''
  if (typeof date === 'string') {
      time = new Date(date.replace(/-/g, '/').replace(/T|Z/g, ' ').trim())
  } else if (typeof date === 'object') {
      time = new Date(date)
  }
  const o: rule = {
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