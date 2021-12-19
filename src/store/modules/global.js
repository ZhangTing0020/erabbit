// 全局模块
export default {
  state: () => {
    return {
      info: 'tom'
    }
  },
  mutations: {
    updateInfo (state, payload) {
      state.info = payload
    }
  },
  actions: {
    updateInfo (context, payload) {
      // 2秒后更新数据
      setTimeout(() => {
        context.commit('updateInfo', payload)
      }, 2000)
    }
  },
  getters: {
    myInfo (state) {
      return state.info + ' and jerry'
    }
  }
}
