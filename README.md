# 中台系统基础框架

基于 ant design pro v5 + React + hooks 的开箱即用项目模版。

## 技术栈

- ant design pro
- React Hooks
- TypeScript
- ant design
- less
- umi
- AntV
- windicss

## 支持特性

- 💡 TypeScript: 应用程序级 JavaScript 的语言
- 📜 区块: 通过区块模板快速构建页面
- 💎 优雅美观：基于 Ant Design 体系精心设计
- 📐 umi-plugin-model 轻量级状态管理
- 🚀 最新技术栈：使用 React/umi/antd 等前端前沿技术开发
- 📱 windicss 框架加持，解放样式编写和管理
- 🎨 主题：可配置的主题满足多样化的品牌诉求
- ⚙️ 最佳实践：proComponents
- 👮 `eslint`+`stylelint`+`prettier`+`commitlint`+`editorConfig`
- 👩🏻 css module
- 📈 ahooks

### 包管理工具

- yarn
- 优势
  - 并行安装, 使用缓存, 安装速度快
  - 版本的冥等性 (即 lock file, npm 现在也有了)
  - 输出信息简洁
  - 从 npm 切到 yarn 简单学习即可: [快速入门](https://yarn.bootcss.com/)
  - 也推荐使用 tyarn，速度会更快 [快速入门](https://github.com/yiminghe/tyarn)

### 新手须知

- 项目整体基于 ant design pro v5 来进行搭建，有一定使用门槛，使用前请先仔细阅读以下文档，推荐按照以下顺序进行阅读
- umi3[使用文档](https://v3.umijs.org/zh-CN/docs/getting-started)
- ant design pro v5[使用文档](https://pro.ant.design/zh-CN/docs/introduction)
- windicss 原子化 css 框架， [使用文档](https://cn.windicss.org/guide/)
  - 如果你已经熟悉了 Tailwind CSS，可以把 Windi CSS 看作是按需供应的 Tailwind 替代方案
  - 建议使用 windicss 来编写 css，强烈推荐使用，相比 tailwind 支持更多有用的特性
- ahooks，[使用文档](https://ahooks.js.org/zh-CN),推荐使用
- ant design pro [使用文档](https://ant.design/index-cn)
- ant design charts [使用文档](https://charts.ant.design/zh/)
  - 业务已经集成了该依赖，如果有图表可视化方面的要求，请基于此包进行开发
  - 如果没有要求，可暂时跳过该文档
- ProComponents 是基于 Ant Design 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。[使用文档](https://procomponents.ant.design/)
  - 是否使用该组件，取决于使用者，需要使用可阅读此文档，不需要使用可跳过
  - 建议 table 场景可以考虑使用，在 src/pages/table-list 有对应的使用
  - 建议 table 场景可以考虑使用，在 src/pages/table-list 有对应的使用

### 基本框架结构说明

```bash
├── .husky                     # husky 配置文件
├── .vscode                    # vscode 配置文件
├── config                     # umi 配置，包含路由，构建等配置
├── src                        # 源码: 业务代码主要集中在此目录
│   ├── api                    # api 封装
│   ├── assets                 # 静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 全局公用配置
│   ├── constants              # 常量文件管理
│   ├── e2e                    # 集成测试用例
│   ├── hooks                  # 全局composition管理
│   ├── layouts                # 布局组件
│   ├── models                 # store状态管理
│   ├── pages                  # 页面路由文件
│   ├── styles                 # 样式管理
│   ├── access.ts              # 权限定义文件
│   ├── app.tsx                # 项目入口文件
│   ├── global.less            # 全局样式入口文件
│   ├── global.tsx             # 全局JS
├── tests                      # 测试工具
├── types                      # ts类型文件
├── .cz-config.js              # cz-config配置文件
├── .eslintignore              # eslint 检验忽略文件
├── .eslintrc.js               # eslint 配置项
├── .gitignore                 # git 忽略文件配置项
├── .prettierignore            # prettier忽略文件
├── .babel.config.js           # babel配置
├── commitlint.config.js       # commit 提交配置
├── jest.config.js             # jest配置
├── jsconfig.json              # jsconfig配置文件
├── package-lock.json          # npm锁定安装时的包的版本号，gitignore中忽略提交的
├── project.config.json        # 小程序配置文件
├── package.json               # npm包管理
├── tsconfig                   # ts配置文件
├── README.md                  # 说明文档
├── stylelint.config.js        # stylelint配置文档
├── windi.config.js            # windi 配置文件
├── tsconfig.json              # ts 配置文件
├── yarn.lock                  # yarn锁定安装时的包的版本号，gitignore中忽略提交的
```

### 目录补充说明

- config

  - config.dev.ts 开发环境配置
  - config.uat.js 测试环境配置
  - config.prod.js 生产环境配置
  - config.ts 默认配置
  - defaultSettings.ts layout 配置
  - proxy 代理配置
  - routes 路由配置

- src 目录

  - 业务相关的代码主要集中在 src 目录下

  - api: 请求封装，后面会详细讲解

  - assets: 静态资源放在该目录下，管理 images 和 icons - images 管理图片资源，图片命名采用模块+图片名的方式,eg:tabbar-home.png,tabbar-home-selected.png - 公用图片不用加模块前缀，一般来说模块名为路由对应页面的路径 - 采用中划线进行连接 - 不再划分二级文件 - 通过 index.ts 做统一导入导出管理 - icons 下存在的是 iconfont 上的图标 - 原则上不需要在下面存放任何图标 - 如果菜单上满足不了可以从 iconfont 账户添加，[使用方法](https://pro.ant.design/zh-CN/docs/new-page#%E5%9C%A8%E8%8F%9C%E5%8D%95%E4%B8%AD%E4%BD%BF%E7%94%A8-iconfont) <<<<<<< HEAD

- components: 全局公用组件

=======

- components: 全局公用组件

> > > > > > > 19b6cb9f99e38543d3e719210ff9d80e0cc82ed5

- 文件名和组件名必填且使用 Pascal 命名且保持一致，业务直接中需要使用自行导入
- 组件命名，傻瓜组件以 Base 开头命名，带业务的逻辑组件以 Sp 开头，eg：BaseTable、BaseSvgIcon、TjSelectCity(ps:TJ 腾晋简写)
- 全局组件多个业务用到才可提取到当前文件下进行管理，不然请就近维护
- 详细目录结构参照 components 下 BaseLine 组件的结构，不需要的文件可删除，比如样式文件和 components 文件

- config: 配置文件管理

  - index.ts 全局配置文件
  - 你认为可以抽离成配置的文件的都可以抽到当前文件夹下维护

- constants:常量文件

  - index.ts 目前只维护一个 index 文件，有需要再增加其他类型常量文件

- hooks

  - 逻辑复用采用 hooks 方式，不推荐使用类组件的形式
  - 文件名以 use 开头，比如 useLoadMore，文件命名已 use 开头，eg：useTable、useConfirm
  - 项目引入引入了 ahooks，自定义 hooks 前请先查看有没有封装好的 hook，具体使用方式请查看[文档](https://ahooks.js.org/zh-CN/)

- pages: 主要的页面放置在其中, 根目录下不能有任何组件文件, 所有的页面都需要以文件夹的形式组织

  - 顶部文件夹以一级菜单为单位命名文件夹方便查找和定位
  - 文件内 index.ts 作为入口文件
  - 文件名采用中划线连接，eg：order-detail
  - 导出函数组件采用大驼峰命名
  - 需要组件拆分的场景，新建 components 文件管理当前模块组件，组件名 Pascal 命名
  - 多模块复用组件请考虑抽离到全局 components 文件下
  - index.less 为页面组件样式，推荐使用 windi 来解决样式问题，要使用样式文件，可不通过 css module 形式使用
  - helper 为当前页面帮助函数、hooks 集合
  - data.d.ts 为当前页面 ts 类型定义文件，一般情况不需要增加此文件

  - 分模块
    - 示列 demo 为 src/pages/demo 目录展示了列表、新增、编辑、详情的示列
    - 注意 demo 中通过 path 的分分级来处理面包屑层级的问题
    - 按照层级结构来说，新增、编辑、详情是对列表的操作，应该在列表文件下进行维护，但是考虑到目录结构过深的问题，平级展示
    - 新增、编辑、详情操作如果不是特殊页面，建议通过弹窗形式来处理，不增加新的路由，需要配合动态路由权限的问题考虑，具体需要和产品确认
    - 路由具体配置文档参照[umi 文档]对于路由的定义

```ts
const routes = [
  {
    path: '/demo',
    name: '路由demo',
    icon: 'crown',
    routes: [
      {
        path: '/demo',
        redirect: '/demo/demo1-list',
      },
      {
        path: '/demo/demo1-list',
        name: 'demo列表',
        icon: 'smile',
        component: './demo/demo-1/list',
      },
      {
        path: '/demo/demo1-list/add',
        name: 'demo新增',
        hideInMenu: true,
        icon: 'smile',
        component: './demo/demo-1/add',
      },
      {
        path: '/demo/demo1-list/edit',
        name: 'demo编辑',
        hideInMenu: true,
        icon: 'smile',
        component: './demo/demo-1/edit',
      },
      {
        path: '/demo/demo1-list/detail',
        name: 'demo详情',
        hideInMenu: true,
        icon: 'smile',
        component: './demo/demo-1/detail',
      },
    ],
  },
  { component: './404' },
]
export default routes
```

- styles: 样式管理

  - mixins.less mixin 管理，eg：样式溢出
  - util.less 工具类，项目已经集成 windi，建议不在里面添加，除非 windi 满足不了
  - variables.less，样式变量管理
  - global.less 中导入，然后在 pages 中任何页面都可以使用
  - 基本上你使用 windi，不太会需要自己再去单独去写样式
  - windicss
    - [文档](https://cn.windicss.org/guide/)
    - 需要扩展配置在 windi.config.ts 中进行扩展

- models: @umijs/plugin-model 插件实现

  - 安装 vscode @umijs/plugin-model 插件可以获得更好的开发体验
  - 在 src/models 目录下新建文件，文件名会成为 model 的 namespace. 允许使用 ts, js, tsx(不推荐), jsx(不推荐) 四种后缀
  - 插件使用文档，[文档地址](https://umijs.org/zh-CN/plugins/plugin-model)
  - 中后台场景下，绝大多数页面的数据流转都是在当前页完成，在页面挂载的时候请求后端接口获取并消费，不推荐使用数据流方案
  - 多页面共享的场景可以考虑使用该方案处理

- utils: 公用工具函数等
  - 文件名以小驼峰命名，eg：setTitle
  - ant design pro 默认集成 lodash，使用到对应的工具可以基于 lodash 进行二次封装，避免直接使用，后续更换更方便，至于为什么不使用 lodash-es，是因为 antV 图表插件对 lodash 有依赖，不确认换成 lodash-es 会不会有影响
  - 工具类通过类的形式来组织，参照 auth.ts
  - auth token 以及用户操作相关操作
  - http 封装，复杂的工具类可以参照 http 通过文件夹的形式组织
  - validate 校验、正则工具
  - ant design pro 默认安装了 moment，antV 图表插件对 moment 有依赖，暂不考虑更换成 day.js

### Api 层设计

- 封装 api
- 通过类的形式调用，也可以避免命名空间冲突的问题
- 隔离 api 实现 (ajax, axios, fetch), 换实现时, 只需修改 Api 相关文件的部分实现, 不会影响到业务层，注意类名须以 Api 结尾
- 通过类的形式调用，也可以避免命名空间冲突的问题
- http 模块对 umi-request 进行了二次封装，增加拦截器功能等功能

- CommonApi 基类,可在此类中做公用数据处理

```ts
import CommonApi from './common'

class UserApi extends CommonApi {
  login(data: API.LoginParams) {
    return this.post<API.LoginResult>('/api/login/account', {
      data,
      prefix: '',
    })
  }
  currentUser() {
    return this.get<API.CurrentUser>('/api/currentUser', {
      prefix: '',
    })
  }
  outLogin() {
    return this.post('/api/login/outLogin', {
      prefix: '',
    })
  }
}

export default new UserApi()

// 使用
import userApi from '@/api/user'

useEffect(() => {
  userApi
    .login()()
    .then((res) => {
      console.log('res :>> ', res)
    })
    .catch((err) => {
      console.log('err :>> ', err)
    })
}, [])
```

### TypeScript

- types

  - api.d.ts 全局 api 层入参回返回数据定义文件
  - global.d.ts 通用 ts 定义
  - models.d.ts 管理 models 文件下类型
  - module.d.管理 module
  - 定义文件不能满足的请自行扩展文件进行管理

- TypeScript 的好处已经无须赘述，无论是开发成本还是维护成本都能大大减少，TypeScript 的最佳实践。

- 什么时候推荐用 type 什么时候用 interface ？

  - 推荐任何时候都是用 type， type 使用起来更像一个变量，与 interface 相比，type 的特点如下：
  - 表达功能更强大，不局限于 object/class/function 要扩展已有 type 需要创建新 type，不可以重名支持更复杂的类型操作
  - 基本上所有用 interface 表达的类型都有其等价的 type 表达。

- 定义接口数据
  - 任何一个项目都离不开对数据和接口的处理，拼接数据和接口是形成业务逻辑也是前端的主要工作之一，将接口返回的数据定义 TypeScript 类型可以减少很多维护成本和查询 api 的时间。
  - 推荐在 src/api/API.d.ts 中定义接口数据的类型，以用户基本信息为例：

```ts
declare namespace API {
  // 用户基本信息
  export type CurrentUser = {
    avatar?: string
    name?: string
    title?: string
    group?: string
    signature?: string
    tags?: {
      key: string
      label: string
    }[]
    userid?: string
    roles?: 'user' | 'guest' | 'admin'
  }
}
```

- 推荐 json2ts 等网站来自动转化。

- 在使用时我们就可以很简单的来使用, d.ts 结尾的文件会被 TypeScript 默认导入到全局，但是其中不能使用 import 语法，如果需要引用需要使用三斜杠。

```tsx
export async function query() {
  return request<API.CurrentUser[]>('/api/users')
}

// props
export type UserProps = {
  userInfo: API.CurrentUser
}
```

- 为 Window 增加参数
  - 前端开发很大程度上就是与 Window 打交道，有时候我们不得不给 Window 增加参数，例如各种统计的代码。在 TypeScript 中提供一个方式来增加参数。在 global.d.ts 中做如下定义：

```ts
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
```

- 如果不想在 Window 中增加，但是想要全局使用，比如通过 define 注入的参数，我们通过 declare 关键字在 global.d.ts 注入。

```ts
declare const REACT_APP_ENV: 'uat' | 'dev' | 'pre' | false
```

- 动态增加
  - 有时候我需要对一个 Object 的 key 进行动态的更新，为了方便我们可以对 key 设置为 any，这样就可以使用任何 key，多余 JSON.parse

```ts
type Person = {
  name: string
  age?: number
  [key: string]: any
}
```

- 值可以为 null 或 undefined

  - 在 3.8 中已经很简单了，obj?.xxx 即可。

- 某个库不存在 typescript 的定义
  - 我们可以直接将其定义为 any。

```ts
declare module 'xxx'

import xxx from 'xxx'
```

- @ts-ignore
  - 有些时候类型错误是组件的，但是看起来非常难受。会一直编译报报错，这里就可以使用 @ts-ignore 来暂时忽略它。尽量不要这样使用

### 命名规范

- src 下文件
  - 文件夹命名统一采用-连接，eg:pruduct-manager
  - config 配置下文件采用小驼峰命名
  - assets/images 图片采用-连接,eg:home-bg
  - components 下文件夹名和组件采用 Pascal 命名
  - hooks 下采用.连接，导出方法名使用小驼峰,查看 hook 下示列
  - styles 下文件采用小驼峰命名
  - constants 文件采用小驼峰命名，具体文件中命名规范查看示列
  - layouts 命名保持为 pages 下一致
  - models 下文件采用小驼峰命名
  - pages 下文件后续会详细说明
  - utils 下文件采用小驼峰命名
  - ts、tsx 文件中变量和方法采用小驼峰
  - 类首字母大写
  - 样式文件变量定义采用小驼峰
  - 样式命名采用-连接

### UI 组件库

- 项目已引入\*\*`ant design`最新版本组件 4.19.5
- 主题定制可简单修改 config/defaultSettings 中 primaryColor 来实现，不建议做其他的修改，方便后续更 ant design 同步升级
- ant design[使用文档](https://ant.design/docs/react/introduce-cn)
- 整体 ui 规范遵循 ant design 视觉规范，建议阅读，参考[文档](https://ant.design/docs/spec/introduce-cn)

#### 组件通信

- 原则上能不使用 useModel 的场景通过组件之间的通信方式即可
- 根据业务流程情况，利用 useModel 和前端存储做好页面缓存
- useModel 建议是用来处理一些公用数据的场景，比如用户信息之类的

### 异步操作

- 尽可能使用 async + await 处理
- async + await 可读性更强+异常捕捉更好

### 前端储存

- 使用 api 尽量封装后再使用
- 不要直接裸用
- 对于 cookie 的操作使用`js-cookie`，请基于此库进行二次封装使用,[文档](https://github.com/js-cookie/js-cookie)
- storage 的操作使用`good-storage`，请基于此库进行二次封装使用,[文档](https://github.com/ustbhuangyi/storage#readme)

### 添加一个新功能示例

- 首先在 pages 中添加新页面的路由配置
- 在 api 中新建新页面需要操作数据的 api
- 将 config/routes.ts 中配置路由

### 代码提交

项目集成了`git hooks`校验，提交报错时请按照提示进行修改后尝试

### 统一使用 commitizen 工具提交

- 项目配置了规则，根据提示操作即可 描述部分尽量言简意赅，避免随意或无意义的 msg
- 强制使用 npm run commit 生成提交信息
- commit 之前请先自己 review 一下代码，减少错误

```bash
git add ./**.js
# or
git add .

npm run commit
# or
yarn commit

```

### git commit message 说明

- feat: 新功能
- fix: bug 修复
- docs: 仅修改文档
- style: 修改格式（空格，格式化，省略分号等），对代码运行没有影响
- refactor: 重构（既不是修 bug ，也不是加功能）
- build: 构建流程、外部依赖变更，比如升级 npm 包、修改 webpack 配置等
- perf: 性能优化
- test: 测试相关
- chore: 对构建过程或辅助工具和库（如文档生成）的更改
- ci: ci 相关的更改
- revert:revert 回滚 commit
- wip:pr 的提交
- mod:不确定分类的修改
- workflow:工作流改进
- merge:分支合并
- types 类型文件

### 分支管理

- develop 为开发分支，master 为测试分支，pro_date 为预发布分支，prod_date 为正式环境分支，原则上这些分支只能通过合并的方式就行提交，不允许上述分支上直接修改提交
- 功能分支请从 develop 份上检出一份进行开发，命名为 feature*`姓名`*`分支创建时`，eg：feature_ccj_11-05,也可以根据特定功能进行命名，比如 feature/http
- 测试环境修复分支从 master 环境新建 bugfix 进行修复，修复完成后合并到 master 分支，名为为 bugfix*姓名*分支创建时间，eg：bugfix_ccj_11-11，预发布问题从测试环境修复和，直接从 master 提交 pr 合并到 prod_date 分支即可，因为 bug 可能需要修改多个，建议使用此命名命名分支
- 生产环境问题修复，从 prod_date 分支新建 hotfix 分支进行修复，修复完成后先合并到 master 让 qa 回归后再，qa 验证没问题后，再从 master 合并到 prod_prod 分支，命名跟测试环境 bug 分支一样，前缀换成 hotfix,修复完成后再从 prod_date 合并到 develop
- bug 修复和功能分支属于临时分支，开发修复完成及时删除
- prod_date 属于生产的临时分支，后续会通过脚本来定期来进行清理

### ESLint

- 不管是多人合作还是个人项目，代码规范都是很重要的。这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。
- 项目已经集成 eslint 校验，不通过本地运行会报错，并且不能提交到远程仓库
- vscode 和 eslint 自动格式化代码，[具体配置参照文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/eslint.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)
- 所有的配置文件都在 .eslintrc.js 中。 本项目基本规范是依托于 ant design pro 官方的 eslint 规则做了少许的修改，后续会持续根据使用情况进行配置

### 其他

- eslint 用于校验代码格式规范
- commitlint 用于校验 git 提交信息规范
- stylelint 用于校验 css/less 规范 -prettier 代码格式化
- 编辑器体检 使用 vscode
- 如有需要增加的类库讨论后再做新增
- 其他: 使用第三方库或者组件等的时候, 不要裸用或者裸继承. 最好自己封装一层
- 因为:没法进行一些通用处理
- 如果使用的库出现问题, 只能到处去修改
- 尽量避免使用硬编码(在代码中直接裸写一些后面可能会变化的值, 且在到处使用)

- 如 `if ( code === 1 )`

  `if ( code === ResTypes.SUCCESS )`

### 如何运行项目

- 安装依赖

  ```bash
  tyarn
  ```

  运行开发模式(编译并支持修改热加载)

  ```bash
  npm run start
  ```

  测试环境打包

  ```bash
  npm run build:uat
  ```

  生产模式打包

  ```bash
   npm run build:prod
  ```

  打包分析

  ```bash
   npm run analyze
  ```
