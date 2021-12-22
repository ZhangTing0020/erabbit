<template>
  <div class='xtx-carousel' @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
        <!-- 以前做的轮播图,是图片从左向右依次进行轮播,而现在轮播是所有图片一起显示,不过是显示的那张图片透明度为1,,,其他图片的透明度都是0 全透明,所以不显示 -->
      <li class="carousel-item" v-for="(item,index) in sliders" :key="item.id" :class="{fade: currentIndex === index}">
        <RouterLink to="/">
          <img
          :src="item.imgUrl"
          alt="">
        </RouterLink>
      </li>
    </ul>
    <!-- 左右箭头 -->
    <a @click="toggle(-1)"  href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a @click="toggle(+1)" href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <!-- 轮播图下边的小圆圈 -->
    <div class="carousel-indicator">
        <!-- v-for的下标是从1开始的 -->
        <!--  3.用户点击小圆点,可以到达指定的图片 -->
      <span :class="{active: currentIndex===index-1}" v-for="index in sliders.length " :key="index" @click="currentIndex=index-1"></span>
      <!-- v-for遍历数字,item是从1开始的,,,但是下标还是从0开始的 -->
      <!-- <span v-for="i,index in 5" :key="index"> {{i}},{{index}}</span> -->
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 父组件传过来的轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 每张轮播图之间播放的时间间距
    duration: {
      type: Number,
      default: 1 // 默认传过来的单位是秒
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    // 这个轮播图做出来主要分为四部分
    // 1.页面一加载,自己播放
    // 2.用户点击左右箭头,可以实现播放
    // 3.用户点击小圆点,可以到达指定的图片
    // 4.鼠标进入轮播图,轮播图停止,,鼠标离开,轮播图开始轮播
    const currentIndex = ref(0)
    // 实现自动播放,做一个定时器,并且用函数封装,需要自动播放的时候,就调用这个方法,需要暂停轮播图的时候,就停止这个定时器
    let timer = null

    const autoplayFn = () => {
      timer = setInterval(() => {
        // 开启轮播图,也就是下标加一
        currentIndex.value++
        // 当下标的值 >= 父组件传过来轮播图数量的时候,就从0重新开始,,,如果只是大于的话,就会多一张空白图片,也就是所有的图片都透明了
        if (currentIndex.value >= props.sliders.length) {
          // 轮播图的下标是从0开始的,所以要置为0
          // 轮播图上的小圆点,下标也是从0开始的,,,,但是他的item值是从1开始的,所以上边的index就要-1
          currentIndex.value = 0
        }
      }, props.duration * 1000)
    }
    // 1.页面一加载,自己播放,侦听的是父组件传过来的sliders
    // 形参1这个回调函数中,如果要写花括号,就要加上return ,因为{} 中要写的是语句,不能写表达式
    // 箭头函数是的简写,不加花括号,并且函数体只有一行,会默认返回这行代码
    watch(() => { return props.sliders }, () => {
      // 如果父组件传过来的autoplay为true并且props.slider.length>=1,就自动播放
      if (props.autoplay && props.sliders.length > 0) {
        currentIndex.value = 0
        autoplayFn()
      }
    })

    // 2.用户点击左右箭头,可以实现播放
    const toggle = (val) => {
      if (val > 0) {
        // 点击了向右的箭头
        currentIndex.value++
        // 加到等于sliders的长度的时候,又要从0开始
        // 这里要考虑好临界值,到底要不要 =
        if (currentIndex.value >= props.sliders.length) {
          currentIndex.value = 0
        }
      } else {
        currentIndex.value--
        // 这里要考虑好临界值,到底要不要 =
        if (currentIndex.value <= 0) {
          currentIndex.value = props.sliders.length - 1
        }
      }
    }
    // 3.用户点击小圆点,可以到达指定的图片

    // 4.鼠标进入轮播图,轮播图停止,,鼠标离开,轮播图开始轮播
    // 重启轮播
    const start = () => {
      // 保证定时任务仅仅只能有一个
      if (timer) clearInterval(timer)
      if (props.autoplay && props.sliders.length > 1) {
        autoplayFn()
      }
    }
    // 暂停轮播
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    // 销毁组件前,清除定时器
    onBeforeUnmount(() => {
      clearInterval(timer)
    })
    // 鼠标进入的时候暂停,鼠标离开的时候开始

    return { currentIndex, toggle, stop, start }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px; // ???????????????????????????????
  min-height: 150px;
  position: relative;
  .carousel{
       // .carousel-body
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item { //.carousel-item
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear; // ????????????????????????动画????
    //   控制透明度
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator { //.carousel-indicator
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
