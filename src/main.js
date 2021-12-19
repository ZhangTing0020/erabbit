import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置样式的包 不同的浏览器,达到相同得样式显示效果
import 'normalize.css'
// 基础样式,都写在common.less中
import '@/styles/common.less'
createApp(App).use(store).use(router).mount('#app')
