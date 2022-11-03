import Storage from 'good-storage'
export default class Auth {
  static token = 'token'
  static setToken(value: string) {
    Storage.set(this.token, value)
  }
  static getToken() {
    return Storage.get(this.token)
  }
}
