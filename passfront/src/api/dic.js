import request from '@/utils/request'

export function selectParentType(data) {
    return request({
        url: '/category/findCategoryList',
        method: 'get',
        params: {
            parentid: data
        }
    })
}

export function createParentType(data) {
    return request({
        url: '/category/insert',
        method: 'post',
        data
    })
}