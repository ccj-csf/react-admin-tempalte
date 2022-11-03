import { notification } from 'antd'

import { checkStatus } from './checkStatus'

/**
 * @description: 响应错误处理
 */
export const responseInterceptorsCatch = (error: any) => {
  const { response, code, message, config } = error || {}
  const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
  const msg: string = response?.data?.message ?? ''
  const err: string = error?.toString?.() ?? ''
  let errMessage = ''
  try {
    if (code === 'ECONNABORTED' && !message.includes('timeout')) {
      errMessage = '接口请求超时,请刷新页面重试!'
      notification.error({
        message: '错误提示',
        description: errMessage,
      })
    }
    if (err?.includes('Network _error')) {
      errMessage = '网络异常，请检查您的网络连接是否正常!'
      notification.error({
        message: '错误提示',
        description: errMessage,
      })
    }
  } catch (_error) {
    throw new error(_error as unknown as string)
  }
  checkStatus(error?.response, msg, errorMessageMode)
  return Promise.reject(error)
}
