import type { AxiosTransform } from '../axiosTransform'
import { beforeRequestHook } from './beforeRequestHook'
import { requestInterceptors } from './requestInterceptors'
import { responseInterceptors } from './responseInterceptors'
import { transformRequestHook } from './transformRequestHook'
import { responseInterceptorsCatch } from './responseInterceptorsCatch'

/**
 * @description: 数据处理，方便区分多种处理方式,按照顺序执行
 */
export const transform: AxiosTransform = {
  /**
   * @description 请求之前处理config
   */
  beforeRequestHook,

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors,

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors,

  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook,

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch,
}
