<template>
  <!-- 顶部的通栏 -->
  <TopNav />
  <!-- 顶部导航栏 -->
  <TopHeader />
    <!-- 吸顶组件 -->
  <HeaderSticky />
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
import HeaderSticky from './components/header-sticky.vue'
export default {
  name: 'Layout',
  components: { TopNav, TopHeader, BottomFooter, HeaderSticky }
}
</script>
<style scoped lang='less'>
.main {
  min-height: 300px;
}
</style>
