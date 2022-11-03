import React, { useCallback } from 'react'
import { UserOutlined } from '@ant-design/icons'
import type { MenuInfo } from 'rc-menu/lib/interface'
import { Avatar, Menu, Spin } from 'antd'
import { useModel } from 'umi'
import HeaderDropdown from '../HeaderDropdown'
import styles from './index.less'
import userApi from '@/api/user'
import { setGallopsTicket } from '@/utils/storage'

// const SUCCESS_CODE = 200
// const ERROR_CODE = 200

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({}) => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        setInitialState((s: any) => ({ ...s, currentUser: undefined, currentMenu: undefined }))
        await userApi.logout()
        setGallopsTicket('')
        const href = window.location.href
        window.location.href = `${REDIRECT_URL}${href}`
      }
    },
    [setInitialState],
  )

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const { currentUser } = initialState

  if (!currentUser || !currentUser.userName) {
    return loading
  }

  const menuItems = [
    // { label: '个人中心', key: 'center' },
    // { label: '个人设置', key: 'settings' },
    { label: '退出登录', key: 'logout' },
  ]

  const menuHeaderDropdown = <Menu items={menuItems} selectedKeys={[]} onClick={onMenuClick} />
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
