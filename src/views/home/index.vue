<template>
  <div class="xtx-home-page">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCate />
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- 新鲜好物 -->
      <HomeNew></HomeNew>
       <!-- 人气推荐 -->
    <HomeHot />
    </div>
    <!-- 测试Pannel组件 -->
      <!-- 在vue3中匿名插槽用template包裹标签时,必须要在template上写上default名字,,,,否则就不要用template标签,,,直接写里边的标签 -->
    <!-- <HomePannel title="主标题" subTitle="副标题">
      <template #right>
        <XtxMore path="/" />
      </template>
      <template v-slot:default>
        <div>内容区</div>
      </template>
    </HomePannel> -->
  </div>
</template>
<script>
import HomeCate from './components/home-cate.vue'
import HomeBanner from './components/home-banner'
// import HomePannel from './components/home-pannel.vue'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
export default {
  name: 'Home',
  components: { HomeCate, HomeBanner, HomeNew, HomeHot }
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
    // ????????????????????????????????????这为什么要相对定位呢????????子绝父相??????????
    position: relative; // 只有相对定位不脱标
  }
}
</style>
