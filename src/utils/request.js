
import axios from 'axios'
import store from '@/store'

// 定义一个基地址
const baseURL = ''
// 创建一个axios实例
const service = axios.create({
  baseURL: baseURL
})

// 请求拦截器
service.interceptor.request.use(config => {
  // 先获取到token的值
  const token = store.state.user.profile.token
  // 后台返回的数据,会包裹两层
  if (token) { // 如果token有值的话
    // 就给请求头添加token
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, err => {
  Promise.reject(err)
})

// 响应拦截器
service.interceptor.response.use(res => {
  return res.data
}, err => {
  Promise.reject(err)
})

// 不管是get请求还是post请求,或者是其他请求,都让其统一传data进来,在这里做统一判断
// 自定义函数封装通用调用接口的方法：支持固定的data传参
// 1. 传输传递；返回值
// 2. 参数如何使用，具体的发送请求的过程，与axios有关

// 下边就相当于是一个匿名函数
export default (options) => {
  // 如果是get请求方式,是可以不用传method的,所以也要考虑到这个情况
  let key = ''
  if (options.method) {
    // 如果method有值,那就要对method的值进行处理
    // 如果是get请求就用params传参,其他请求就用data传参
    key = options.method.toUpperCase() === 'get' ? 'params' : 'data'
  } else {
    key = 'params'
  }
  return service({
    url: options.url,
    method: options.method || 'get', // 后边的逻辑或,是考虑到grt请求默认不输入method的情况
    // ES6的规则,对象的键key是可以动态的
    [key]: options.data
  })
}

// api中做一个request请求,然后经过本文件,对用户发来的请求进行处理,,,把不同的请求方式进行划分,配上不同的传参方式,然后再

// api调这个文件的顺序
