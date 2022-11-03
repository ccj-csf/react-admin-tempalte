import { DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import React from 'react'

interface DefaultToolbarProps {
  onNewClick?: () => void
  onExport?: () => void
}

const DefaultToolbar: React.FC<DefaultToolbarProps> = (props) => {
  const { onNewClick, onExport } = props

  return (
    <Space>
      <Button key="btn-export" onClick={onExport}>
        <DownloadOutlined />
        导出
      </Button>
      <Button key="btn-new" type="primary" onClick={onNewClick}>
        <PlusOutlined />
        新建
      </Button>
    </Space>
  )
}

export default DefaultToolbar
