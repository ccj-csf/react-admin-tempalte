import Request from '@/utils/axios'

class UserApi extends Request {
  public currentUser() {
    return this.get<any>({ url: '/guard/ops/users/current', params: { appId: APPID } })
  }
  public menus() {
    return this.get<any>({ url: `/guard/ops/users/menus`, params: { appId: APPID } })
  }
}

export default new UserApi()
