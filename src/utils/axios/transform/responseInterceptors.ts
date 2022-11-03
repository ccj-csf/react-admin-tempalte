import { message } from 'antd'
import { cleanTicket } from '../ssoTicket'

/**
 * @description: 响应拦截器处理
 */
export const responseInterceptors = (res: any) => {
  try {
    const data = res.data
    const { code } = data
    switch (code) {
      case 200:
        // 只针对含有successMessage的进行提示，如果successMessage没有则提示后端返回消息
        const { successMessage } = res.config.requestOptions
        if (successMessage !== '') {
          message.success(successMessage)
        } else {
          if (data.message) {
            message.success(data.message)
          }
        }
        break
      default:
        break
    }
  } catch (error) {
    console.log('SSO响应拦截错误', error)
  }
  cleanTicket()
  return res
}
