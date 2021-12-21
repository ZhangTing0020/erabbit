<template>
  <div class="home-category">
    <ul class="menu">
        <!-- 当鼠标进入的时候,给当前的currentId赋值,记住当前的id
            当鼠标离开的时候,将当前的currentId置为null-->
      <li v-for="item in $store.getters['cate/leftCates']" :key="item.id"
      @mouseenter="currentId=item.id" @mouseleave="currentId=null">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!-- 二级路由,,侧边导航栏旁边的小字,因为v-if 和v-for最好不要在一个标签上显示,所以包裹一层template标签 -->
        <!-- item.children本来时不存在的,所以这个二级路由没有渲染出来的时候,先显示骨架屏占位,,,item.children是从utils/constant.js中的数组,map一下,加上id,包裹成对象
        就是说从store/modules/cate.js中拿到的,所以他本身是没有children -->
        <template v-if="item.children">
        <RouterLink v-for="tag in item.children" :key="tag.id" to="/">
          {{ tag.name }}
        </RouterLink>
        </template>
        <!-- 显示骨架屏 -->
        <template v-else>
          <!-- 两个小字(小标签之间间隔5px)  并且做了一个小动画,一直在从暗到亮闪烁 -->
         <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
         <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
      <!-- 品牌推荐,写死的数据 -->
         <li>
        <RouterLink to="/">{{ brand.name }}</RouterLink>
        <RouterLink to="/">
          {{ brand.children[0].name }}
        </RouterLink>
      </li>

      <!-- 组件测试 -->
      <!-- <span>
        <XtxSkeleton width="60px" height="60px" bg="blue" :animated="true"></XtxSkeleton>
      </span> -->
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
         <!-- 品牌数据 -->
      <ul v-if='currentId==="brandId"'>
        <li class="brand" v-for="item in brand.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{item.place}}</p>
              <p class="name ellipsis">{{item.nameEn}}</p>
              <p class="desc ellipsis-2">{{item.name}}</p>
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
import { findBrand } from '@/api/home.js'
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

    // 调用接口获取品牌列表数据
    findBrand().then(ret => {
      if (ret.result) {
        brand.brands = ret.result
      }
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
// 侧边导航栏,,后边跟的小字(小标签)上的动画,这里是大盒子套小盒子,,,大盒子占位,小盒子控制背景色
// xtx-skeleton这个类,是在自定义组件中的,直接写出来的,在大盒子上写了这个类名
  .xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
}
</style>
