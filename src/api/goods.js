import request from '@/utils/request'

// 获取商品列表
export function goodsListApi(data) {
  return request({
    url: '/api/client/home/productList',
    method: 'post',
    data
  })
}
// 获取商品详情
export function goodsDetail(data) {
  return request({
    url: '/api/client/product/detail',
    method: 'post',
    data
  })
}

// 获取商品规格
export function goodsRule(productId) {
  return request({
    url: '/api/client/product/category',
    method: 'post',
    data: { productId }
  })
}

// 获取商品列表
export function serielist(data) {
  return request({
    url: '/api/client/product/serielist',
    method: 'post',
    data
  })
}

// 商品 搜索
export function goodsSearch(data) {
  return request({
    url: '/api/client/product/search',
    method: 'post',
    data
  })
}

// 商品 搜索
export function goodsComment(data) {
  return request({
    url: '/api/client/product/comment',
    method: 'post',
    data
  })
}

