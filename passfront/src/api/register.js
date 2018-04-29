import apiRequset from '../utils/request'

export function submitRegisterInfo(data) {
    return apiRequset({
        url: '/user/register',
        method: 'post',
        data
    })
}

