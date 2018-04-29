import { selectVideos, createVideos, selectVideoList, createVideo, getAliInfo } from '../../api/video'

const video = {
    state: {
        loading: false,
        videoLoading: false,
        buttonLoading: false
    },
    mutations: {
        SET_LOADING: (state, loadState) => {
            state.loading = loadState
        },
        SET_VIDEOLOADING: (state, loadState) => {
            state.videoLoading = loadState
        },
        SET_BUTTONLOADING: (state, loadState) => {
            state.buttonLoading = loadState
        },
    },
    actions: {
        // 查询课程仓库
        SelectVideos({ commit }) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                selectVideos().then(response => {
                    if (response.code === 0) {
                        commit('SET_LOADING', false)
                        resolve(response.data)
                    }
                    if (response.code === -1) {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_LOADING', false)
                    reject('网络错误')
                })
            })
        },
        // 新建课程仓库
        CreateVideos({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                createVideos(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_LOADING', false)
                        resolve(response.message)
                    }
                    if (response.code === -1) {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_LOADING', false)
                    reject('网络错误')
                })
            })
        },
        // 获取仓库下视频
        SelectVideoList({ commit }, data) {
            commit('SET_VIDEOLOADING', true)
            return new Promise((resolve, reject) => {
                selectVideoList(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_VIDEOLOADING', false)
                        resolve(response.data)
                    }
                    if (response.code === -1) {
                        commit('SET_VIDEOLOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_VIDEOLOADING', false)
                    reject('网络错误')
                })
            })
        },
        //添加仓库下视频
        CreateVideo({ commit }, data) {
            commit('SET_BUTTONLOADING', true)
            return new Promise((resolve, reject) => {
                createVideo(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_BUTTONLOADING', false)
                        resolve(response.message)
                    }
                    if (response.code === -1) {
                        commit('SET_BUTTONLOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_BUTTONLOADING', false)
                    reject('网络错误')
                })
            })
        },
        // 获取ali信息
        GetAliInfo({ commit }, data) {
            commit('SET_BUTTONLOADING', true)
            return new Promise((resolve, reject) => {
                getAliInfo(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_BUTTONLOADING', false)
                        resolve(response.data)
                    }
                    if (response.code === -1) {
                        commit('SET_BUTTONLOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_BUTTONLOADING', false)
                    reject('网络错误')
                })
            })
        },
    }
}

export default video


