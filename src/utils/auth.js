import Cookies from 'js-cookie'

const TokenKey = 'Token'
const guid = 'user-guid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getName() {
  return Cookies.get('NameKey')
}

export function setName(name) {
  return Cookies.set('NameKey', name)
}

export function getAvatar() {
  return Cookies.get('AvatarKey')
}

export function setAvatar(avatar) {
  return Cookies.set('AvatarKey', avatar)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// user id
export function getGuid() {
  return Cookies.get(guid)
}

export function setGuid(data) {
  return Cookies.set(guid, data)
}

export function removeGuid() {
  return Cookies.remove(guid)
}

// 临时订单
export function setTempOrder(order) {
  return Cookies.set('tempOrder', order)
}

export function getTempOrder() {
  return Cookies.get('tempOrder')
}

// 地址
export function setAddress(address) {
  return Cookies.set('address', address)
}

export function getAddress() {
  return Cookies.get('address')
}

