<template>
  <div class="goods-image">
    <!-- 大盒子 -->
    <div
      class="large"
      v-show="isShow"
      :style="[{ backgroundImage: `url(${images[currIndex]})` },bgPosition]"
    ></div>
    <!-- 左侧预览中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩层 -->
      <div class="layer" v-show="isShow" :style="position"></div>
    </div>
    <!-- 右侧缩略图 -->
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, watch, reactive } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currIndex = ref(0)
    const isShow = ref(false)
    // **************************判断是否进入监听区域
    const target = ref(null)
    // 遮罩层位置坐标
    const position = reactive({
      left: 0,
      top: 0
    })

    // 右侧预览大图的坐标
    const bgPosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    // elementX elementY 是图片的坐标,他的左上角坐标是 0,0
    // position 是遮罩层的坐标
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      isShow.value = !isOutside.value
      // console.log(elementX.value, elementY.value, isOutside.value)
      // X 轴
      if (elementX.value < 100) {
        position.left = 0
        // console.log(position.left)
      } else if (elementX.value > 300) {
        position.left = 200
        // console.log(position.left)
      } else {
        // 中间
        position.left = elementX.value - 100
        // console.log(position.left)
      }

      // Y 轴
      if (elementY.value < 100) {
        position.top = 0
      } else if (elementY.value > 300) {
        position.top = 200
      } else {
        // 中间
        position.top = elementY.value - 100
      }

      bgPosition.backgroundPositionX = position.left * (-2) + 'px'
      bgPosition.backgroundPositionY = position.top * (-2) + 'px'
      // 如果放在watch侦听器之外得话,每次坐标发生变化,都不会发生变化,,所以遮罩层是不会跟着鼠标动的
      // 怎么实现遮罩层跟着鼠标移动的??? elementX elementY就是鼠标在target获取的元素中的坐标,将 position.left 与 elementX产生关系,于是就可以让遮罩层随着鼠标移动

      // 怎么做到鼠标在遮罩层的中心点??? elementX elementY是鼠标在target获取的元素左上角的坐标,,,要想在鼠标在遮罩层中心,就是在鼠标的坐标 x<100的时候, 遮罩层的x坐标置为0 , y的坐标小于100的时候,
      //
      position.left = position.left + 'px'
      position.top = position.top + 'px'
      // console.log(position.left, position.top)
    })

    return { currIndex, isShow, target, position, bgPosition }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
