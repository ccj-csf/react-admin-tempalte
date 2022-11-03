const routes = [
  // {
  //   exact: true,
  //   name: '欢迎页',
  //   path: '/',
  //   redirect: '/welcome',
  // },
  {
    exact: true,
    name: '欢迎页',
    path: '/welcome',
    component: './welcome',
    access: 'verifyAccess',
  },
  {
    exact: true,
    name: '测试',
    path: '/test',
    component: './test',
  },
  {
    path: '/authority',
    name: '应用权限管理',
    icon: 'security-scan',
    routes: [
      {
        exact: true,
        path: '/authority',
        redirect: '/authority/page',
        access: 'verifyAccess',
      },
      {
        exact: true,
        path: '/authority/page/',
        name: '页面编辑',
        icon: 'file',
        component: './page',
        access: 'verifyAccess',
      },
      // 实例鉴权路由
      {
        exact: true,
        path: '/authority/detail',
        name: '页面详情',
        icon: 'file',
        meta: {
          // 说明详情页从哪个页面跳转而来，需要和源页面path相同
          srcPath: '/authority/page',
          elementName: 'page-query',
        },
        wrappers: ['@/auth'],
        component: './detail',
      },
      // 实例鉴权路由
      {
        exact: true,
        path: '/authority/detail/:id',
        name: '页面详情',
        icon: 'file',
        meta: {
          srcPath: '/authority/page',
          elementName: 'page-query',
        },
        wrappers: ['@/auth'],
        component: './detail',
      },
      {
        exact: true,
        path: '/authority/menu',
        name: '菜单管理',
        icon: 'bars',
        component: './menu',
        access: 'verifyAccess',
      },
      {
        exact: true,
        path: '/authority/roles',
        name: '角色授权',
        icon: 'user',
        component: './roles',
        access: 'verifyAccess',
      },
      {
        exact: true,
        path: '/authority/user',
        name: '用户管理',
        icon: 'user',
        component: './user',
        access: 'verifyAccess',
      },
    ],
  },
  {
    exact: true,
    path: '/401',
    layout: false,
    component: './401',
  },
  { component: './404' },
]
export default routes
