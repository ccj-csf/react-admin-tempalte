import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-layout'
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout'
import type { RunTimeLayoutConfig } from 'umi'
import { history, Link } from 'umi'
import 'windi.css'

import userApi from '@/api/user'
import logoPng from '@/assets/images/logo.png'
import Footer from '@/components/Footer'
import RightContent from '@/components/RightContent'
import defaultSettings from '../config/defaultSettings'
import { findPath } from './access'
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'
import SvgIcon from '@/components/Icon/SvgIcon'

const LOGIN_PATH = '/401'
const ONE_LEVEL_MENU = 2
const DEFAULT_ROUTE = '/'
const DEFAULT_REDIRECT_ROUTE = '/welcome'
let menusArray: any = []
// 构建路由
const recursionConvertMenu = (menus: API.Menu[]) => {
  if (!menus) {
    return []
  }
  return menus.map((menu) => {
    const item: MenuDataItem = {
      key: menu.id,
      path: menu.path ? menu.path : menu.id,
      name: menu.name,
      icon:
        menu.icon && icons[menu.icon] ? (
          <Icon component={icons[menu.icon]} />
        ) : (
          <SvgIcon icon={menu.icon} />
        ),
      elements: menu.elements,
      routes: recursionConvertMenu(menu.children),
    }
    return item
  })
}

const findPathInfo: any = (menu: any[], path: string) => {
  let element: any = []
  for (let i = 0; i < menu.length; i++) {
    const el = menu[i]
    if (el.path === path) {
      element.push(el)
    } else {
      if (el?.routes && el?.routes.length > 0) {
        const _element = findPathInfo(el.routes, path)
        if (_element) {
          element = [...element, ..._element]
        }
      }
    }
  }
  return element
}

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
}

const fetchUserInfo = async () => {
  try {
    const jSend = await userApi.currentUser()
    return jSend
  } catch (error) {
    history.push(LOGIN_PATH)
  }
  return undefined
}

export function render(oldRender: () => void) {
  userApi
    .menus()
    .then((res: any) => {
      menusArray = res.data
      oldRender()
    })
    .catch((err: any) => {
      console.log(err)
      history.push(LOGIN_PATH)
    })
}

export async function patchRoutes({ routes }: any) {
  let targetPath = findPathInfo(routes[0].routes, DEFAULT_ROUTE)
  targetPath = targetPath.find((el: any) => el.redirect)
  let result = false
  if (targetPath) {
    const _route = recursionConvertMenu(menusArray || [])
    result = findPath(_route, targetPath.redirect)
  }
  if (!result) {
    let redirect: any = menusArray
    while (redirect?.length > 0 && redirect[0]?.children?.length > 0) {
      redirect = redirect[0].children
    }
    redirect = redirect?.length > 0 ? redirect[0].path || {} : {}
    if (redirect) {
      routes[0].routes.unshift({ exact: true, path: DEFAULT_ROUTE, redirect: redirect })
    } else {
      routes[0].routes.unshift({
        exact: true,
        path: DEFAULT_ROUTE,
        redirect: DEFAULT_REDIRECT_ROUTE,
      })
    }
  }
}

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  loading?: boolean
  currentMenu?: object[]
}> {
  // 如果不是登录页面，执行
  // const currentUser = await fetchUserInfo()
  return {
    // currentUser,
    settings: defaultSettings,
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }: any) => {
  return {
    logo: logoPng,
    menuItemRender: (menuItemProps: any, defaultDom: any) => {
      return menuItemProps.locale.split('.').length === ONE_LEVEL_MENU ? (
        <Link to={menuItemProps.path ? menuItemProps.path : '#'}>{defaultDom}</Link>
      ) : (
        <Link to={menuItemProps.path ? menuItemProps.path : '#'} className="pl-8px">
          {defaultDom}
        </Link>
      )
    },
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    contentStyle: {
      marginLeft: 20,
    },
    footerRender: () => <Footer />,
    onPageChange: async () => {},
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[] } }) => {
      return (
        <>
          {children}
          {REACT_APP_ENV === 'dev' && !props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }))
              }}
            />
          )}
        </>
      )
    },
    menu: {
      request: async () => {
        const { data } = await fetchUserInfo()
        const _route = recursionConvertMenu(menusArray || [])
        setInitialState({ ...initialState, currentMenu: _route, currentUser: data })
        return _route
      },
    },
    ...initialState?.settings,
  }
}
