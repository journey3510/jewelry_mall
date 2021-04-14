import request from '@/utils/request'

export function addAddress(data) {
  return request({
    url: '/api/client/address/add',
    method: 'post',
    data
  })
}

export function updateAddress(data) {
  return request({
    url: '/api/client/address/updata',
    method: 'post',
    data
  })
}

export function findAddress(data) {
  return request({
    url: '/api/client/address/get',
    method: 'post',
    data
  })
}
export function findAddressById(addressId) {
  return request({
    url: '/api/client/address/findById',
    method: 'post',
    data: {
      id: addressId
    }
  })
}

export function delAddress(addressId) {
  return request({
    url: '/api/client/address/delete',
    method: 'post',
    data: {
      id: addressId
    }
  })
}

// 获取商品规格
export function goodsRule(productId) {
  return request({
    url: '/product/category',
    method: 'post',
    data: { productId }
  })
}
