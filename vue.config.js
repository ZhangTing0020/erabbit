// path 是node中的语法
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 设置需要自动化导入的less文件的路径,如果有多个需要导入配置,就在这个后边继续加上path.join
        path.join(__dirname, './src/styles/variables.less'),
        path.join(__dirname, './src/styles/mixins.less')
      ]
    }
  }
}
