import { createRouter, createWebHashHistory } from 'vue-router'
// 路由懒加载
// 懒加载的写法 -> 当url与path匹配后，才会去加载对应的js和css文件
// 路由懒加载---(组件懒加载)
// import('@/views/User') 返回的是promise实例  动态加载
const Login = () => import('@/views/login/index.vue')
const Layout = () => import('@/views/layout/index.vue')
const Home = () => import('@/views/home/index.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      // 二级路由配置,,,如果路径为空的话,,默认跳转到这个页面
      { path: '', component: Home }
    ]
  },
  {
    path: '/login', component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
