<template>
  <div class="xtx-home-page">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCate />
    </div>
  </div>
</template>
<script>
import HomeCate from './components/home-cate.vue'

export default {
  name: 'Home',
  components: { HomeCate }
}
</script>

<style scoped lang='less'>
// 底层webpack解析路径时要求添加一个波浪线
// @import '~@/styles/variables.less';
// 本来每次都需要手动导入的,但是下了一个webpack的插件,可以自动导入
// .active {
//   color: @xtxColor;
// }

.xtx-home-page {
  .container {
    width: 1240px;
    margin: 0 auto;
    position: relative;
  }
}
</style>
