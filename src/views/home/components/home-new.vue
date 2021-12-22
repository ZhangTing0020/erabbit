<template>
  <div ref="target">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <!-- 右边的具名插槽 -->
      <template #right>
        <XtxMore path="/" />
      </template>

      <!-- 下边的匿名插槽 -->
      <template #default>
        <div style="position: relative; height: 426px">
          <transition name="fade">
            <ul class="goods-list" v-if="goods.length">
              <li v-for="item in goods" :key="item.id">
                <RouterLink :to="`/product/${item.id}`">
                  <img :src="item.picture" alt="" />
                  <p class="name ellipsis">{{ item.name }}</p>
                  <p class="price">&yen;{{ item.price }}</p>
                </RouterLink>
              </li>
            </ul>
            <HomeSkeleton bg="#f0f9f4" v-else />
          </transition>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-pannel'
import { findNew } from '@/api/home'
// import { ref } from 'vue'
import HomeSkeleton from './home-skeleton.vue'
// import { useIntersectionObserver } from '@vueuse/core'
import { useLazyData } from '@/hook'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // const goods = ref([])
    // ****************************************************************************
    // findNew().then((data) => {
    // //   setInterval(() => {
    //   goods.value = data.result
    // //   }, 3000)
    // })

    // const target = ref(null)
    // // 数据懒加载，，使用 @vueuse/core 中的 useIntersectionObserver 来实现监听进入可视区域行为
    // const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    //   if (isIntersecting) {
    //     findNew().then((data) => {
    //       //   setInterval(() => {
    //       goods.value = data.result
    //       //   }, 3000)
    //     })
    //     stop()
    //   }
    // })

    /* 因为页面上好多组件都需要页面懒加载，所以在每个组件中写代码冗余，所以，把这个函数封装一下，，，全局调用
    */
    const { target, list: goods } = useLazyData(findNew)
    return { goods, target }
  }
}
</script>

<style scoped lang="less">
.goods-list {
// flex 布局
/* 1.找到父子关系,将父元素设置 display:flex
2.确定主轴方向 flex-direction 不写的话,默认是X轴
3.使用flex属性设置子元素在主轴方向上的大小   flex 看子元素是否要自适应(大小要不要随着屏幕的宽度的变化而变化)
4.设置主轴对齐方式 justify-content
5.设置侧轴对齐方式 align-items
*/

  display: flex;
  justify-content: space-between; // space-between 空白在相邻项目之间
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    // 混入
    .hoverShadow();
  //   .hoverShadow () {
  //   transition: all .5s;
  //   &:hover {
  //       // 之所以要写成3d效果，因为3d有GPU加速
  //     transform: translate3d(0,-3px,0);
  //     box-shadow: 0 3px 8px rgba(0,0,0,0.2);
  //   }
  // }
    img {
      width: 306px;
      height: 306px;
    }
    /*
    1. text-indent 文本缩进 1em就相当于一个字的 font-size 之所以不用px单位,是因为当font-size修改之后,text-indent也要跟着修改,用em就不用跟着修改
    2. 文本水平对齐方式：text-align
    盒子的居中
      文本,span标签 a标签 行内元素
      input标签,img标签 等行内块元素
      需要给以上元素的父元素设置

      块元素 div p h 等是不能用text-align:center来实现水平居中的,而是要用margin: 0 auto
    */
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center; // 文本水平对齐方式
      // ?????????????????????这是怎么实现价格居中的
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
