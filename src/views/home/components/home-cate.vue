<template>
  <div class="home-category">
    <ul class="menu">
        <!-- 当鼠标进入的时候,给当前的currentId赋值,记住当前的id
            当鼠标离开的时候,将当前的currentId置为null-->
      <li v-for="item in $store.getters['cate/leftCates']" :key="item.id"
      @mouseenter="currentId=item.id" @mouseleave="currentId=null">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <RouterLink v-for="tag in item.children" :key="tag.id" to="/">
          {{ tag.name }}
        </RouterLink>
      </li>
      <!-- 品牌推荐,写死的数据 -->
         <li>
        <RouterLink to="/">{{ brand.name }}</RouterLink>
        <RouterLink to="/">
          {{ brand.children[0].name }}
        </RouterLink>
      </li>

      <!-- 组件测试 -->
      <span>
        <XtxSkeleton width="60px" height="60px" bg="blue" :animated="true"></XtxSkeleton>
      </span>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img
              :src="item.picture"
              alt=""
            />
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, reactive } from 'vue'
// import { findBrand } from '@/api/home.js'
export default {
  name: 'HomeCategory',
  setup () {
    //* ******************************************** */
    const store = useStore()
    // 定义一个id ,记录左侧以及路由的id
    const currentId = ref(null)
    // 根据id获取右侧商品的数据
    // 根据store中的list数据和当前选中的以及分类id 获取此时的右侧弹窗的商品信息
    const goods = computed(() => {
      const cate = store.state.cate.list.find(item => item.id === currentId.value)
      return cate ? cate.goods : []
    })
    //* ******************************************** */
    // 异步请求品牌管理的数据,但是这个数据不保存在vuex中,上边的都保存在了vuex中
    // getters中不要处理异步任务
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }],
      brands: []
    })
    return {
      currentId, goods, brand
    }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
