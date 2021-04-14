// 查询购物车
import request from '@/utils/request'

export function categoryList(id) {
  return request({
    url: '/api/client/category/list',
    method: 'post',
    data: {
      id: id
    }
  })
}
