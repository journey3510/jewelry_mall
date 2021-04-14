import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/client/user/login',
    method: 'post',
    data
  })
}

export function pwdLogin(data) {
  return request({
    url: '/api/client/user/login',
    method: 'post',
    data: {
      name: data.name,
      password: data.password
    }
  })
}

export function personCenter(data) {
  return request({
    url: '/api/client/home/personCenter',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/api/client/user/register',
    method: 'post',
    data
  })
}
