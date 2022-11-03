import type { ErrorMessageMode } from '#/axios'
import { notification } from 'antd'

export function checkStatus(
  response: {
    status: number
    data?: any
    [key: string]: any
  },
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  let errMessage = null
  switch (response.status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      errMessage = msg || '用户没有权限（令牌、用户名、密码错误）!'
      break
    case 403:
      errMessage = msg || '用户得到授权，但是访问是被禁止的。!'
      break
    // 404请求不存在
    case 404:
      errMessage = msg || '网络请求错误,未找到该资源!'
      break
    case 405:
      errMessage = msg || '网络请求错误,请求方法未允许!'
      break
    case 408:
      errMessage = msg || '网络请求超时!'
      break
    case 500:
      errMessage = msg || '服务器错误,请联系管理员!'
      break
    case 501:
      errMessage = msg || '网络未实现!'
      break
    case 502:
      errMessage = msg || '网络错误!'
      break
    case 503:
      errMessage = msg || '服务不可用，服务器暂时过载或维护!'
      break
    case 504:
      errMessage = msg || '网络超时!'
      break
    case 505:
      errMessage = msg || 'http版本不支持该请求!'
      break
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      console.log('弹出msg', errMessage)
      notification.error({
        message: '错误提示',
        description: errMessage,
      })
    } else if (errorMessageMode === 'message') {
      console.log('弹出msg', errMessage)
      notification.error({
        message: '错误提示',
        description: errMessage,
      })
    }
  }
}
