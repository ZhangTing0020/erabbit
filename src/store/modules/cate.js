import { findHeadCategory } from '@/api/cate'

// 提供默认的分类数据，防止出现空白的分类效果
import { category } from '@/utils/constant.js'
// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 原来的数据只是一个单纯的数组,现在需要的是一个对象,并且具有下标
      list: category.map((item, index) => ({ id: index, name: item }))
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
  getters: {
    leftCates (state) {
      // 此时需要保留两个二级分类
      // getters和计算属性中，不应该修改依赖的数据
      return state.list.map(item => {
        // 下边这个做法不可以,,,因为修改了原来的依赖,所以直接新返回一个对象,将原来的对象解构出来,然后,再用修改之后的children覆盖原来的children
        // item.children = item.children && item.children.filter((item, index) => index < 2)
        // return item
        return {
          ...item,
          // children: item.children && item.children.filter((item, index) => index < 2)
          // 注意区分  slice  splice  split三个方法的用法????????????????????
          children: item.children && item.children.slice(0, 2)
        }
      })
    }
  }
}
