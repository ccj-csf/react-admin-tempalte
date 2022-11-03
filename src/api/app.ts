import Request from '@/utils/axios'

class AppApi extends Request {
  // 获取接入系统列表
  public querySsoApps() {
    return this.get({ url: '/sso/apps' })
  }
}
export default new AppApi()
