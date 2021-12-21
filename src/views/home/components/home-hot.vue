<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">

    <ul ref="pannel" class="goods-list" v-if="goods.length">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
    <HomeSkeleton  bg="#f0f9f4" v-else ></HomeSkeleton>
  </HomePanel>
</template>

<script>
// import { ref } from 'vue'
import HomePanel from './home-pannel'
import { findHot } from '@/api/home'
import { useLazyData } from '@/hook'

import HomeSkeleton from './home-skeleton.vue'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // const goods = ref([])
    // findHot().then(data => {
    //   goods.value = data.result
    // })
    // 数据懒加载
    const { target, list: goods } = useLazyData(findHot)
    return { goods, target }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
