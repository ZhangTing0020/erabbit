// 注册组件

// 扩展Vue原有的功能:全局组件,自定义指令

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
// Vue2中的写法
// export default {
//     install (Vue) {
//       Vue.component(XtxSkeleton.name, XtxSkeleton)
//     }
//   }

// app表示根组件的实例
// 定义全局组件
export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
