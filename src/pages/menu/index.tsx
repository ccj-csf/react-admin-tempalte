import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Form, Input, Modal, Popconfirm, Select, Table, TreeSelect } from 'antd'
import * as React from 'react'
import { useAccess, Access } from 'umi'

import authorityApi from '@/api/authority'

const { Option } = Select
const { Search } = Input

const Menu = () => {
  const [visible, setVisible] = React.useState(false)
  const [defaultFormValue, setDefaultFormValue] = React.useState<any>(null)
  const [dataMenuSource, setDataMenuSource] = React.useState([])
  const [pageTotal, setPageTotal] = React.useState(0)
  const [pageCurrent, setPageCurrent] = React.useState(1)
  const [pageLists, setPageLists] = React.useState([])

  const formRef: any = React.createRef()
  const access = useAccess()

  // 查询菜单树
  const getMenuForest = (info: { appId: string; size: number; page: number; name?: string }) => {
    authorityApi
      .getMenuForest(info)
      .then((res: any) => {
        setPageTotal(res.data.length)
        setDataMenuSource(res.data || [])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 新建菜单
  const addMenu = (info: any) => {
    authorityApi
      .addMenu({ ...info, appId: APPID })
      .then(() => {
        getMenuForest({
          appId: APPID,
          size: 10,
          page: pageCurrent - 1,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 修改菜单
  const updateMenu = (id: any, info: any) => {
    authorityApi
      .updateMenu(id, info)
      .then(() => {
        getMenuForest({
          appId: APPID,
          size: 10,
          page: pageCurrent - 1,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 删除菜单
  const deleteMenu = (id: any) => {
    authorityApi
      .deleteMenu(id)
      .then(() => {
        getMenuForest({
          appId: APPID,
          size: 10,
          page: pageCurrent - 1,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 查询菜单详情
  const getMenuInfo = (id: any) => {
    authorityApi
      .getMenuInfo(id)
      .then((res: any) => {
        if (res.status === 'success') {
          setDefaultFormValue(res.data)
          setVisible(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 查询页面列表
  const searchPageList = (info: { appId: string; size: number; page: number }) => {
    authorityApi
      .getPageList(info)
      .then((res: any) => {
        setPageLists(res.data.content)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /**
   * 处理修改新建操作函数
   * @param {*} text 当前单元格的值
   * @param {*} record 当前行的值
   * @param {*} index 当前行index索引
   */
  const operatePageOrPath = (text: any, record: { id: any }) => {
    getMenuInfo(record.id)
  }

  const confirm = (e: { id: any }) => {
    deleteMenu(e.id)
  }

  const cancel = (e: any) => {
    console.log(e)
  }

  const handleOk = () => {
    // 校验参数，通过则继续
    formRef.current
      .validateFields()
      .then((values: any) => {
        if (defaultFormValue) {
          // 修改
          updateMenu(defaultFormValue.id, values)
        } else {
          // 添加
          addMenu(values)
        }
        setVisible(false)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const handleCancel = () => {
    setVisible(false)
    formRef.current.resetFields()
    // 重置参数
  }

  const createMenu = () => {
    setVisible(true)
    setDefaultFormValue(null)
  }

  React.useEffect(() => {
    getMenuForest({
      appId: APPID,
      size: 10,
      page: pageCurrent - 1,
    })
    searchPageList({
      appId: APPID,
      size: 9999,
      page: 0,
    })
  }, [])

  const MenuOperation = ({ text, record }: any) => {
    // 权限处理
    return (
      <span className="table-operation">
        <Access accessible={access.verifyPermission('menu-update')}>
          <Button
            type="link"
            onClick={() => operatePageOrPath(text, record)}
            style={{ border: 0 }}
            icon={<EditOutlined />}
          />
        </Access>
        <Access accessible={access.verifyPermission('menu-delete')}>
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
  const columns: any = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: 120,
      render: (text: any, record: any, index: any) => (
        <MenuOperation text={text} record={record} index={index} />
      ),
    },
  ]

  const CreateBtn = () => {
    // 权限处理
    return (
      <>
        <Access accessible={access.verifyPermission('menu-create')}>
          <Button type="primary" onClick={() => createMenu()} icon={<PlusOutlined />}>
            新建
          </Button>
        </Access>
      </>
    )
  }
  return (
    <PageContainer title="菜单管理">
      <div className="flex">
        <div className="w-full h-full p-20px bg-[#ffffff]">
          <h1 className="flex justify-between font-bold text-16px">
            菜单编辑
            <div className="flex">
              {false && (
                <Search
                  placeholder="输入菜单名称"
                  onSearch={(val) => {
                    getMenuForest({
                      appId: APPID,
                      size: 10,
                      page: pageCurrent - 1,
                      name: val,
                    })
                  }}
                  className="w-full mr-20px"
                />
              )}
              <CreateBtn />
            </div>
          </h1>
          <div>
            <Table
              dataSource={dataMenuSource}
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
                  //请求数据
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
          title="新建菜单"
          visible={visible}
          onOk={() => handleOk()}
          onCancel={() => handleCancel()}
        >
          <Form
            ref={formRef}
            labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 19 } }}
            initialValues={defaultFormValue}
          >
            <Form.Item
              label="父级菜单"
              name="parentId"
              rules={[{ required: false, message: '请选择父级菜单' }]}
            >
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                treeData={dataMenuSource}
                fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="请选择父级菜单"
                allowClear
                treeDefaultExpandAll
                onChange={() => {}}
              />
            </Form.Item>
            <Form.Item
              label="菜单名称"
              name="name"
              rules={[{ required: true, message: '请输入菜单名称' }]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
            <Form.Item
              label="绑定页面"
              name="pageId"
              rules={[{ required: true, message: '请选择绑定页面' }]}
            >
              <Select
                placeholder="请选择绑定页面(不填会导致面包屑不显示)"
                showSearch
                allowClear
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {pageLists &&
                  pageLists.map((el: any) => {
                    return (
                      <Option value={el.id} key={el.id}>
                        {el.name}
                      </Option>
                    )
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="菜单图标"
              name="icon"
              tooltip="暂支持ant design icon默认图标，想要自定义需要联系开发人员添加自定义图标"
              rules={[{ required: false, message: '请输入菜单图标（ant design icon）' }]}
            >
              <Input placeholder="请输入菜单图标（ant design icon）" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </PageContainer>
  )
}
export default Menu
