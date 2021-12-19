<template>
  <ul class="app-header-nav">
    <li class="home">
      <!-- 只有首页鼠标放上去的时候,没有悬浮窗口,其他的都有下边的下拉,,,了  当鼠标向下滑动的时候,nav-header栏固定定位,他的布局有所改变,右边的搜索框以及购物车图标不显示了,,,所以就把top-header给拆分开
       -->
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li v-for="item in $store.state.cate.list" :key="item.id">
      <a href="#">{{item.name}}</a>
      <div class="layer">
        <ul>
          <li v-for="obj in item.children" :key="obj.id">
            <a href="#">
              <img :src="obj.picture" alt="">
              <p>{{obj.name}}</p>
            </a>
          </li>
        </ul>
      </div>
    </li>

  </ul>
</template>

<script>
// 使用vuex就要导入useStore
import { useStore } from 'vuex'
// import { setup } from 'vue'
export default {
  name: 'AppHeaderNav',
  setup () {
    // 触发store中的cate的actions
    const store = useStore()
    store.dispatch('cate/updateCate')
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
    // 初始样式 不显示
    .layer {
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      height: 0;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 124px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: @xtxColor;
            }
          }
        }
      }
    }
    // hover之后显示出来
    &:hover {
      // 加上 >
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        height: 124px;
        opacity: 1;
      }
    }
  }
}
</style>
