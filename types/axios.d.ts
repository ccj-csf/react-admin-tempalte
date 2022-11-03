export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
/**
 * @description 配置项，选项都可以在独立的接口请求中覆盖
 */
export type RequestOptions = {
  // 拼接params到url上
  joinParamsToUrl?: boolean
  // 格式化日期
  formatDate?: boolean
  // 是否需要对返回数据进行处理
  isTransformResponse?: boolean
  // 返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean
  // prefix 添加到url
  joinPrefix?: boolean
  // api基础路径
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 消息提示类型
  errorMessageMode?: ErrorMessageMode
  //成功提示信息
  successMessage?: string
  // url上添加时间戳
  joinTime?: boolean
  // 忽略重复请求
  ignoreCancelToken?: boolean
  // 请求头中是否携带token
  withToken?: boolean
}

/**
 * @description 请求响应
 */
export type Result<T = any> = {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result?: T
  data?: T
}

/**
 * @description 上传接口描述
 */
export type UploadFileParams = {
  data?: Recordable
  // 文件参数接口字段名称
  name?: string
  // file type
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
