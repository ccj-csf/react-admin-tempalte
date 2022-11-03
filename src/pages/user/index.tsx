import * as React from 'react'

import { PlusOutlined, SwapOutlined } from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { useRequest } from 'ahooks'
import { Button, Input, Table } from 'antd'
import { Access, useAccess } from 'umi'

import authorityApi from '@/api/authority'

const ZERO = 0
const MAX_NUM = 9999

const { Search } = Input

interface AssignRoleProps {
  user: any
}

const User: React.FC = ({}) => {
  const access = useAccess()
  const [userListData, setUserListData] = React.useState<any>([])
  const [pageInfo, setPageInfo] = React.useState({ pageTotal: 0, pageCurrent: 1 })
  const fetchRoles = async () => {
    const _data: any = await authorityApi.getRolesLists({ appId: APPID, size: MAX_NUM, page: ZERO })
    const data: any = _data?.data?.content || []
    return data
  }
  const userLists = async (info: object) => {
    const data: any = await authorityApi.userLists(info)
    setUserListData(data.data.content)
    setPageInfo({ pageTotal: data.data.totalElements, pageCurrent: data.data.number + 1 })
  }

  const AssignRole = (props: AssignRoleProps) => {
    const { user } = props

    const formRef = React.useRef<ProFormInstance>()

    const { runAsync } = useRequest(async () => authorityApi.getCurrentGrant(user?.loginName), {
      manual: true,
      onSuccess: (result: any) => {
        const roles = result.data
        formRef.current?.setFieldsValue({ roles })
      },
    })

    return (
      <ModalForm
        title="分配角色"
        width={438}
        formRef={formRef}
        autoFocusFirstInput
        layout={'horizontal'}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        modalProps={{
          destroyOnClose: true,
        }}
        submitTimeout={2000}
        trigger={
          <Button type="link" icon={<SwapOutlined />}>
            分配角色
          </Button>
        }
        onVisibleChange={(visible) => {
          if (visible) {
            runAsync()
          }
        }}
        onFinish={async (values) => {
          const jsend: any = await authorityApi.grant(user?.loginName, values.roles)
          userLists({ size: 10, page: 0 })
          return jsend.status === 'success'
        }}
      >
        <ProFormSelect
          mode={'multiple'}
          name="roles"
          label="分配角色"
          placeholder="请选择要分配的角色"
          request={fetchRoles}
          rules={[{ required: true, message: '请选择要分配的角色' }]}
          fieldProps={{
            fieldNames: { label: 'name', value: 'code' },
          }}
        />
      </ModalForm>
    )
  }

  const columns = [
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'userName',
    },
    {
      title: '公司',
      dataIndex: 'orgName',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 110,
      render: (record: any) => [
        <Access
          key={record.id}
          accessible={access.verifyPermission('user-assigning')}
          fallback={<div>--</div>}
        >
          <AssignRole key="assignRole" user={record} />
        </Access>,
      ],
    },
  ]

  const onSearch = (value: string) => {
    userLists({ name: value, size: 10, page: 0 })
  }

  React.useEffect(() => {
    userLists({ size: 10, page: 0 })
  }, [])

  return (
    <PageContainer>
      <div className="w-full p-20px bg-[#ffffff]">
        <h1 className="flex justify-between text-16px font-bold">
          用户管理
          <span>
            <Search
              placeholder="输入用户名称"
              onSearch={(val) => onSearch(val)}
              className="w-60"
              allowClear
            />

            {false && (
              <Button type="primary" className="ml-20px" icon={<PlusOutlined />}>
                新建
              </Button>
            )}
          </span>
        </h1>
        <Table
          dataSource={userListData}
          columns={columns}
          rowKey="id"
          pagination={{
            // 每页条数
            total: pageInfo.pageTotal,
            // pageSize: 10,
            current: pageInfo.pageCurrent,
            showTotal: (total, range) =>
              `共 ${pageInfo.pageTotal} 条，当前第 ${range[0]}-${range[1]} 条`,
            onChange: (page, pageSize) => {
              //请求数据
              userLists({
                appId: APPID,
                size: pageSize,
                page: page - 1,
              })
            },
          }}
        />
      </div>
    </PageContainer>
  )
}

export default User
