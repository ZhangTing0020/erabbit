import request from '@/utils/request.js'
// 获取品牌数据
export const findBrand = (limit) => {
  return request({
    method: 'get',
    url: '/home/brand',
    data: { limit }
  })
}
