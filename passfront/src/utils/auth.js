import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserType = 'User-Type'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserType() {
  return Cookies.get(UserType)
}

export function setUserType(type) {
  return Cookies.set(UserType, type)
}

export function removeUserType() {
  return Cookies.remove(UserType)
}
