class Util {
  //传入参数：需要遍历的json，需要匹配的id
  public findParentNode(data: { id: number; children: any[] }, id: string): any {
    //设置结果
    console.log(data, id)

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
  public findChildrenNode(data: any[], id: string): any {
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
