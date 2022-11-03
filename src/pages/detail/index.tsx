// import * as React from 'react'
import { Button } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { Access, useAccess } from 'umi'

export default function index(props: {
  route: { meta: { srcPath: string; elementName: string } | undefined }
}) {
  const access = useAccess()
  return (
    <PageContainer title="详情页面">
      {/* 类似详情页权限鉴定范例，如下只需要更换page-query即可 */}
      <Access accessible={access.verifyPermission('page-query', props.route.meta)}>
        <Button type="primary">编辑</Button>
      </Access>
    </PageContainer>
  )
}
