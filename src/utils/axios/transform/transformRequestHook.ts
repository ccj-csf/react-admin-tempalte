import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '#/axios'

/**
 * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
 */
export const transformRequestHook = (res: AxiosResponse<Result>, options: RequestOptions) => {
  const { isTransformResponse, isReturnNativeResponse } = options
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  if (isReturnNativeResponse) {
    return res
  }
  // 不进行任何处理，直接返回,用于页面代码可能需要直接获取code，data，message这些信息时开启
  if (!isTransformResponse) {
    return res.data
  }
  // 错误的时候返回
  if (!res.data) {
    // 返回'[http]请求没有返回值';
    throw new Error('请求出错，没有返回data')
  }
  // 这里 code，data，message为 后台统一的字段，需要在 Result修改为项目自己的接口返回格式
  const { code, data } = res.data
  // 这里逻辑可以根据项目进行修改
  if (data && code === 200) {
    return res.data
  }
  return res
}
