/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

export const findPath: any = (menu: any[], path: string) => {
  let element = null
  for (let i = 0; i < menu.length; i++) {
    const el = menu[i]
    if (el.path === path) {
      element = el
      break
    } else {
      if (el?.routes && el?.routes.length > 0) {
        element = findPath(el.routes, path)
        if (element) {
          break
        }
      }
    }
  }
  return element
}

export const findAuth = (routes: any, meta?: { srcPath: string; elementName: string }): any => {
  // debugger
  let resAuth = []
  for (let i = 0; i < routes.length; i++) {
    const element = routes[i]
    const path = element.path
    let pathname = ''
    // hash模式
    if (meta) {
      pathname = meta.srcPath
    } else if (window.location.href.includes('#')) {
      pathname = window.location.hash.split('#')[1]
    } else {
      pathname =
        APP_BASE_PATH === ''
          ? window.location.pathname
          : window.location.pathname.split(APP_BASE_PATH)[1]
    }
    let result = false
    // 单独处理动态路由
    if (path.includes(':')) {
      result = pathname.includes(path.split(':')[0])
    } else {
      if (path === pathname) {
        result = true
      }
    }
    if (result) {
      if (element.elements) {
        resAuth = element.elements
        break
      }
    } else {
      if (element?.routes.length > 0) {
        resAuth = meta ? findAuth(element.routes, meta) : findAuth(element.routes)
        if (resAuth.length > 0) {
          break
        }
      }
    }
  }
  return resAuth
}

export default function access(initialState: any) {
  const { currentMenu = [] } = initialState ?? { currentMenu: [] }
  return {
    // 菜单权限
    verifyAccess: (auth: { path: string; [key: string]: any }) => {
      return findPath(currentMenu ?? [], auth.path)
    },
    // 按钮权限
    verifyPermission: (auth: string, meta?: { srcPath: string; elementName: string }) => {
      return findAuth(currentMenu, meta).find((el: any) => el.name === auth)
    },
  }
}
