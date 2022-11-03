import type { Settings as LayoutSettings } from '@ant-design/pro-layout'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  primaryColor: '#00a8e5',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '腾晋物流股份有限公司',
  pwa: false,
  iconfontUrl: '',
  navTheme: 'light',
  headerTheme: 'light',
  layout: 'mix',
  headerHeight: 48,
  splitMenus: false,
}

export default Settings
