function proTable2SpringPage(params: any) {
  const pagination = {
    size: params.pageSize || 10,
    page: (params.current || 1) - 1,
  }
  const nParams = { ...params, ...pagination }
  delete nParams.pageSize
  delete nParams.current

  return nParams
}

function springPage2ProTable(jsend: any) {
  return {
    data: jsend.data?.content || [],
    success: jsend.status === 'success',
    total: jsend.data?.totalElements,
  }
}

// 合并对象
function mergeObj(target = {}, sources = {}) {
  const obj = target
  if (typeof target != 'object' || typeof sources != 'object') {
    return sources // 如果其中一个不是对象 就返回sources
  }
  for (const key in sources) {
    // 如果target也存在 那就再次合并
    if (target.hasOwnProperty(key)) {
      obj[key] = mergeObj(target[key], sources[key])
    } else {
      // 不存在就直接添加
      obj[key] = sources[key]
    }
  }
  return obj
}

export { proTable2SpringPage, springPage2ProTable, mergeObj }
