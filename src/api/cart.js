import request from '@/utils/request'

// 添加购物车
export function addCart(data) {
  return request({
    url: '/api/client/cart/addCart',
    method: 'post',
    data
  })
}

export function addCartNum(data) {
  return request({
    url: '/api/client/cart/cartNum',
    method: 'post',
    data
  })
}

export function selectCart(sku, check) {
  return request({
    url: '/api/client/cart/selectCart',
    method: 'post',
    data: {
      sku: sku,
      check: check
    }
  })
}

export function deleteCart(data) {
  return request({
    url: '/api/client/cart/deleteCart',
    method: 'post',
    data
  })
}

// 查询购物车
export function findCart(data) {
  return request({
    url: '/api/client/cart/findCart',
    method: 'post',
    data
  })
}

