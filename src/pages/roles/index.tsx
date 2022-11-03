import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import { Badge, Button, Checkbox, Form, Input, Modal, Popconfirm, Select, Table } from 'antd'
import * as React from 'react'
import { useAccess, Access } from 'umi'

import authorityApi from '@/api/authority'

import util from './util'
import type { CheckboxValueType } from 'antd/lib/checkbox/Group'

const { Search } = Input
const { Option } = Select
const MAX_NUM = 999
const ZERO = 0

const Roles = () => {
  const [visible, setVisible] = React.useState(false)
  const [modelEdit, setModelEdit] = React.useState(false)
  const [selectedRole, setSelectedRole] = React.useState<any>({})
  const [currentRole, setCurrentRole] = React.useState<any>({})
  const [selectedNum, setSelectedNum] = React.useState(ZERO)
  const [rolesList, setRolesList] = React.useState([])
  const [defaultFormValue, setDefaultFormValue] = React.useState<any>(null)
  const [selectedKeys, setSelectedKeys] = React.useState<any>([])
  const [checkElementValue, setCheckElementValue] = React.useState<any>([])
  const [dataMenuSource, setDataMenuSource] = React.useState([])

  const formRef: any = React.createRef()
  const access = useAccess()

  const processSelectedKey = (_access: any[]) => {
    return _access.map((el: { menuId: any }) => el.menuId)
  }
  // 查询角色列表
  // 查询角色详细信息
  const getRolesDetails = (info: React.Key[]) => {
    authorityApi
      .getRolesDetails(info)
      .then((res: any) => {
        let key: any = processSelectedKey(res.data.accessible)
        key = key.filter((el: any) => {
          const childrenNode = util.findChildrenNode(dataMenuSource, el)
          const parentNode = util.findParentNode({ id: 0, children: dataMenuSource }, el)
          if (childrenNode === undefined) {
            //删除当前元素
            return el
          }
          if (childrenNode.length === 0 && parentNode.id === 0) {
            return el
          }
        })
        setCurrentRole(res.data || [])
        setSelectedRole(res.data || [])
        setCheckElementValue(res.data.accessible)
        setSelectedKeys(key)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getRolesLists = (
    info: { appId: string; size: number; page: number; name?: any },
    isInit?: boolean | undefined,
  ) => {
    authorityApi
      .getRolesLists(info)
      .then((res: any) => {
        if (isInit) {
          setRolesList(res.data.content || [])
          setCurrentRole(res.data.content[0])
          setSelectedRole(res.data.content[0])
          getRolesDetails(res.data.content[0].id)
        } else {
          setRolesList(res.data.content || [])
          getRolesDetails(selectedRole.id)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 分配角色权限
  const grantRoles = (id: any, info: { menuId: any; elements: any }[]) => {
    authorityApi
      .grantRoles(id, info)
      .then(() => {
        getRolesDetails(currentRole.id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 查询菜单树
  const getMenuForest = (info: { appId: string; size: number; page: number }) => {
    authorityApi
      .getMenuForest(info)
      .then((res: any) => {
        setDataMenuSource(res.data || [])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // 新建角色
  const createRoles = (info: any) => {
    authorityApi
      .addRoles(info)
      .then(() => {
        getRolesLists({ appId: APPID, size: MAX_NUM, page: ZERO })
        setVisible(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 修改角色
  const updateRole = (id: any, info: any) => {
    authorityApi
      .updateRole(id, info)
      .then(() => {
        getRolesLists({ appId: APPID, size: MAX_NUM, page: ZERO })
        setVisible(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 删除角色
  const deleteRole = (id: any) => {
    authorityApi
      .deleteRole(id)
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
  }

  const checkboxChange = (checkedValues: CheckboxValueType[], record: { id: any }) => {
    let checkedArr: any = [...checkElementValue]
    const hasCheckItem = checkedArr.find((el: any) => el.menuId === record.id)
    if (hasCheckItem) {
      checkedArr = checkedArr.map((el: any) =>
        el.menuId === record.id ? { menuId: record.id, elements: checkedValues } : el,
      )
    } else {
      checkedArr.push({ menuId: record.id, elements: checkedValues })
    }
    setCheckElementValue(checkedArr)
  }

  /**
   * 处理修改新建操作函数
   */
  const operatePageOrPath = (sys: React.SetStateAction<null>) => {
    setVisible(true)
    setDefaultFormValue(sys)
    setModelEdit(true)
  }

  const confirm = (e: { id: any }) => {
    deleteRole(e.id)
  }

  const cancel = () => {}

  const handleOk = () => {
    // 校验参数，通过则继续
    formRef.current
      .validateFields()
      .then((values: { id: any }) => {
        if (modelEdit) {
          updateRole(defaultFormValue.id, { ...values })
        } else {
          createRoles({ ...values, code: values.id, appId: APPID })
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const handleCancel = () => {
    setVisible(false)
    // 重置参数
    formRef.current.resetFields()
  }

  const createMenu = () => {
    setVisible(true)
    setModelEdit(false)
    setDefaultFormValue(null)
  }

  const handleAuthorize = () => {
    let parentKeys: any = []
    selectedKeys.map((el: any) => {
      const _parent = util.findParentNode({ id: 0, children: dataMenuSource }, el)
      const has = parentKeys.find((_el: any) => _el.id === _parent.id)
      if (!has) {
        if (_parent.id !== 0) {
          // 等予0没有父级不用管
          parentKeys.push(_parent)
        }
      }
    })
    parentKeys = parentKeys.map((el: any) => el.id)
    parentKeys = [...new Set(parentKeys)]
    parentKeys = [...selectedKeys, ...parentKeys]
    // checkElementValue为页面元素关联数据，selectedKeys为菜单关联数据
    const req = parentKeys.map((el: any) => {
      // const parentId = findParents(dataMenuSource, el)
      const _element: any = checkElementValue.find((element: any) => element.menuId === el) || []
      return {
        menuId: el,
        elements: _element ? _element.elements : [],
      }
    })
    grantRoles(currentRole.id, req)
  }
  const handleCancelAuthorize = () => {
    setSelectedNum(ZERO)
    setSelectedKeys([])
    setCheckElementValue([])
  }

  React.useEffect(() => {
    getRolesLists({ appId: APPID, size: MAX_NUM, page: ZERO }, true)
    getMenuForest({ appId: APPID, size: MAX_NUM, page: ZERO })
  }, [])

  const onSearch = (val: string) => {
    getRolesLists({ appId: APPID, size: MAX_NUM, page: ZERO, name: val })
  }

  const RoleOperation = ({ text, record }: any) => {
    console.log(text)
    // 权限处理
    return (
      <span className="table-operation">
        <Access accessible={access.verifyPermission('role-update')}>
          <Button
            type="link"
            className="w-24px border-0"
            onClick={() => {
              operatePageOrPath(record)
            }}
            icon={<EditOutlined />}
          />
        </Access>

        <Access accessible={access.verifyPermission('role-delete')}>
          {ROLE_DELETE_ENABLE && (
            <Popconfirm
              title="确定删除当前数据?"
              onConfirm={() => confirm(record)}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="link"
                className="w-24px text-[#FF4D4F] border-0 ml-5px"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          )}
        </Access>
      </span>
    )
  }

  const roleColumns: any = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 110,
      filterSearch: true,
      onFilter: (value: any, record: { name: any }) => record.name === value,
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '  状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      width: 75,
      render: (record: any) => (
        <Badge color={record === '启用' ? '#52C41A' : '#FF4D4F'} text={record} />
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: 85,
      render: (text: any, record: any, index: any) => (
        <RoleOperation text={text} record={record} index={index} />
      ),
    },
  ]
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path',
      width: 170,
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 130,
    },
    {
      title: '页面元素',
      dataIndex: 'element',
      key: 'element',
      render: (text: any, record: any, index: number) => {
        console.log(text)
        let options = null
        if (record.elements) {
          options = record.elements.map((el: { readableName: any; id: any }) => {
            return {
              label: el.readableName,
              value: el.id,
            }
          })
        }
        return options ? (
          <Checkbox.Group
            key={index}
            options={options}
            value={checkElementValue.find((el: any) => record.id === el.menuId)?.elements}
            disabled={
              selectedRole.status === 'DISABLE'
                ? true
                : selectedKeys.indexOf(record?.id) === -1
                ? true
                : false
            }
            onChange={(val) => checkboxChange(val, record)}
          />
        ) : (
          <span>无页面元素</span>
        )
      },
    },
  ]

  // 新建
  const CreateBtn = () => {
    // 权限处理
    return (
      <Access accessible={access.verifyPermission('role-create')}>
        <Button type="primary" onClick={() => createMenu()} icon={<PlusOutlined />}>
          新建
        </Button>
      </Access>
    )
  }

  // 新建
  const AuthorizeMenu = () => {
    // 权限处理
    return (
      <Access accessible={access.verifyPermission('role-authorization')}>
        <Popconfirm
          title="确定授权?"
          onConfirm={() => handleAuthorize()}
          onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" style={{ paddingRight: 0 }}>
            确定授权
          </Button>
        </Popconfirm>
      </Access>
    )
  }

  return (
    <PageContainer title="角色授权">
      <div className="flex">
        <div className="w-500px mr-20px p-20px bg-[#ffffff]">
          <h1 className="w-full flex justify-between font-bold text-16px item-center">
            角色管理
            <CreateBtn />
          </h1>
          <Search
            placeholder="输入角色名称"
            onSearch={(val) => onSearch(val)}
            allowClear
            maxLength={40}
            className="w-full mb-8px"
          />
          <div style={{ height: 'calc(100% - 70px)', overflowY: 'auto' }}>
            <Table
              rowSelection={{
                type: 'radio',
                selectedRowKeys: [selectedRole?.id],
                onChange: (selectedRowKey, selectedRows) => {
                  setSelectedRole(selectedRows[0])
                  setCurrentRole(selectedRows[0])
                  getRolesDetails(selectedRowKey)
                },
                getCheckboxProps: (record: any) => {
                  return {
                    disabled: record.status === 'DISABLE', // Column configuration not to be checked
                  }
                },
              }}
              dataSource={rolesList}
              columns={roleColumns}
              rowKey="id"
            />
          </div>
        </div>
        <div className="w-[calc(100% - 520px)] p-20px bg-[#ffffff]">
          <h1 className="w-full flex justify-between font-bold text-16px">角色菜单授权</h1>
          <div className="flex items-center justify-between w-full my-10px py-5px px-20px bg-[#e6f7ff] rounded-[5px] border-1 border-[#91d5ff]">
            <span>已选择 {selectedNum} 项</span>
            {selectedRole.status === 'ENABLE' && (
              <span>
                <Button
                  type="link"
                  style={{ paddingRight: '10px', color: '#FF4D4F' }}
                  onClick={() => handleCancelAuthorize()}
                >
                  取消选择
                </Button>
                <AuthorizeMenu />
              </span>
            )}
          </div>
          <div>
            <Table
              rowSelection={{
                checkStrictly: false,
                selectedRowKeys: selectedKeys,
                onChange: (selectedRowKeys: any, selectedRows) => {
                  const __checkElementValue = selectedRows.map((el) => {
                    const value = checkElementValue.find((val: any) => val.menuId === el.id)
                    if (value) {
                      return value
                    } else {
                      return {
                        menuId: el.id,
                        pageId: el.pageId,
                        elements: el.elements
                          ? el.elements.map((_el: { id: any }) => _el.id)
                          : undefined,
                      }
                    }
                  })
                  const _checkElementValue: any = [...__checkElementValue]
                  setSelectedNum(selectedRows.length)
                  setSelectedKeys(selectedRowKeys)
                  setCheckElementValue(_checkElementValue)
                },
                onSelectAll: (selected, selectedRows) => {
                  const rows: any = selectedRows.map((el) => el.id)
                  const __checkElementValue = selectedRows.map((el) => {
                    return {
                      menuId: el.id,
                      pageId: el.pageId,
                      elements: el.elements
                        ? el.elements.map((_el: { id: any }) => _el.id)
                        : undefined,
                    }
                  })
                  let _checkElementValue: any = [...__checkElementValue]
                  if (!selected) {
                    _checkElementValue = []
                  }

                  setTimeout(() => {
                    setSelectedNum(rows.length)
                    setSelectedKeys(rows)
                    setCheckElementValue(_checkElementValue)
                  }, 0)
                },

                // 取消选中的时候在这里做处理，将选中的页面元素取消选中
                onSelect: (record, selected) => {
                  // 取消
                  if (!selected) {
                    // record为取消选中的值，需要删除selectedKeys中的值
                    const index = checkElementValue.findIndex((el: any) => el.menuId === record.id)
                    if (index !== -1) {
                      checkElementValue.splice(index, 1)
                    }
                    setCheckElementValue(checkElementValue)
                  }
                },

                getCheckboxProps: () => {
                  return {
                    disabled: selectedRole.status === 'DISABLE', // Column configuration not to be checked
                  }
                },
              }}
              dataSource={dataMenuSource}
              columns={columns}
              rowKey="id"
              scroll={{ x: 950 }}
              pagination={{
                // 每页条数
                pageSize: 10,
                showTotal: (total, range) => `共 ${total} 条，当前第 ${range[0]}-${range[1]} 条`,
                onChange: () => {
                  //请求数据
                },
              }}
            />
          </div>
        </div>
      </div>
      {visible && (
        <Modal
          title={modelEdit ? `角色修改(${defaultFormValue.code})` : '角色新建'}
          visible={visible}
          onOk={() => handleOk()}
          onCancel={() => handleCancel()}
        >
          <Form
            ref={formRef}
            labelCol={{ xs: { span: 24 }, sm: { span: 4 } }}
            wrapperCol={{ xs: { span: 24 }, sm: { span: 20 } }}
            initialValues={defaultFormValue}
          >
            {!modelEdit && (
              <Form.Item
                label="角色编码"
                name="id"
                rules={[{ required: true, message: '请输入角色编码' }]}
              >
                <Input placeholder="请输入角色编码" />
              </Form.Item>
            )}
            <Form.Item label="角色名称" name="name" rules={[{ required: true }]}>
              <Input placeholder="请输入角色名称" />
            </Form.Item>
            {modelEdit && (
              <Form.Item
                label="角色状态"
                name="status"
                rules={[{ required: true, message: '请选择角色状态' }]}
              >
                <Select placeholder="请选择角色状态">
                  <Option value="ENABLE" key="ENABLE">
                    启用
                  </Option>
                  <Option value="DISABLE" key="DISABLE">
                    禁用（禁用状态无法授权）
                  </Option>
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="角色描述"
              name="description"
              rules={[{ required: false, message: '请输入角色描述' }]}
            >
              <Input placeholder="请输入角色描述" />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </PageContainer>
  )
}

export default Roles
