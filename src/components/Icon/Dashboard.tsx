import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const DashboardSVG = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.8334 10.9055V3.61385C12.8334 3.22708 12.6798 2.85614 12.4063 2.58265C12.1328 2.30916 11.7619 2.15552 11.3751 2.15552H2.62508C2.23831 2.15552 1.86737 2.30916 1.59388 2.58265C1.32039 2.85614 1.16675 3.22708 1.16675 3.61385L1.16675 10.9055H6.51397V11.8777H4.08341V12.85H9.91675V11.8777H7.48619V10.9055H12.8334ZM2.62508 3.12774H11.3751C11.504 3.12774 11.6277 3.17895 11.7188 3.27012C11.81 3.36128 11.8612 3.48493 11.8612 3.61385V7.98885H2.13897V3.61385C2.13897 3.48493 2.19019 3.36128 2.28135 3.27012C2.37251 3.17895 2.49616 3.12774 2.62508 3.12774ZM2.13897 8.96107H11.8612V9.93329H2.13897V8.96107Z"
      fill="#2B2E30"
    />
  </svg>
)

const Dashboard = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DashboardSVG} {...props} />
)

export default Dashboard
