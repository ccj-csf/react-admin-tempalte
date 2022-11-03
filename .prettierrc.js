const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  semi: false, // 结尾不用分号
}
