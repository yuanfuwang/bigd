import { submitLoginInfo, loginByVerificationCode } from '../../api/login'
import { getToken, setToken, removeToken, setUserType } from '@/utils/auth'

const login = {
    state: {
        loading: false,
        token: getToken(),
    },
    mutations: {
        SET_LOADING: (state, loadState) => {
            state.loading = loadState
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },
    actions: {
        SubmitLoginInfo({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                submitLoginInfo(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_TOKEN', response.data.token)
                        //设置token
                        setToken(response.data.token)
                        //设置usertype
                        setUserType(response.data.type)
                        commit('SET_LOADING', false)
                        resolve(response.message)
                    }
                    if (response.code === -1) {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                    else {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_LOADING', false)
                    reject('网络错误')
                })
            })
        },
        LoginByVerificationCode({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                loginByVerificationCode(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_TOKEN', response.data.token)
                        //设置token
                        setToken(response.data.token)
                        //设置usertype
                        setUserType(response.data.type)
                        commit('SET_LOADING', false)
                        resolve(response.message)
                    }
                    if (response.code === -1) {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                    else {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_LOADING', false)
                    reject('网络错误')
                })
            })
        }
    }
}

export default login


