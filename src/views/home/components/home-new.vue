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
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
