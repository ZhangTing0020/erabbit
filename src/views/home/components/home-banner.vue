<template>
  <div class="home-banner">
    <!-- 将返回的轮播图信息传递给子组件 -->
    <XtxCarousel :sliders="sliders" />
  </div>
</template>
<script>
import { findBanner } from '@/api/home'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup () {
    const sliders = ref([])
    // 这里是不是应该加上catch
    findBanner().then(data => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
// 这里的深度选择器 以及两个类之间没有空格,表示这两个类要同时存在 ,表示交集选择器
// 如果两个类之间有空格的话,表示后代选择器
// 当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素，父组件的样式将不会渗透到子组件。 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用深度选择器。
.xtx-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
