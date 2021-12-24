// 商品详情模块
import request from '@/utils/request.js'
import axios from 'axios'
import { cityURL } from '@/utils/config.js'
// 获取商品的详细数据
export const findGoods = (id) => {
  return request({
    method: 'get',
    url: '/goods',
    data: { id }
  })
}

// 获取城市列表数据
export const getCityList = async () => {
  if (window.cityData) {
    // 读取缓存的数据
    return window.cityData
  }
  // 如果发送请求时，本身就是标准的url地址，那么就不会拼接基地址
  const ret = await axios.get(cityURL)
  if (ret.data) {
    // 添加省市区数据到缓存中
    window.cityData = ret.data
    return ret.data
  }
}
