import Request from '@/utils/axios'

class CommonApi extends Request {
  /**
   * @description: 返回数据过了处理
   */
  addName<T>(data: T): T {
    return data
  }
}

export default CommonApi
