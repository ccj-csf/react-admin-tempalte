export default {
  APPID: 'GUARD',
  APP_NAME: '权限管理中心',
  //是否开启角色删除功能
  ROLE_DELETE_ENABLE: false,
  // 不更改默认为'/'
  APP_BASE_PATH: 'guard-admin',
  REDIRECT_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://sso.gallops.cn?redirectUrl='
      : 'http://test-sso.gallops.cn?redirectUrl=',
}
