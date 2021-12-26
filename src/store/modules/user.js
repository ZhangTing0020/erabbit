// 用户信息模块
export default {
  namespaced: true,
  state () {
    return {
      msg: 'nihao',
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    updateMsg (state, payload) {
      state.msg = payload
    },
    updateInfo (state, payload) {
      state.profile = payload
    }
  },
  actions: {},
  getters: {}
}
