import { DefaultFooter } from '@ant-design/pro-layout'
import styles from './index.less'
import defaultSettings from '../../../config/defaultSettings'

const Footer: React.FC = () => {
  const defaultMessage = defaultSettings.title || '云南腾晋物流股份有限公司'
  const currentYear = new Date().getFullYear()
  return (
    <DefaultFooter copyright={`${currentYear} ${defaultMessage}`} className={styles.footerStyle} />
  )
}

export default Footer
