import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Empty, Form, Input, Modal, Popconfirm, Select, Table, Tooltip } from 'antd'
import * as React from 'react'
import { useAccess, Access } from 'umi'
import type { ColumnsType } from 'antd/es/table'

import authorityApi from '@/api/authority'

const { Option } = Select
const { Search } = Input
type ElementListType = {
  id: string
  method: string
  name: string
  pageId: string
  readableName: string
  url: string
}
type PageListType = {
  appId: string
  appName: string
  elements: ElementListType[]
  id: string
  name: string
  path: string
  target: string
}
const Page = () => {
  const [name, setName] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [visibleElement, setVisibleElement] = React.useState(false)
  const [defaultFormValue, setDefaultFormValue] = React.useState<ElementListType | null>()
  const [pageListData, setPageListData] = React.useState([])
  const [pageTotal, setPageTotal] = React.useState(0)
  const [pageCurrent, setPageCurrent] = React.useState(1)
  const [currentPage, setCurrentPage] = React.useState<ElementListType>()

  const formRef: any = React.createRef()
  const access = useAccess()
  // 查询页面列表
  const searchPageList = (info: { name?: any; appId: string; size: number; page: number }) => {
    authorityApi
      .getPageList(info)
      .then((res: any) => {
        setPageTotal(res.data.totalElements)
        setPageListData(res.data.content || [])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 删除页面元素
  const deletePageElement = (id: string, elementId: string) => {
    authorityApi
      .deletePageElement(id, elementId)
      .then(() => {
        searchPageList({
          appId: APPID,
          size: 10,
          page: pageCurrent - 1,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const confirmElement = (e: ElementListType) => {
    console.log('e........', e)
    deletePageElement(e.pageId, e.id)
  }
  // 删除页面
  const deletePage = (id: string) => {
    authorityApi
      .deletePage(id)
      .then(() => {
        searchPageList({
          appId: APPID,
          size: 10,
          page: pageCurrent - 1,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const confirm = (e: { id: string }) => {
    deletePage(e.id)
  }

  // 修改页面
  const updatePage = (id: string, info: any) => {
    authorityApi
      .updatePage(id, info)
      .then(() => {
        searchPageList({
          name: name,
          appId: APPID,
          size: 10,
          page: pageCurrent - 1,
        })
        setVisible(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 新建页面
  const addPage = (info: any) => {
    authorityApi
      .addPage(info)
      .then(() => {
        searchPageList({ appId: APPID, size: 10, page: 0 })
        setVisible(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 新建元素
  const addElement = (id: string | undefined, info: any) => {
    authorityApi
      .addElement(id, info)
      .then(() => {
        searchPageList({ appId: APPID, size: 10, page: pageCurrent - 1 })
        setVisibleElement(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 更新元素
  const updateElement = (
    id: string | undefined,
    elementId: string | undefined,
    info: any | undefined,
  ) => {
    authorityApi
      .updateElement(id, elementId, info)
      .then(() => {
        searchPageList({
          name: name,
          appId: APPID,
          size: 10,
          page: pageCurrent - 1,
        })
        setVisibleElement(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const cancel = () => {}

  const handleOk = (defaultValue: ElementListType | null | undefined) => {
    // 校验参数，通过则继续
    formRef.current
      .validateFields()
      .then((values: any) => {
        if (defaultValue) {
          updatePage(defaultValue.id, values)
        } else {
          addPage({ ...values, appId: APPID })
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const handleCancel = () => {
    setVisible(false)
    setVisibleElement(false)
    // 重置参数
    formRef.current.resetFields()
  }

  const handleElementOk = (defaultValue: ElementListType | null | undefined) => {
    // 校验参数，通过则继续
    formRef.current
      .validateFields()
      .then((values: any) => {
        if (defaultValue) {
          updateElement(currentPage?.pageId, defaultValue?.id, values)
        } else {
          addElement(currentPage?.id, { ...values })
        }
        setVisible(false)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const handleElementCancel = () => {
    setVisible(false)
    setVisibleElement(false)
    // 重置参数
    formRef.current.resetFields()
  }

  /**
   * 处理修改新建操作函数
   * @param {*} text 当前单元格的值
   * @param {*} record 当前行的值
   * @param {*} index 当前行index索引
   */
  const operatePage = (text: any, record: ElementListType) => {
    console.log(text)
    setVisible(true)
    setDefaultFormValue(record)
  }

  const operateElement = (record: ElementListType) => {
    setVisibleElement(true)
    setDefaultFormValue(record)
    setCurrentPage(record)
  }

  const newPage = () => {
    setVisible(true)
    setDefaultFormValue(null)
  }

  const newElement = (el: any) => {
    setVisibleElement(true)
    setDefaultFormValue(null)
    setCurrentPage(el)
  }

  React.useEffect(() => {
    searchPageList({ appId: APPID, size: 10, page: 0 })
  }, [])

  const onSearch = (value: string) => {
    setName(value)
    searchPageList({ name: value, appId: APPID, size: 10, page: 0 })
  }
  const PageOperation = ({ text, record }: any) => {
    // 权限处理
    return (
      <span className="table-operation">
        <Access accessible={access.verifyPermission('element-create')}>
          <Tooltip title="添加页面元素">
            <Button type="link" onClick={() => newElement(record)} icon={<PlusOutlined />} />
          </Tooltip>
        </Access>
        <Access accessible={access.verifyPermission('page-update')}>
          <Button
            type="link"
            onClick={() => operatePage(text, record)}
            icon={<EditOutlined />}
            style={{ marginLeft: '10px', border: 0 }}
          />
        </Access>
        <Access accessible={access.verifyPermission('page-delete')}>
          <Popconfirm
            title="确定删除当前数据?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              style={{ marginLeft: '10px', color: '#FF4D4F', border: 0 }}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Access>
      </span>
    )
  }
  // page操作栏
  const columns: ColumnsType<PageListType> = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    { title: '路径', dataIndex: 'path', key: 'path' },
    { title: '打开方式', dataIndex: 'target', key: 'target' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: 160,
      render: (text: any, record: PageListType, index: number) => {
        return <PageOperation text={text} record={record} index={index} />
      },
    },
  ]
  const ElementOperation = ({ record }: { record: ElementListType }) => {
    // 权限处理
    return (
      <span className="table-operation">
        <Access accessible={access.verifyPermission('element-update')}>
          <Button
            type="link"
            onClick={() => operateElement(record)}
            icon={<EditOutlined />}
            style={{ border: 0 }}
          />
        </Access>
        <Access accessible={access.verifyPermission('element-delete')}>
          <Popconfirm
            title="确定删除当前数据?"
            onConfirm={() => confirmElement(record)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              style={{ marginLeft: '10px', color: '#FF4D4F', border: 0 }}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Access>
      </span>
    )
  }

  const columnsExpanded: ColumnsType<ElementListType> = [
    { title: '元素标识', dataIndex: 'name', key: 'name' },
    { title: '元素名称', dataIndex: 'readableName', key: 'readableName' },
    { title: '接口', dataIndex: 'url', key: 'url' },
    { title: '请求方式', dataIndex: 'method', key: 'method' },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: 120,
      render: (text: any, record: ElementListType) => <ElementOperation record={record} />,
    },
  ]
  const expandedRowRender = (record: PageListType) => {
    const data = []
    for (let i = 0; i < record.elements.length; ++i) {
      data.push({
        pageId: record.id,
        id: record.elements[i].id,
        name: record.elements[i].name,
        readableName: record.elements[i].readableName,
        url: record.elements[i].url || '/',
        method: record.elements[i].method || 'get',
      })
    }
    return data.length > 0 ? (
      <Table rowKey="name" columns={columnsExpanded} dataSource={data} pagination={false} />
    ) : (
      <Empty description="无页面元素" />
    )
  }

  // 新建
  const CreateBtn = () => {
    // 权限处理
    return (
      <>
        <Access accessible={access.verifyPermission('page-create')}>
          <Button type="primary" onClick={() => newPage()} icon={<PlusOutlined />}>
            新建
          </Button>
        </Access>
      </>
    )
  }

  return (
    <PageContainer title="页面编辑">
      <div className="flex bg-[#ffffff]">
        <div className="w-full h-full p-20px">
          <h1 className="flex justify-between text-16px font-bold">
            页面编辑
            <div className="flex">
              <Search
                maxLength={40}
                placeholder="输入页面名称"
                onSearch={(val) => onSearch(val)}
                className="w-full mr-20px"
              />
              <CreateBtn />
            </div>
          </h1>
          <div>
            <Table
              expandedRowRender={(record) => expandedRowRender(record)}
              dataSource={pageListData}
              columns={columns}
              rowKey="id"
              pagination={{
                // 每页条数
                total: pageTotal,
                pageSize: 10,
                current: pageCurrent,
                showTotal: (total, range) =>
                  `共 ${pageTotal} 条，当前第 ${range[0]}-${range[1]} 条`,
                onChange: (page, pageSize) => {
                  // 请求数据
                  setPageCurrent(page)
                  searchPageList({
                    appId: APPID,
                    size: pageSize,
                    page: page - 1,
                  })
                },
              }}
            />
          </div>
        </div>
      </div>
      {visible && (
        <Modal
          title={defaultFormValue ? '修改页面' : '新建页面'}
          visible={visible}
          onOk={() => handleOk(defaultFormValue)}
          onCancel={() => handleCancel()}
        >
          <Form
            ref={formRef}
            labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
            initialValues={defaultFormValue || {}}
          >
            <Form.Item
              label="页面名称"
              name="name"
              rules={[{ required: true, message: '请输入页面名称' }]}
            >
              <Input placeholder="请输入页面名称" />
            </Form.Item>
            <Form.Item
              label="页面路径"
              name="path"
              rules={[{ required: true, message: '请输入页面路径' }]}
            >
              <Input placeholder="请输入页面路径" />
            </Form.Item>
            <Form.Item
              label="打开方式"
              name="target"
              rules={[{ required: false, message: '请选择打开方式' }]}
            >
              <Select placeholder="请选择打开方式" onChange={() => {}} allowClear>
                <Option value="_self">_self</Option>
                <Option value="_blank">_blank</Option>
                <Option value="_parent">_parent</Option>
                <Option value="_top">_top</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {/* 页面元素编辑 */}
      {visibleElement && (
        <Modal
          title={defaultFormValue ? '修改元素' : '添加元素'}
          visible={visibleElement}
          onOk={() => handleElementOk(defaultFormValue)}
          onCancel={() => handleElementCancel()}
        >
          <Form
            ref={formRef}
            labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
            initialValues={defaultFormValue || {}}
          >
            <Form.Item
              label="元素标识"
              name="name"
              rules={[{ required: true, message: '请输入元素名称' }]}
            >
              <Input placeholder="请输入元素名称" />
            </Form.Item>
            <Form.Item
              label="元素名称"
              name="readableName"
              rules={[{ required: true, message: '请输入元素名称' }]}
            >
              <Input placeholder="请输入元素名称" />
            </Form.Item>
            <Form.Item
              label="接口地址"
              name="url"
              rules={[{ required: true, message: '请输入接口地址' }]}
            >
              <Input placeholder="请输入接口地址" />
            </Form.Item>
            <Form.Item
              label="请求方式"
              name="method"
              rules={[{ required: true, message: '请选择请求方式' }]}
            >
              <Select placeholder="请选择请求方式" onChange={() => {}} allowClear>
                <Option value="POST">POST</Option>
                <Option value="GET">GET</Option>
                <Option value="PUT">PUT</Option>
                <Option value="DELETE">DELETE</Option>
                <Option value="HEAD">HEAD</Option>
                <Option value="TRACE">TRACE</Option>
                <Option value="PATCH">PATCH</Option>
                <Option value="OPTIONS">OPTIONS</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </PageContainer>
  )
}

export default Page
