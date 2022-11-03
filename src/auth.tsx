import { Fragment } from 'react'
import { Redirect, useModel } from 'umi'
import { findPath } from './access'
import { notification } from 'antd'
import { getCurrentMenu } from './utils/storage/index'

// 点击按钮跳转页面，对应路由权限控制
export default (props: any) => {
  const { route, location } = props
  const { initialState } = useModel('@@initialState')
  const currentMenu = initialState?.currentMenu || getCurrentMenu()

  if (location.query.meta) {
    route.meta = location.query.meta
  }

  if (currentMenu) {
    const findRoute = findPath(currentMenu, route.meta.srcPath)
    if (findRoute?.elements) {
      const isAccess = findRoute.elements.find((el: any) => el.name === route.meta.elementName)
      if (isAccess) {
        return <Fragment>{props.children}</Fragment>
      }
    }
    notification.error({
      message: `权限错误`,
      description: '无页面访问权限',
    })
  }
  return <Redirect to={{ pathname: route.meta.srcPath, state: { from: props.location } }} />
}
