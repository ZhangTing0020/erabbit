import { findHeadCategory } from '@/api/cate'

// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    // 获取top-header的数据
    updateCate (state, payload) {
      state.list = payload
    }
  },
  actions: {
    async updateCate (context) {
      const ret = await findHeadCategory()
      // console.log(ret)
      if (ret && ret.result) {
        // 触发store中的mutations
        context.commit('updateCate', ret.result)
      }
    }
  },
  getters: {}
}
