import Icon from '@ant-design/icons'
import SvgSource from '@/assets/svgIcon'

const DefaultSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="" />
  </svg>
)

const SvgIcon = ({ icon }: any) => {
  let component: any = () => <DefaultSvg />
  if (SvgSource[icon]) {
    component = SvgSource[icon]
  }
  return <Icon component={component} style={{ fontSize: '14px' }} />
}

export default SvgIcon
