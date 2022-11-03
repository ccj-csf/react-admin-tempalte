/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/sso/**': {
      // 要代理的地址
      target: 'http://api.sit.gallops.cn',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
      cookieDomainRewrite: {
        '*': '',
      },
    },
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/guard/**': {
      // 要代理的地址
      target: 'http://api.sit.gallops.cn',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
      cookieDomainRewrite: {
        '*': '',
      },
    },
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/mtp-om/**': {
      // 要代理的地址
      target: 'http://api.sit.gallops.cn',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
      cookieDomainRewrite: {
        '*': '',
      },
    },
  },
  test: {
    '/ops/**': {
      target: 'http://api.sit.gallops.cn/guard',
      // target: 'http://localhost:8084',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/sso/**': {
      target: 'http://api.sit.gallops.cn/',
      // target: 'http://localhost:8084',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
}
