import type { AxiosRequestConfig } from 'axios'
import type { RequestOptions } from '#/axios'
import type { CreateAxiosOptions } from './axiosTransform'
import config from '@/config'
import { ContentTypeEnum } from '@/enums/httpEnum'
import { deepMerge } from '@/utils'
import { Axios } from './axios'
import { transform } from './transform'

const { urlPrefix, apiUrl } = config

const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new Axios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: 'Bearer',
        timeout: 10 * 1000,
        // 基础接口地址,添加在apiUrl前添加
        // baseURL: '',
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 消息提示类型
          successMessage: '',
          // 接口地址
          apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: false,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  )
}

type MergeConfig = AxiosRequestConfig & RequestOptions

class Request {
  private http = createAxios()
  public async get<T>(_config: MergeConfig, options?: any): Promise<T> {
    return this.http.get(_config, options)
  }
  public async post<T>(_config: MergeConfig, options?: any): Promise<T> {
    return this.http.post(_config, options)
  }
  public async delete<T>(_config: MergeConfig, options?: any): Promise<T> {
    return this.http.delete(_config, options)
  }
  public async put<T>(_config: MergeConfig, options?: any): Promise<T> {
    return this.http.put(_config, options)
  }
  public async patch<T>(_config: MergeConfig, options?: any): Promise<T> {
    return this.http.patch(_config, options)
  }
}

export default Request
