import Request from '@/utils/axios'

class AuthorityApi extends Request {
  // 添加菜单
  public addMenu(payload: any) {
    return this.post({ url: '/guard/ops/menus', data: payload }, { successMessage: '添加成功' })
  }
  // 修改菜单
  public updateMenu(id: any, payload: any) {
    return this.put(
      { url: `/guard/ops/menus/${id}`, data: payload },
      { successMessage: '修改成功' },
    )
  }
  // 删除菜单
  public deleteMenu(id: any) {
    return this.delete({ url: `/guard/ops/menus/${id}` }, { successMessage: '删除成功' })
  }
  // 查询菜单树
  public getMenuForest(params: any) {
    return this.get({ url: `/guard/ops/menus/forest`, params })
  }
  // 查询菜单详情
  public getMenuInfo(id: any) {
    return this.get({ url: `/guard/ops/menus/${id}` })
  }
  // 新建页面
  public addPage(payload: any) {
    return this.post({ url: '/guard/ops/pages', data: payload }, { successMessage: '添加成功' })
  }
  // 新建页面元素
  public addElement(id: any, payload: any) {
    return this.post(
      {
        url: `/guard/ops/pages/${id}/elements`,
        data: payload,
      },
      { successMessage: '添加元素成功' },
    )
  }
  // 修改页面
  public updatePage(id: any, payload: any) {
    return this.put(
      { url: `/guard/ops/pages/${id}`, data: payload },
      { successMessage: '修改成功' },
    )
  }
  // 修改页面元素
  public updateElement(id: any, elementId: any, payload: any) {
    return this.put(
      {
        url: `/guard/ops/pages/${id}/elements/${elementId}`,
        data: payload,
      },
      { successMessage: '修改元素成功' },
    )
  }
  // 删除页面
  public deletePage(id: any) {
    return this.delete({ url: `/guard/ops/pages/${id}` }, { successMessage: '删除成功' })
  }
  // 查询页面列表
  public getPageList(params: any) {
    return this.get({ url: `/guard/ops/pages`, params })
  }
  // 查询页面元素
  public getPageElements(id: any, params: any) {
    return this.get({ url: `/guard/ops/pages/${id}/elements`, data: params })
  }
  // 删除页面元素
  public deletePageElement(id: any, elementId: any) {
    return this.delete(
      {
        url: `/guard/ops/pages/${id}/elements/${elementId}`,
      },
      { successMessage: '删除元素成功' },
    )
  }
  // 查询页面详细信息
  public getPageInfo(id: any, params: any) {
    return this.get({ url: `/guard/ops/pages/${id}`, data: params })
  }
  // 新建角色
  public addRoles(payload: any) {
    return this.post({ url: '/guard/ops/roles', data: payload }, { successMessage: '新建成功' })
  }

  // 修改角色
  public updateRole(id: any, payload: any) {
    return this.put(
      { url: `/guard/ops/roles/${id}`, data: payload },
      { successMessage: '修改成功' },
    )
  }

  // 删除角色
  public deleteRole(id: any) {
    return this.delete({ url: `/guard/ops/roles/${id}` }, { successMessage: '删除成功' })
  }

  // 查询角色详细信息
  public getRolesDetails(id: any) {
    return this.get({ url: `/guard/ops/roles/${id}` })
  }

  // 查询角色列表
  public getRolesLists(params: any) {
    return this.get({ url: `/guard/ops/roles`, params })
  }

  // 角色授权
  public grantRoles(id: any, params: any) {
    return this.put(
      { url: `/guard/ops/roles/${id}/grant`, data: params },
      { successMessage: '授权成功' },
    )
  }
  public userLists(params: any) {
    return this.get<API.PageResponse<API.CurrentUser>>({ url: '/guard/ops/users', params })
  }

  public grant(loginName: string, data: Record<string, any>) {
    return this.post(
      {
        url: `/guard/ops/grant/${loginName}/roles`,
        data: { appId: APPID, roles: data },
      },
      { successMessage: '角色分配成功' },
    )
  }
  public getCurrentGrant(loginName: string) {
    return this.get({ url: `/guard/ops/grant/${loginName}/roles`, params: { appId: APPID } })
  }

  public currentUser() {
    return this.get<any>({ url: '/guard/ops/users/current', params: { appId: APPID } })
  }

  public getCurrentUserRoles() {
    return this.get<string[]>({ url: `/guard/ops/users/roles` })
  }

  public menus() {
    return this.get<any>({ url: `/guard/ops/users/menus`, params: { appId: APPID } })
  }

  public roles() {
    return this.get<API.Menu[]>({ url: `/guard/ops/users/roles` })
  }

  // 获取接入系统列表
  public logout() {
    return this.post({ url: '/sso/api/logout' })
  }
}
export default new AuthorityApi()
