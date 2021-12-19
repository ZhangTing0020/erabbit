// 定义首页需要的接口函数
import request from '@/utils/request'

// 获取顶部导航栏列表数据
export const findHeadCategory = () => {
  return request({
    method: 'get',
    url: '/home/category/head'
  })
}
