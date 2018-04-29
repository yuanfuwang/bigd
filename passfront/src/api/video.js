import request from '@/utils/request'

export function selectVideos(data) {
    return request({
        url: '/videoCollect/fectVideoList',
        method: 'post',
        data
    })
}

export function createVideos(data) {
    return request({
        url: '/videoCollect/add',
        method: 'post',
        data
    })
}

export function selectVideoList(data) {
    return request({
        url: '/video/list',
        method: 'get',
        params: {
            collectionid: data.collectionid
        }
    })
}

export function createVideo(data) {
    return request({
        url: '/video/addVideo',
        method: 'post',
        data
    })
}

export function getAliInfo(data) {
    return request({
        url: '/videoplay/getAliVideoInfo',
        method: 'get',
        params: {
            videoid: data.videoid
        }
    })
}