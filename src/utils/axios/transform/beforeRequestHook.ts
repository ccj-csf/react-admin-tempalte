import type { RequestOptions } from '#/axios'
import { RequestEnum } from '@/enums/httpEnum'
import { setObjToUrlParams } from '@/utils'
import { isString } from '@/utils/is'
import Config from '@/config'
import type { AxiosRequestConfig } from 'axios'
import { formatRequestDate, joinTimestamp } from './helper'
import { encryptData } from './encryption'
const { isEncrypt } = Config
/**
 * @description 请求之前处理config
 */
export const beforeRequestHook = (config: AxiosRequestConfig, options: RequestOptions) => {
  const _config = { ...config }
  const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

  if (joinPrefix) {
    _config.url = `${urlPrefix}${_config.url}`
  }

  if (apiUrl && isString(apiUrl)) {
    _config.url = `${apiUrl}${_config.url}`
  }
  const params = _config.params || {}
  const data = _config.data || {}
  if (formatDate && data && !isString(data)) formatRequestDate(data)
  if (_config.method?.toUpperCase() === RequestEnum.GET) {
    if (!isString(params)) {
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      _config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
    } else {
      // 兼容restful风格
      _config.url = _config.url + params + `${joinTimestamp(joinTime, true)}`
      _config.params = undefined
    }
  } else {
    if (!isString(params) && formatDate) {
      formatRequestDate(params)
      if (Reflect.has(_config, 'data') && _config.data && Object.keys(_config.data).length > 0) {
        _config.data = data
        _config.params = params
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        _config.data = params
        _config.params = undefined
      }
      if (joinParamsToUrl) {
        _config.url = setObjToUrlParams(
          _config.url as string,
          Object.assign({}, _config.params, _config.data),
        )
      }
    } else {
      // 兼容restful风格
      _config.url = _config.url + params
      _config.params = undefined
    }
  }
  // 加密数据
  if (isEncrypt) _config.data = encryptData(_config)
  return _config
}
