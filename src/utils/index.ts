import { ElMessage } from 'element-plus'

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