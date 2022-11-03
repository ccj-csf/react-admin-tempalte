import * as React from 'react'

import ProTable from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import { proTable2SpringPage, springPage2ProTable, mergeObj } from './conversion'

interface ActionType {
  reload: () => void
  fetchMore: () => void
  reset: () => void
}

const GallopsTable = (props: any) => {
  const actionRef = React.useRef<ActionType>()
  const searchFormRef = React.useRef<FormInstance>()

  const [collapsed, setCollapsed] = React.useState(true)

  const handleSearchFieldValueChange = () => {
    searchFormRef.current?.submit()
  }

  const gallopsProps = () => {
    const _props = { ...props }
    delete _props.requestUrl
    return mergeObj(
      {
        // 表格title名称
        headerTitle: <span className="font-bold">信息列表</span>,
        // 工具栏配置
        options: {
          // 展示密度调整按钮
          density: false,
          // 展示全屏按钮
          fullScreen: false,
          // 刷新按钮
          reload: false,
          // 设置图标中的相关配置
          setting: false,
          // setting: {
          // 可拖拽
          // draggable: true,
          // 可选
          // checkable: true,
          // 重置
          // checkedReset: true,
          // },
          // 工具栏查询
          search: false,
          // search: { name: 'keywords', placeholder: '输入关键字查询' },
        },
        rowKey: 'id',
        formRef: searchFormRef,
        actionRef: actionRef,
        form: {
          onValuesChange: () => handleSearchFieldValueChange(),
        },
        // 选择配页大小后，重置不会重置分页大小
        pagination: {
          pageSize: 10,
        },
        debounceTime: 500,
        // 查询列表配置
        search: {
          // labelWidth:'number' | 'auto',标签的宽度,为0则无label
          labelWidth: 'auto',
          // 默认是否收起，true为收起
          defaultCollapsed: true,
          collapsed: collapsed,
          showHiddenNum: true,
          onCollapse: () => {
            setCollapsed(!collapsed)
          },
        },
      },
      // 支持所有的原生属性
      _props,
    )
  }

  React.useEffect(() => {
    const _props: any = { ...props }
    if (_props?.options?.search) {
      // @ts-ignore
      document.getElementsByClassName('ant-input-search')[0].style.width = '300px'
    }
  }, [])
  console.log(gallopsProps())

  // @ts-ignore
  return (
    <ProTable
      rowKey="id"
      request={async (params: any) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        const data = await props.requestUrl(proTable2SpringPage(params))
        return Promise.resolve(springPage2ProTable(data))
      }}
      {...gallopsProps()}
    />
  )
}

export { proTable2SpringPage, springPage2ProTable }

export default GallopsTable
