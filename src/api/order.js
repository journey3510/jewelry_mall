import request from '@/utils/request'

export function orderSure(data) {
  return request({
    url: '/api/client/order/orderSure',
    method: 'post',
    data
  })
}

export function createOrder(data) {
  return request({
    url: '/api/client/order/createOrder',
    method: 'post',
    data
  })
}

export function orderPay(data) {
  return request({
    url: '/api/client/order/orderPay',
    method: 'post',
    data
  })
}

export function receipt(data) {
  return request({
    url: '/api/client/order/receipt',
    method: 'post',
    data
  })
}

export function findCoupon() {
  return request({
    url: '/api/client/coupon/findCoupon',
    method: 'post'
  })
}

export function findOrderList(data) {
  return request({
    url: '/api/client/order/findOrderList',
    method: 'post',
    data: data
  })
}

