import apiRequset from '../utils/request'

export function checkVerificationCode(data) {
    return apiRequset({
        url: '/user/checkVerificationCode',
        method: 'get',
        params: {
            mobile: data.mobile,
            code: data.verificationCode
        }
    })
}

export function changePassword(data) {
    return apiRequset({
        url: '/user/changePassword',
        method: 'post',
        data
    })
}