<template>
  <div class='xtx-goods-page'>
    <div class="container" v-if='detail'>
      <!-- 面包屑 -->
      <div class="break-crumb">
        <span>首页 > </span>
        <span>{{ detail.categories[1].name }} ></span>
        <span>{{ detail.categories[0].name }} ></span>
        <span>{{ detail.name}}</span>
      </div>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片预览 -->
          <GoodsImage :images='detail.mainPictures' />
           <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :detail='detail'/>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import { findGoods } from '@/api/product.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'

// 把组件的功能拆分为hook方法，方便后续功能代码的拆分
const useGoods = () => {
  // 创建route对象：类似于this.$route
  const route = useRoute()
  // 获取商品详情数据
  const detail = ref(null)
  findGoods(route.params.id).then(ret => {
    detail.value = ret.result
  })
  return detail
}

export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName },
  setup () {
    const detail = useGoods()
    return { detail }
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.break-crumb {
  height: 80px;
  line-height: 80px;
}
</style>
