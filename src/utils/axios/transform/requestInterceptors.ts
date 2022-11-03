import { consumeTicket } from '../ssoTicket'
import type { CreateAxiosOptions } from '../axiosTransform'

/**
 * @description: 请求拦截器处理
 */
export const requestInterceptors = (config: CreateAxiosOptions) => {
  config.url = config.url && consumeTicket(config.url)
  return config
}
