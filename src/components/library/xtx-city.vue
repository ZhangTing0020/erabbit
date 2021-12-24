<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{active:isShow}">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-show='isShow'>
      <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
// import { onClickOutside } from '@vueuse/core'
export default {
  name: 'XtxCity',
  // 父组件传过来默认地址
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    // 选中的省市区
    // const changeResult = reactive({
    //   provinceCode: '',
    //   provinceName: '',
    //   cityCode: '',
    //   cityName: '',
    //   countyCode: '',
    //   countyName: '',
    //   fullLocation: ''
    // })
    const isShow = ref(false)
    // 控制选择城市弹窗的显示和隐藏
    const toggle = () => {
      isShow.value = !isShow.value
    }

    return { isShow, toggle }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
