import { Button, Result } from 'antd'
import React from 'react'

const UnAuthorizedPage: React.FC = () => {
  // React.useEffect(() => {
  //   window.location.href = window.location.origin
  // })
  return (
    <Result
      status="403"
      title="401"
      subTitle="您尚未登录系统，请完成登录后使用"
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.location.href = window.location.origin
          }}
        >
          登录
        </Button>
      }
    />
  )
}

export default UnAuthorizedPage
