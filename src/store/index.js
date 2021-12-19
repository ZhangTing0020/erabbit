import { createStore } from 'vuex'
import user from './modules/user.js'
import cate from './modules/cate.js'
import cart from './modules/cart.js'
import global from './modules/global.js'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  // 全局模块
  ...global,
  // 局部模块
  modules: {
    user,
    cart,
    cate
  },
  plugins: [
    // 如下的插件配置用于把vuex模块的状态存储在缓存里面localStorage
    createPersistedstate({
      // 缓存数据的名称key
      key: 'erabbit-client-pc-store',
      // 缓存那几个模块
      paths: ['user', 'cart']
    })
  ]
})
