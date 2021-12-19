// 封装通用的接口调用模块

import axios from 'axios'

// 这里导入的 store 为什么要加上 @/ 呢
import store from '@/store'
import router from '@/router'
// 调用接口的基准路径
const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'

// 创建一个axios实例

const service = axios.create({
  baseURL: baseURL
})

// 请求拦截器
service.interceptors.request.use(config => {
  // token的来源
  // ?????????????????????这个token是怎么来的????
  const token = store.state.user.profile.token
  // *****************************

  // 统一添加请求头,如果有token,就在前边加上Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, err => {
  // 这个为啥这么写呢???
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 处理返回的数据:去掉一层data属性
  return res.data
}, err => {
  // 处理token失效的情况:失效后跳转到登录页面
  if (err.responce && err.responce.status === 401) {
    // token失效了，跳转到登录页面
    router.push('/login')
  }
  return Promise.reject(err)
})

// 自己封装一个通用的接口调用函数
export default (options) => {
  let key = ''
  if (options.method) {
    key = options.method.toUpperCase() === 'GET' ? 'params' : 'data'
  } else {
    // 如果method请求方式没有传递，默认使用get请求
    key = 'params'
  }

  return service({
    // 请求方式
    method: options.method || 'get',
    // 请求地址
    url: options.url,
    // 请求参数：如果是get请求需要params传递参数；否则使用data传递参数
    // ES6：对象的key可以是动态的变量
    [key]: options.data
  })
}
