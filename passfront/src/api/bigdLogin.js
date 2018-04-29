import apiRequset from '../utils/request'

export function adminUserLogin(data) {
    return apiRequset({
        url: 'adminUser/login',
        method: 'post',
        data
    })
}