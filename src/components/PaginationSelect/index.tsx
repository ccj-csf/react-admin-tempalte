/**
 * 分页下拉选择器组件
 */
import * as React from 'react'

import { Divider, Select, Pagination } from 'antd'

type PaginationType = {
  // 总条数
  totalElements: number
  // 总页数
  totalPages?: number
  // 每页大小
  pageSize?: number
}

type PaginationSelectType = {
  pagination: PaginationType
  request: (page: number, size: number) => void
  width?: number | string
  value?: string
  onChange?: (value: any) => void
  fieldProps: { options: any[]; [key: string]: any }
}

/**
 * |---------------------------------select 带分页组件----------------------------------|
 * |-------------1、支持除onChange、dropdownRender、value外的所有select属性
 * |-------------2、调用select默认属性，同pro-components，使用filedProps:{xx:xx}
 * |-------------3、分页默认是每页大小为8，当所给数据超过分页大小8时会被当做全部数据，此时将组件将接管分页功能，
 * 不在发送请求获取数据(设置了每页大小，则以实际为准)
 */
const Index = ({
  value,
  onChange,
  pagination,
  request,
  width = '100%',
  fieldProps = { options: [] },
}: PaginationSelectType) => {
  const [selectVal, setSelectVal] = React.useState<string | string[]>()
  const [current, setCurrent] = React.useState<number>(1)
  const [totalPages] = React.useState<number>(Math.ceil(pagination.totalElements / 8))
  const [options, setOptions] = React.useState(
    fieldProps?.options.slice(0, pagination?.pageSize || 8),
  )
  return (
    <Select
      value={value || selectVal}
      style={{ width: width }}
      onChange={(newVal) => {
        setSelectVal(newVal)
        onChange?.(newVal)
      }}
      dropdownRender={(menu) => (
        <>
          {menu}
          {totalPages > 1 && <Divider style={{ margin: '8px 0' }} />}
          <div style={{ padding: '0 8px 4px 4px', display: 'flex', justifyContent: 'flex-end' }}>
            {(width >= 240 || width === '100%') && totalPages > 1 && (
              <span>总共 {pagination?.totalElements} 条</span>
            )}
            <Pagination
              simple
              size="small"
              current={current}
              pageSize={pagination?.pageSize || 8}
              hideOnSinglePage={true}
              showSizeChanger={false}
              total={pagination?.totalElements || 0}
              onChange={(page, size) => {
                setCurrent(page)
                if (fieldProps.options.length > (pagination?.pageSize || 8)) {
                  setOptions(
                    fieldProps?.options.slice(
                      page * (pagination?.pageSize || 8) - (pagination?.pageSize || 8),
                      page * (pagination?.pageSize || 8),
                    ),
                  )
                } else {
                  request(page - 1, size)
                }
              }}
            />
          </div>
        </>
      )}
      {...{ ...fieldProps, options: options }}
    />
  )
}

export default Index
