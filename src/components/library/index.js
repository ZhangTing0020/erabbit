// 注册组件

// 扩展Vue原有的功能:全局组件,自定义指令

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import XtxMessage from './xtx-message.vue'
// Vue2中的写法
// export default {
//     install (Vue) {
//       Vue.component(XtxSkeleton.name, XtxSkeleton)
//     }
//   }

// 导入消息提示方法 在./message.js中默认导出的方法,在这里扩展成全局的方法,,,不然每次调用这个方法的时候,都要导入 类似于这样// import Message from '@/components/library/Message.js' ,比较麻烦
import Message from './Message.js'

// app表示根组件的实例
// 定义全局组件
export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxMessage.name, XtxMessage)

    // 在Vue3中，扩展组件实例的成员采用 app.config.globalProperties，而不是prototype
    app.config.globalProperties.$message = Message
  }
}
