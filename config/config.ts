import { defineConfig } from 'umi'
import defaultSettings from './defaultSettings'
import proxy from './proxy'
import define from './define'
import routes from './routes'
import windiCSSWebpackPlugin from 'windicss-webpack-plugin'

const { REACT_APP_ENV } = process.env
export default defineConfig({
  // hash: true,
  history: {
    type: 'hash',
  },
  base: '/',
  publicPath: `/${define.APP_BASE_PATH}/`,
  antd: {},
  dva: {
    hmr: true,
  },
  alias: {
    '#': '/types',
  },
  layout: {
    siderWidth: 208,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  define,
  routes,
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  // mfsu: {},
  // webpack5: {},
  exportStatic: {},
  chainWebpack(config: any) {
    config.plugin('windicss').use(windiCSSWebpackPlugin)
  },
})
