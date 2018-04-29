import apiRequset from '../utils/request'

export function getMa(data) {
    return apiRequset({
        url: '/user/sendVerificationCode',
        method: 'post',
        params: {
            mobile: data
        }
    })
}

