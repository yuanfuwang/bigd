import apiRequset from '../utils/request'

export function submitLoginInfo(data) {
  return apiRequset({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function loginByVerificationCode(data) {
  return apiRequset({
    url: '/user/loginByVerificationCode',
    method: 'post',
    data
  })
}
