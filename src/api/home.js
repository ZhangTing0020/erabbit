import request from '@/utils/request.js'
// 获取品牌数据
export const findBrand = (limit) => {
  return request({
    method: 'get',
    url: '/home/brand',
    data: { limit }
  })
}

/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
  return request({
    method: 'get',
    url: '/home/banner'
  })
}
// 获取新鲜好物的接口
export const findNew = () => {
  return request({
    method: 'get',
    url: 'home/new'
  })
}

// 人气推荐
export const findHot = () => {
  return request({
    method: 'get',
    url: 'home/hot'
  })
}
