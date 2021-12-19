<template>
  <div>
    <div>{{$store.state.info}}</div>
    <div>{{$store.getters.myInfo}}</div>
    <div>模块信息：{{$store.state.user.msg}}</div>
    <button @click='handleClick'>点击</button>
  </div>
</template>
<script>
// useStore仅仅可以使用在组件中
// 1.导入useStore方法从vuex
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup () {
    // 2. 基于useStore方法生成一个store对象 （this.$store）
    const store = useStore()
    // const info = this.$store.state.info
    const info = store.state.info
    console.log(info)

    const handleClick = () => {
      // store.commit('updateInfo', 'jerry')
      // store.dispatch('updateInfo', 'jerry')

      store.commit('user/updateMsg', 'hello')
    }
    return {
      handleClick
    }
  }
}
</script>
