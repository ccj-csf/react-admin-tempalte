import CommonApi from './common'

class DemoApi extends CommonApi {
  getPetSuccess() {
    return this.get({ url: '/pet/3' })
  }
  getPetFail() {
    return this.get({ url: '/pet/1' })
  }
}

export default new DemoApi()
