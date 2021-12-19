<template>
  <!-- 顶部的通栏 -->
  <TopNav />
  <!-- 顶部导航栏 -->
  <TopHeader />
  <!-- 路由填充位 -->
  <div class="main">
    <router-view />
  </div>
  <!-- 底部的footer -->
  <BottomFooter />
</template>
<script>
import TopNav from './components/top-nav.vue'
import TopHeader from './components/top-header.vue'
import BottomFooter from './components/bottom-footer.vue'

export default {
  name: 'Layout',
  components: { TopNav, TopHeader, BottomFooter }
}
</script>
<style scoped lang='less'>
.main {
  min-height: 300px;
}
</style>
