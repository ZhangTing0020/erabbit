// 用户信息模块
export default {
  namespaced: true,
  state () {
    return {
      msg: 'nihao',
      // 用户信息
      profile: {
        token: ''
      }
    }
  },
  mutations: {
    updateMsg (state, payload) {
      state.msg = payload
    }
  },
  actions: {},
  getters: {}
}
