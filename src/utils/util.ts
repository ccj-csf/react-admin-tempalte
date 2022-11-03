class Util {
  /**
   * 删除对象数组元素
   * @param srcObjArr 原对象数组
   * @param properties 需要删除的属性
   */
  public delArrObjProperties(srcObjArr: any, property: any) {
    return srcObjArr.map((el: any) => {
      if (
        el[property].length === 0 ||
        el[property] === '' ||
        Object.keys(el[property]).length === 0 ||
        el[property]?.length === 0
      ) {
        delete el[property]
      }
      return el
    })
  }

  /**
   * @description 字符串布尔值转布尔
   * @params envName 任意类型
   */
  public convertToBoolean = (envName: any) => {
    return envName === 'true' ? true : envName === 'false' ? false : envName
  }

  //传入参数：需要遍历的json，需要匹配的id
  public findParentNode(data: any, id: any): any {
    //设置结果
    let result
    if (!data) {
      return //如果data传空，直接返回
    }
    for (let i = 0; i < data.children.length; i++) {
      const item = data.children[i]
      if (item.id == id) {
        result = data
        return result //这里是实际返回的值，你可以只返回当前对象，或者指定当前对象的某个字段。
      } else if (item.children && item.children.length > 0) {
        //如果有子集，则把子集作为参数重新执行本方法
        result = this.findParentNode(item, id)
        //关键，千万不要直接return本方法，不然即使没有返回值也会将返回return，导致最外层循环中断，直接返回undefined,要有返回值才return才对
        if (result) {
          return result
        }
      }
    }
    //如果执行循环中都没有return，则在此return
    return result
  }
  public findChildrenNode(data: any, id: any): any {
    for (let i = 0; i < data.length; i++) {
      const el = data[i]
      if (el.id === id) {
        return el?.children
      } else {
        if ('children' in data) {
          this.findChildrenNode(el?.children, id)
        }
      }
    }
  }
}
export default new Util()
