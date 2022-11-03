import * as React from 'react'

import { SwapOutlined } from '@ant-design/icons'
import type { ProFormInstance } from '@ant-design/pro-form'
import { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'
import { useRequest } from 'ahooks'
import { Button } from 'antd'
import type { ActionType } from '@ant-design/pro-table'

import authorityApi from '@/api/authority'
import GallopsTable from '@/components/GallopsTable'

const ZERO = 0
const MAX_NUM = 9999

interface AssignRoleProps {
  user: any
}

const Test: React.FC = ({}) => {
  const actionRef = React.useRef<ActionType>()
  const fetchRoles = async () => {
    const _data: any = await authorityApi.getRolesLists({ appId: APPID, size: MAX_NUM, page: ZERO })
    const data: any = _data?.data?.content || []
    return data
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
          console.log(values)
          return true
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
      render: (record: any) => [<AssignRole key="assignRole" user={record} />],
    },
  ]

  const userLists = async (params: any) => {
    // 表单搜索项会从 params 传入，传递给后端接口。
    const data: any = await authorityApi.userLists(params)
    return data
  }

  return (
    <PageContainer>
      <GallopsTable
        actionRef={actionRef}
        // request={async (params: any, sort: any, filter: any) => {
        //   console.log(params, sort, filter)
        //   // 表单搜索项会从 params 传入，传递给后端接口。
        //   const data: any = await authorityApi.userLists(proTable2SpringPage(params))
        //   return Promise.resolve(springPage2ProTable(data))
        // }}
        requestUrl={userLists}
        columns={columns}
      />
    </PageContainer>
  )
}

export default Test
